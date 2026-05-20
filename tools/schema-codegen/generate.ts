#!/usr/bin/env -S bun run
/**
 * Schema codegen CLI（Story-2.5 实际跑批 + 汇总 index.ts / _registry.ts）。
 *
 * 跑法：`pnpm gen:word [--input <path>] [--output <dir>]`
 *
 * 默认输入：`/Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json`
 * 默认输出：`src/word/generated/`
 *
 * 行为：
 * - 读 schema JSON；
 * - 对每个非空 ClassName 的 Type 调用 generateElement；
 * - 写到 `<outDir>/<file-name>.ts`，文件名由 classNameToFileName 计算；
 * - 写出 `index.ts` 显式 re-export 所有生成类（ESM tree-shake 友好）；
 * - 写出 `_registry.ts` 暴露 `registerWordprocessingElements(registry)`，
 *   把全部非抽象元素注册进 ElementRegistry；
 * - 输出确定性：两次跑产物字节一致。
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { type SchemaType, generateElement } from "./element-template.js";
import { classNameToFileName, parseSchemaName } from "./transforms/names.js";
import { prefixForUri } from "./transforms/namespaces.js";

interface SchemaFile {
  readonly TargetNamespace: string;
  readonly Types: readonly SchemaType[];
}

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
const DEFAULT_INPUT = resolve(
  REPO_ROOT,
  "../../github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json",
);
const DEFAULT_OUTPUT = resolve(REPO_ROOT, "src/word/generated");

function parseArgs(): { input: string; output: string } {
  const args = process.argv.slice(2);
  let input = DEFAULT_INPUT;
  let output = DEFAULT_OUTPUT;
  for (let i = 0; i < args.length; i += 1) {
    const a = args[i];
    if (a === "--input" && args[i + 1] !== undefined) {
      input = resolve(args[++i] as string);
    } else if (a === "--output" && args[i + 1] !== undefined) {
      output = resolve(args[++i] as string);
    }
  }
  return { input, output };
}

interface GeneratedClass {
  readonly className: string;
  readonly fileName: string;
  readonly isAbstract: boolean;
  /** schema 标记为 LeafElement 或 LeafText（mixed-content 叶子）。用于 #78
   *  registry 反序列化优先级——同 qname 时 composite 胜出。 */
  readonly isLeaf: boolean;
  readonly localName: string;
  readonly namespaceUri: string;
}

async function main(): Promise<void> {
  const { input, output } = parseArgs();
  process.stdout.write(`Reading schema: ${input}\n`);
  const json = JSON.parse(await readFile(input, "utf-8")) as SchemaFile;
  await mkdir(output, { recursive: true });

  const sourcePath = input.replace(`${REPO_ROOT}/`, "");
  const subsystem = subsystemNameForNamespace(json.TargetNamespace);
  const generated: GeneratedClass[] = [];
  const seenFiles = new Set<string>();
  const skippedDuplicates: string[] = [];

  // 建索引：ClassName → SchemaType。给 generateElement 沿 BaseClass 链向上
  // 收集继承的 Attributes（修 #139：Bold / Italic / FontSize 等 IsDerived leaf 缺 val）。
  const typeIndex = new Map<string, SchemaType>();
  for (const t of json.Types) {
    if (t.ClassName.length > 0) typeIndex.set(t.ClassName, t);
  }

  // 保留文件名（由 codegen 自身写出，不能被 element 类文件占用）。
  const RESERVED_FILENAMES = new Set(["index", "_registry"]);

  for (const type of json.Types) {
    if (type.ClassName.length === 0) continue;
    let fileName = classNameToFileName(type.ClassName);
    // 若 ClassName 生成的文件名与保留名冲突（如 class Index → "index"），
    // 追加 "-element" 后缀以避免桶文件自引用或 registry 文件被覆盖。
    if (RESERVED_FILENAMES.has(fileName)) {
      fileName = `${fileName}-element`;
    }
    if (seenFiles.has(fileName)) {
      skippedDuplicates.push(type.ClassName);
      continue;
    }
    seenFiles.add(fileName);

    const content = generateElement(type, {
      targetNamespace: json.TargetNamespace,
      sourcePath,
      dotnetNamespace: subsystem.pascal,
      typeIndex,
    });
    await writeFile(join(output, `${fileName}.ts`), content);

    const parsed = parseSchemaName(type.Name);
    const ns =
      parsed.elementPrefix.length === 0
        ? ""
        : prefixForUri(json.TargetNamespace) === parsed.elementPrefix
          ? json.TargetNamespace
          : json.TargetNamespace;
    generated.push({
      className: type.ClassName,
      fileName,
      isAbstract: parsed.isAbstract === true || type.IsAbstract === true,
      isLeaf: type.IsLeafElement === true || type.IsLeafText === true,
      localName: parsed.elementName,
      namespaceUri: ns,
    });
  }

  generated.sort((a, b) => a.className.localeCompare(b.className));

  await writeFile(join(output, "index.ts"), buildIndex(generated, sourcePath));
  await writeFile(join(output, "_registry.ts"), buildRegistry(generated, sourcePath, subsystem));

  process.stdout.write(
    `Generated ${generated.length} element classes into ${output}\n${
      skippedDuplicates.length > 0
        ? `Skipped ${skippedDuplicates.length} duplicate ClassName(s): ${skippedDuplicates.slice(0, 5).join(", ")}${skippedDuplicates.length > 5 ? "..." : ""}\n`
        : ""
    }`,
  );
}

/**
 * 从 schema 的 TargetNamespace 推导子系统名（用于 `register<Pascal>Elements`
 * 函数名 + 注释里的 namespace label）。
 *
 * 例：
 * - `.../wordprocessingml/2006/main` → `{ pascal: "Wordprocessing", label: "wordprocessingml" }`
 * - `.../spreadsheetml/2006/main`    → `{ pascal: "Spreadsheet",    label: "spreadsheetml" }`
 * - `.../presentationml/2006/main`   → `{ pascal: "Presentation",   label: "presentationml" }`
 * - `.../drawingml/2006/main`        → `{ pascal: "Drawing",        label: "drawingml" }`
 *
 * 未知 namespace 走 fallback：取最末一段，PascalCase 化作为 pascal。
 */
function subsystemNameForNamespace(uri: string): { pascal: string; label: string } {
  const known: Record<string, { pascal: string; label: string }> = {
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main": {
      pascal: "Wordprocessing",
      label: "wordprocessingml",
    },
    "http://schemas.openxmlformats.org/spreadsheetml/2006/main": {
      pascal: "Spreadsheet",
      label: "spreadsheetml",
    },
    "http://schemas.openxmlformats.org/presentationml/2006/main": {
      pascal: "Presentation",
      label: "presentationml",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/main": {
      pascal: "Drawing",
      label: "drawingml",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/chart": {
      pascal: "Chart",
      label: "chart",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/picture": {
      pascal: "Picture",
      label: "picture",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing": {
      pascal: "SpreadsheetDrawing",
      label: "spreadsheetDrawing",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing": {
      pascal: "WordprocessingDrawing",
      label: "wordprocessingDrawing",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing": {
      pascal: "ChartDrawing",
      label: "chartDrawing",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/math": {
      pascal: "Math",
      label: "math",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties": {
      pascal: "ExtendedProperties",
      label: "extended-properties",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties": {
      pascal: "CustomProperties",
      label: "custom-properties",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes": {
      pascal: "DocPropsVTypes",
      label: "docPropsVTypes",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/bibliography": {
      pascal: "Bibliography",
      label: "bibliography",
    },
    "http://schemas.openxmlformats.org/officeDocument/2006/customXml": {
      pascal: "CustomXml",
      label: "customXml",
    },
    "http://schemas.openxmlformats.org/schemaLibrary/2006/main": {
      pascal: "SchemaLibrary",
      label: "schemaLibrary",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas": {
      pascal: "LockedCanvas",
      label: "lockedCanvas",
    },
    "http://schemas.openxmlformats.org/drawingml/2006/compatibility": {
      pascal: "DrawingCompatibility",
      label: "drawingCompatibility",
    },
    "urn:schemas-microsoft-com:vml": {
      pascal: "Vml",
      label: "vml",
    },
    "urn:schemas-microsoft-com:office:office": {
      pascal: "VmlOffice",
      label: "vml-office",
    },
    "urn:schemas-microsoft-com:office:excel": {
      pascal: "VmlExcel",
      label: "vml-excel",
    },
    "urn:schemas-microsoft-com:office:word": {
      pascal: "VmlWord",
      label: "vml-word",
    },
    "urn:schemas-microsoft-com:office:powerpoint": {
      pascal: "VmlPowerpoint",
      label: "vml-powerpoint",
    },
  };
  const hit = known[uri];
  if (hit !== undefined) return hit;
  const segments = uri.replace(/\/$/, "").split("/");
  const last = segments[segments.length - 1] ?? "Generated";
  const pascal = last.charAt(0).toUpperCase() + last.slice(1);
  return { pascal, label: last };
}

function buildIndex(classes: readonly GeneratedClass[], sourcePath: string): string {
  const lines = ["// THIS FILE IS GENERATED. DO NOT EDIT.", `// Source: ${sourcePath}`, ""];
  for (const c of classes) {
    lines.push(`export { ${c.className} } from "./${c.fileName}.js";`);
  }
  lines.push("");
  return lines.join("\n");
}

function buildRegistry(
  classes: readonly GeneratedClass[],
  sourcePath: string,
  subsystem: { pascal: string; label: string },
): string {
  const concrete = classes.filter((c) => !c.isAbstract && c.localName.length > 0);
  // #78：同 (namespaceUri, localName) 多次出现时去重，规则如下：
  //
  //  1. 默认按 className 字典序「last wins」——等价于旧实现 (map.set 顺序覆盖)；
  //     这套规则在多数 qname 上是正确的（Excel `x:t` → Text、`x:sheetData` →
  //     SheetData、`x:b` → BooleanItem 等）。
  //  2. 手工覆盖表 `EXPLICIT_PRIORITY` 列出 1) 不走的特殊 qname。当前只有
  //     `w:style` 一条：composite Style 必须赢 leaf StyleId（详见 issue #78）。
  //
  // 为什么不用「composite > leaf」通杀：实测会把 Excel `x:t` 误解析到 MdxTuple
  // (composite)，导致 SST 拿不到 Text 的 .text 字段而崩 resolver。schema 里
  // leaf-vs-composite 同 qname 的常见情况大多需要保留 leaf 语义。
  const EXPLICIT_PRIORITY: Readonly<Record<string, string>> = {
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::style": "Style",
    // Word \`<w:jc>\` 既有段落级 Justification（pPr 子），也有表级 TableJustification（tblPr 子）。
    // 字典序 TableJustification 胜出，但段落级访问最高频——优先 canonical Justification。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::jc": "Justification",
    // Word \`<w:pPr>\` / \`<w:rPr>\`：字典序 StyleParagraphProperties / StyleRunProperties 胜出，
    // 但段落 / Run 直接子的最高频含义是 ParagraphProperties / RunProperties。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::pPr": "ParagraphProperties",
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::rPr": "RunProperties",
    // Word `<w:sz>`：字典序 FrameSize 胜出（用于 frame 框架的尺寸），但 Run 内
    // `<w:rPr><w:sz w:val="24"/>` 是字号的 canonical 类，最高频。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::sz": "FontSize",
    // Word `<w:pStyle>`：字典序 ParagraphStyleIdInLevel（numbering 内部用）胜出，
    // 但段落级 pPr 直接子的最高频含义是 canonical ParagraphStyleId（引用 style 条目）。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::pStyle": "ParagraphStyleId",
    // Word `<w:tcPr>` / `<w:tblPr>` / `<w:trPr>`：字典序 TableStyleConditional* 胜出，
    // 但表格 / 行 / 单元格直接子的最高频含义是 canonical TableCellProperties / TableProperties /
    // TableRowProperties。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::tcPr": "TableCellProperties",
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::tblPr": "TableProperties",
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::trPr": "TableRowProperties",
    // Word `<w:fldSimple>` 字典序 SimpleFieldRuby 胜出（拼音注音里的字段），
    // 但顶层段落用户最高频是 SimpleField（PAGE / NUMPAGES 等字段）。
    "http://schemas.openxmlformats.org/wordprocessingml/2006/main::fldSimple": "SimpleField",
    // Excel: 字典序「ExternalDefinedName(s)」压过 canonical「DefinedName(s)」，
    // 但 workbook.xml 顶层 \`<definedNames>\` 引用的是 canonical 那一对——强制覆盖回。
    "http://schemas.openxmlformats.org/spreadsheetml/2006/main::definedName": "DefinedName",
    "http://schemas.openxmlformats.org/spreadsheetml/2006/main::definedNames": "DefinedNames",
  };
  const byKey = new Map<string, GeneratedClass>();
  for (const c of concrete) {
    const key = `${c.namespaceUri}::${c.localName}`;
    const forced = EXPLICIT_PRIORITY[key];
    if (forced !== undefined) {
      if (c.className === forced) byKey.set(key, c);
      else if (!byKey.has(key)) byKey.set(key, c); // 兜底，等会儿被 forced 覆盖
      continue;
    }
    const prior = byKey.get(key);
    if (prior === undefined || c.className > prior.className) byKey.set(key, c);
  }
  const deduped = [...byKey.values()].sort((a, b) => a.className.localeCompare(b.className));
  const imports = deduped
    .map((c) => `import { ${c.className} } from "./${c.fileName}.js";`)
    .join("\n");
  const registrations = deduped
    .map(
      (c) =>
        `  registry.register(${quote(c.namespaceUri)}, ${quote(c.localName)}, ${c.className});`,
    )
    .join("\n");

  return [
    "// THIS FILE IS GENERATED. DO NOT EDIT.",
    `// Source: ${sourcePath}`,
    "",
    `import type { ElementRegistry } from "../../element/index.js";`,
    imports,
    "",
    "/**",
    ` * 把 ${subsystem.label} 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。`,
    " * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，",
    " * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。",
    " */",
    `export function register${subsystem.pascal}Elements(registry: ElementRegistry): void {`,
    registrations,
    "}",
    "",
  ].join("\n");
}

function quote(s: string): string {
  return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

main().catch((err) => {
  process.stderr.write(`codegen failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
