/**
 * 单个 SchemaType → TypeScript 源文件字符串。
 *
 * 设计原则（Architecture §5）：
 * - 顶部 banner 标注 GENERATED + 源 JSON + 原 .NET 类引用；
 * - 类继承 `OpenXmlLeafElement` 或 `OpenXmlCompositeElement`（按 IsLeafElement）；
 * - 每条 schema attribute → 同名 typed 字段 + applyAttribute switch 分支 +
 *   collectAttributes 输出（保留 schema 声明顺序）；
 * - 各 attribute 的 schema Validators（Story-2.7）翻译为：
 *   · `StringValidator` MaxLength/MinLength → applyAttribute 内联 `assertString` 调用；
 *   · `NumberValidator` MinInclusive/MaxInclusive → 内联 `assertNumber` 调用；
 *   · `RequiredValidator` → 类级 `validateRequired()` 方法的一行（不在 applyAttribute 内联，
 *      因为 Required 检查需要看「整个属性集」是否凑齐，时机由调用方决定）；
 * - `qname` 形如 `"w:p"` 直接落到字符串字面量，运行时零分支；
 * - 输出确定性：同一份 SchemaType 输入永远产出同一份字符串。
 */

import { parseSchemaName } from "./transforms/names.js";
import { prefixForUri } from "./transforms/namespaces.js";
import { mapSchemaType } from "./transforms/types.js";

export interface SchemaValidatorArg {
  readonly Name?: string;
  readonly Type?: string;
  readonly Value?: string;
}

export interface SchemaValidator {
  readonly Name: string;
  readonly Arguments?: readonly SchemaValidatorArg[];
  readonly IsInitialVersion?: boolean;
}

export interface SchemaAttribute {
  readonly QName: string;
  /** May be absent in some schema JSON entries; fall back to PropertyComments. */
  readonly PropertyName?: string | null;
  readonly Type: string;
  readonly PropertyComments?: string;
  readonly Version?: string;
  readonly Validators?: readonly SchemaValidator[];
}

/** Regex for a valid single-word identifier (no spaces, no punctuation). */
const SIMPLE_IDENTIFIER_RE = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/**
 * Effective property name for an attribute: prefers `PropertyName`, falls back
 * to `PropertyComments` only when it is a simple identifier (no spaces/punctuation),
 * then to the local part of `QName` (after the colon).
 */
function effectivePropertyName(attr: SchemaAttribute): string {
  if (typeof attr.PropertyName === "string" && attr.PropertyName.length > 0)
    return attr.PropertyName;
  if (
    typeof attr.PropertyComments === "string" &&
    attr.PropertyComments.length > 0 &&
    SIMPLE_IDENTIFIER_RE.test(attr.PropertyComments)
  )
    return attr.PropertyComments;
  const colon = attr.QName.indexOf(":");
  return colon >= 0 ? attr.QName.slice(colon + 1) : attr.QName;
}

export interface SchemaType {
  readonly Name: string;
  readonly ClassName: string;
  readonly Summary?: string;
  readonly BaseClass?: string;
  readonly IsAbstract?: boolean;
  readonly IsLeafElement?: boolean;
  /** schema 中 mixed-content leaf（如 `w:t`）专用标记；语义同 IsLeafElement。 */
  readonly IsLeafText?: boolean;
  readonly Attributes?: readonly SchemaAttribute[];
}

export interface GenerateElementOptions {
  /** schema 文件的 TargetNamespace（顶层 JSON 字段）。 */
  readonly targetNamespace: string;
  /** 源 JSON 文件相对路径，写进 banner 便于追溯。 */
  readonly sourcePath: string;
  /**
   * .NET SDK 命名空间名（写进 `@see DocumentFormat.OpenXml.<x>.<class>` 注释）。
   * 例：`Wordprocessing` / `Spreadsheet` / `Presentation` / `Drawing`。
   */
  readonly dotnetNamespace: string;
  /**
   * 类型索引：ClassName → SchemaType。用来在生成 derived 类时沿 BaseClass 链
   * 向上收集继承的 Attributes。schema 里 \`IsDerived: true\` 的 leaf 类（Bold /
   * Italic / FontSize 等）自身 Attributes 为空，但父类（OnOffType / HpsMeasureType
   * 等）声明了 \`w:val\`——必须从父类那里继承下来才能让 typed 字段非空。
   *
   * 可选：调用方未提供时退化为「只看自身 Attributes」（保留向后兼容）。
   */
  readonly typeIndex?: ReadonlyMap<string, SchemaType>;
  /**
   * element 包的相对 import 路径。
   * 默认：`"../../element/index.js"`（适合 `src/<name>/generated/` 两层深度）。
   * office-ext 子目录三层深：`"../../../element/index.js"`。
   */
  readonly elementPkg?: string;
}

const ELEMENT_PKG = "../../element/index.js";

export function generateElement(type: SchemaType, options: GenerateElementOptions): string {
  const parsed = parseSchemaName(type.Name);
  const elementPrefix = parsed.elementPrefix;
  const elementName = parsed.elementName;
  const namespaceUri = elementPrefix.length === 0 ? "" : resolveNs(elementPrefix, options);

  const baseImport =
    type.IsLeafElement === true || type.IsLeafText === true
      ? "OpenXmlLeafElement"
      : "OpenXmlCompositeElement";
  const valueImports = new Set<string>();
  // 合并继承自 BaseClass 链的 Attributes（祖先在前，本类在后；保留 schema 声明顺序）。
  // 同 QName 去重，子类覆盖父类（理论上 schema 不该出现，但兜底）。
  const collectedAttrs = collectAttributesWithInherited(type, options.typeIndex);
  // 过滤掉 schema 中偶尔出现的「无 PropertyName / 无 QName」记录，避免下游崩
  const attrs = collectedAttrs.filter(
    (a) => typeof a.QName === "string" && a.QName.length > 0 && effectivePropertyName(a).length > 0,
  );
  const isLeaf = type.IsLeafElement === true || type.IsLeafText === true;
  const attrLines = attrs.map((a) => renderAttrField(a, valueImports, isLeaf));
  const applyAttrCases = attrs.map((a) =>
    renderApplyAttrCase(a, type.ClassName, valueImports, isLeaf),
  );
  const collectLines = attrs.map((a) => renderCollectLine(a, isLeaf));
  const requiredLines = attrs
    .filter(isRequiredAttr)
    .map((a) => renderRequiredCheck(a, type.ClassName, isLeaf));
  if (requiredLines.length > 0) valueImports.add("assertRequired");

  const imports: string[] = [baseImport];
  if (type.IsAbstract !== true && type.IsLeafElement !== true) {
    imports.push("OpenXmlElementList");
  }
  for (const v of valueImports) imports.push(v);

  const elementPkg = options.elementPkg ?? ELEMENT_PKG;
  const importsBlock =
    imports.length === 0
      ? ""
      : `import {\n${imports
          .sort()
          .map((i) => `  ${i},`)
          .join("\n")}\n} from "${elementPkg}";\n`;

  const classKeyword = type.IsAbstract === true ? "abstract class" : "class";
  const baseHint = type.IsAbstract === true ? " (abstract)" : "";

  const summary = (type.Summary ?? type.ClassName).trim();
  const elementBanner =
    elementName.length === 0
      ? "Abstract base type (no element binding)"
      : `Element: \`${elementPrefix}:${elementName}\``;

  const localNameLine =
    parsed.isAbstract === true
      ? `  override readonly localName = "" as const;`
      : `  override readonly localName = ${quote(elementName)} as const;`;
  const prefixLine = `  override readonly prefix = ${quote(elementPrefix)} as const;`;
  const nsLine = `  override readonly namespaceUri = ${quote(namespaceUri)} as const;`;

  const childrenLine =
    type.IsAbstract === true || type.IsLeafElement === true || type.IsLeafText === true
      ? ""
      : "  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);\n";

  const applyAttrBlock =
    applyAttrCases.length === 0
      ? ""
      : `\n  override applyAttribute(qname: string, value: string): void {\n    switch (qname) {\n${applyAttrCases
          .map((c) => `      ${c}`)
          .join("\n")}\n    }\n    super.applyAttribute(qname, value);\n  }\n`;

  const collectBlock =
    collectLines.length === 0
      ? ""
      : `\n  protected override collectAttributes(): [string, string][] {\n    const out: [string, string][] = [];\n    for (const [k, v] of this.extendedAttributes) out.push([k, v]);\n${collectLines
          .map((c) => `    ${c}`)
          .join("\n")}\n    return out;\n  }\n`;

  const requiredBlock =
    requiredLines.length === 0
      ? ""
      : `\n  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */\n  validateRequired(): void {\n${requiredLines.map((l) => `    ${l}`).join("\n")}\n  }\n`;

  return [
    "// THIS FILE IS GENERATED. DO NOT EDIT.",
    `// Source: ${options.sourcePath}`,
    `// @see DocumentFormat.OpenXml.${options.dotnetNamespace}.${type.ClassName}`,
    "",
    importsBlock.trimEnd(),
    "",
    `/** ${summary}\n *\n * ${elementBanner}${baseHint} */`,
    `export ${classKeyword} ${type.ClassName} extends ${baseImport} {`,
    localNameLine,
    prefixLine,
    nsLine,
    childrenLine.trimEnd(),
    ...attrLines.map((l) => `\n${l}`),
    applyAttrBlock.trimEnd(),
    collectBlock.trimEnd(),
    requiredBlock.trimEnd(),
    "}",
    "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
}

/**
 * 沿 BaseClass 链向上收集 Attributes，**只在本类自身 Attributes 为空时启用**。
 *
 * 目的：补全 `IsDerived: true` 的瘦派生类（Bold / Italic / FontSize / Caps / Vanish 等）
 * 的 typed val 字段；这些类自身 Attributes 全为空，靠 BaseClass (OnOffType /
 * HpsMeasureType) 提供 \`w:val\`。
 *
 * 不动**自身 Attributes 非空**的类（Cell / Run / Paragraph 等）：它们已经把
 * 应有 typed 字段都写出来了，再继承父类只会冲掉现有调用方对 extendedAttributes
 * 的依赖（test smell 暴露但不属本次范围）。
 */
function collectAttributesWithInherited(
  type: SchemaType,
  typeIndex: ReadonlyMap<string, SchemaType> | undefined,
): readonly SchemaAttribute[] {
  const own = type.Attributes ?? [];
  if (own.length > 0 || typeIndex === undefined) return own;
  // 自身没声明 attr 才向上看
  const seen = new Set<string>([type.ClassName]);
  let cursor: SchemaType | undefined =
    type.BaseClass !== undefined ? typeIndex.get(type.BaseClass) : undefined;
  while (cursor !== undefined) {
    if (seen.has(cursor.ClassName)) break;
    seen.add(cursor.ClassName);
    if (cursor.Attributes !== undefined && cursor.Attributes.length > 0) {
      return cursor.Attributes;
    }
    cursor = cursor.BaseClass !== undefined ? typeIndex.get(cursor.BaseClass) : undefined;
  }
  return own;
}

function resolveNs(prefix: string, options: GenerateElementOptions): string {
  // 当 elementPrefix 与 schema 的 TargetNamespace 一致时（OOXML 主体场景）→ 直接用
  const known = prefixForUri(options.targetNamespace);
  if (known === prefix) return options.targetNamespace;
  // 跨 namespace 引用（r:/mc: 等）：Story-2.5 会扩展 well-known 表查询；
  // 当前退化到 TargetNamespace（生成代码仍能编译，运行时仅对主 namespace 元素准确）。
  return options.targetNamespace;
}

function quote(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * 把 schema 里的 \`":name"\` 形态（empty prefix + colon + localname）规范成
 * tokenizer 实际发出的 \`"name"\`（无前缀属性的 XML attribute key 没有前导冒号）。
 * 带 \`w:val\` / \`r:id\` 等真前缀的 QName 不动。
 *
 * 修 Excel SpreadsheetML 主流 schema 大量无 prefix 属性（如 \`<x:sheet name="...">\`、
 * \`<x:definedName name="...">\`）的反序列化——之前 case 标签是 \`:name\` 永不命中，
 * typed 字段全留 undefined，attribute 只落到 extendedAttributes。
 */
function normalizeAttrQName(qname: string): string {
  return qname.startsWith(":") ? qname.slice(1) : qname;
}

function renderAttrField(attr: SchemaAttribute, imports: Set<string>, isLeaf: boolean): string {
  const t = mapSchemaType(attr.Type);
  for (const i of t.imports) imports.add(i);
  const comment = attr.PropertyComments?.trim() ?? attr.QName;
  const prop = resolveAttrPropName(effectivePropertyName(attr), isLeaf);
  return `  /** ${comment} (${attr.QName}) */\n  ${prop}: ${t.expr} | undefined;`;
}

const NUMERIC_VALUE_TYPES = new Set(["Int32Value", "Int64Value", "UInt32Value", "DecimalValue"]);
// 仅对 StringValue 注入 StringValidator —— HexBinaryValue 的 schema MaxLength
// 实际是「字节数」（每字节占 2 字符）；用字符长度算会双倍误判。字节级 hex
// 校验留给后续 Story 单独建模。
const STRING_VALUE_TYPES = new Set(["StringValue"]);

function renderApplyAttrCase(
  attr: SchemaAttribute,
  className: string,
  imports: Set<string>,
  isLeaf: boolean,
): string {
  const t = mapSchemaType(attr.Type);
  const prop = resolveAttrPropName(effectivePropertyName(attr), isLeaf);
  const ctx = `{ attribute: ${quote(attr.QName)}, elementClass: ${quote(className)} }`;
  const parseCall =
    t.parseExpr !== undefined ? t.parseExpr.replace("VALUE", "value") : `${t.expr}.parse(value)`;
  const calls: string[] = [`this.${prop} = ${parseCall};`];

  // 值容器与 validator 的类型必须匹配——schema 里偶尔会出现「StringValue 上带
  // NumberValidator」这种怪癖（比如 w:id），跳过即可，不强行注入会导致 TS 类型错。
  for (const v of attr.Validators ?? []) {
    if (v.Name === "StringValidator" && STRING_VALUE_TYPES.has(t.expr)) {
      const args = argsToMap(v.Arguments);
      const opts: string[] = [];
      if (args.MaxLength !== undefined) opts.push(`maxLength: ${args.MaxLength}`);
      if (args.MinLength !== undefined) opts.push(`minLength: ${args.MinLength}`);
      if (args.Length !== undefined) {
        opts.push(`maxLength: ${args.Length}, minLength: ${args.Length}`);
      }
      if (opts.length === 0) continue;
      calls.push(`assertString(this.${prop}, { ${opts.join(", ")} }, ${ctx});`);
      imports.add("assertString");
    } else if (v.Name === "NumberValidator" && NUMERIC_VALUE_TYPES.has(t.expr)) {
      const args = argsToMap(v.Arguments);
      const opts: string[] = [];
      if (args.MinInclusive !== undefined) opts.push(`min: ${args.MinInclusive}`);
      if (args.MaxInclusive !== undefined) opts.push(`max: ${args.MaxInclusive}`);
      if (opts.length === 0) continue;
      calls.push(`assertNumber(this.${prop}, { ${opts.join(", ")} }, ${ctx});`);
      imports.add("assertNumber");
    }
    // 其它 validator（OfficeVersionValidator / EnumValidator / RegexValidator 等）
    // Story-2.7 暂不注入——Required 走 validateRequired() 单独处理。
  }

  return `case ${quote(normalizeAttrQName(attr.QName))}: ${calls.join(" ")} return;`;
}

function renderCollectLine(attr: SchemaAttribute, isLeaf: boolean): string {
  const prop = resolveAttrPropName(effectivePropertyName(attr), isLeaf);
  return `if (this.${prop} !== undefined) out.push([${quote(normalizeAttrQName(attr.QName))}, this.${prop}.toString()]);`;
}

function renderRequiredCheck(attr: SchemaAttribute, className: string, isLeaf: boolean): string {
  const prop = resolveAttrPropName(effectivePropertyName(attr), isLeaf);
  const ctx = `{ attribute: ${quote(attr.QName)}, elementClass: ${quote(className)} }`;
  return `assertRequired(this.${prop}, ${ctx});`;
}

/**
 * 该属性是否「无条件必填」。
 *
 * schema 里同一属性可能挂多个版本限定的 `RequiredValidator`：早期版本必填、
 * 后续版本通过 `IsRequired=False` 参数解除。典型如 `w:cnfStyle/@w:val`——
 * Office2007 必填，Office2010 起被展开式属性（firstRow/lastRow…）取代而转为
 * 可选，真实现代 Office 文件不写 `@w:val`。openxml-ts 的校验不做版本目标
 * 定向，按「现代 Office」语义：只要任一 `RequiredValidator` 声明
 * `IsRequired=False`，即视为可选，不发无条件必填检查——否则会对合法文件误报。
 */
function isRequiredAttr(attr: SchemaAttribute): boolean {
  const reqs = (attr.Validators ?? []).filter((v) => v.Name === "RequiredValidator");
  if (reqs.length === 0) return false;
  for (const v of reqs) {
    const args = argsToMap(v.Arguments);
    if (args.IsRequired !== undefined && args.IsRequired.toLowerCase() === "false") {
      return false;
    }
  }
  return true;
}

function argsToMap(args: readonly SchemaValidatorArg[] | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of args ?? []) {
    if (typeof a.Name === "string" && typeof a.Value === "string") {
      out[a.Name] = a.Value;
    }
  }
  return out;
}

function camelCase(pascal: string): string {
  if (pascal.length === 0) return pascal;
  return pascal[0]?.toLowerCase() + pascal.slice(1);
}

/**
 * `OpenXmlLeafElement` 基类已声明 `text: string | undefined`；
 * 若 leaf 元素有同名 attribute（如 x15:DbCommand/@text），生成 `textAttr` 避免类型冲突。
 */
const LEAF_BASE_RESERVED = new Set(["text"]);

function resolveAttrPropName(propName: string, isLeaf: boolean): string {
  const cc = camelCase(propName);
  if (isLeaf && LEAF_BASE_RESERVED.has(cc)) return `${cc}Attr`;
  return cc;
}
