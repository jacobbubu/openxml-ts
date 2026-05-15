/**
 * 单个 SchemaType → TypeScript 源文件字符串。
 *
 * 设计原则（Architecture §5）：
 * - 顶部 banner 标注 GENERATED + 源 JSON + 原 .NET 类引用；
 * - 类继承 `OpenXmlLeafElement` 或 `OpenXmlCompositeElement`（按 IsLeafElement）；
 * - 每条 schema attribute → 同名 typed 字段 + applyAttribute switch 分支 +
 *   collectAttributes 输出（保留 schema 声明顺序）；
 * - `qname` 形如 `"w:p"` 直接落到字符串字面量，运行时零分支；
 * - 输出确定性：同一份 SchemaType 输入永远产出同一份字符串。
 */

import { parseSchemaName } from "./transforms/names.js";
import { prefixForUri } from "./transforms/namespaces.js";
import { mapSchemaType } from "./transforms/types.js";

export interface SchemaAttribute {
  readonly QName: string;
  readonly PropertyName: string;
  readonly Type: string;
  readonly PropertyComments?: string;
  readonly Version?: string;
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
  // 过滤掉 schema 中偶尔出现的「无 PropertyName / 无 QName」记录，避免下游崩
  const attrs = (type.Attributes ?? []).filter(
    (a) =>
      typeof a.PropertyName === "string" &&
      a.PropertyName.length > 0 &&
      typeof a.QName === "string" &&
      a.QName.length > 0,
  );
  const attrLines = attrs.map((a) => renderAttrField(a, valueImports));
  const applyAttrCases = attrs.map((a) => renderApplyAttrCase(a));
  const collectLines = attrs.map((a) => renderCollectLine(a));

  const imports: string[] = [baseImport];
  if (type.IsAbstract !== true && type.IsLeafElement !== true) {
    imports.push("OpenXmlElementList");
  }
  for (const v of valueImports) imports.push(v);

  const importsBlock =
    imports.length === 0
      ? ""
      : `import {\n${imports
          .sort()
          .map((i) => `  ${i},`)
          .join("\n")}\n} from "${ELEMENT_PKG}";\n`;

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
      : `\n  protected override collectAttributes(): Array<[string, string]> {\n    const out: Array<[string, string]> = [];\n    for (const [k, v] of this.extendedAttributes) out.push([k, v]);\n${collectLines
          .map((c) => `    ${c}`)
          .join("\n")}\n    return out;\n  }\n`;

  return [
    "// THIS FILE IS GENERATED. DO NOT EDIT.",
    `// Source: ${options.sourcePath}`,
    `// @see DocumentFormat.OpenXml.Wordprocessing.${type.ClassName}`,
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
    "}",
    "",
  ]
    .filter((l) => l !== undefined)
    .join("\n");
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

function renderAttrField(attr: SchemaAttribute, imports: Set<string>): string {
  const t = mapSchemaType(attr.Type);
  for (const i of t.imports) imports.add(i);
  const comment = attr.PropertyComments?.trim() ?? attr.QName;
  return `  /** ${comment} (${attr.QName}) */\n  ${camelCase(attr.PropertyName)}: ${t.expr} | undefined;`;
}

function renderApplyAttrCase(attr: SchemaAttribute): string {
  const t = mapSchemaType(attr.Type);
  return `case ${quote(attr.QName)}: this.${camelCase(attr.PropertyName)} = ${t.expr}.parse(value); return;`;
}

function renderCollectLine(attr: SchemaAttribute): string {
  const prop = camelCase(attr.PropertyName);
  return `if (this.${prop} !== undefined) out.push([${quote(attr.QName)}, this.${prop}.toString()]);`;
}

function camelCase(pascal: string): string {
  if (pascal.length === 0) return pascal;
  return pascal[0]?.toLowerCase() + pascal.slice(1);
}
