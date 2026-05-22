#!/usr/bin/env -S bun run
/**
 * Epic-86: 上下文感知反序列化 — 父→子类型映射 codegen。
 *
 * 读取 schema JSON，为每个复合元素类生成子元素映射，输出到
 * `<outDir>/_child-map.ts`。
 *
 * 映射格式：
 *   register<Name>ChildMaps(registry) 把每个父类的子映射注册到 ElementRegistry。
 *   每条记录：[namespaceUri, localName, ChildCtor]。
 *
 * 解析原理：
 *   schema Particle.Items 中每条 leaf item 的 Name 字段格式为
 *   `"prefix:TypeLocalName/prefix:elemLocalName"`，前半段是 schema 类型名，
 *   该字符串直接对应某个 Type.Name，从而精确定位 ClassName（而无需区分
 *   同 schema 类型下的多个具体类）。
 *
 * 跑法：`bun run tools/schema-codegen/gen-child-map.ts`
 * 或通过 package.json scripts:
 *   gen:child-maps — 为所有 core + extension namespaces 生成 _child-map.ts
 */

import { mkdir, readFile, readdirSync, writeFile } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { classNameToFileName } from "./transforms/names.js";

const mkdirAsync = promisify(mkdir);
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");

function findSchemasDir(): string {
  const candidates = [
    resolve(REPO_ROOT, "../../github/Open-XML-SDK/data/schemas"),
    "/Users/rongshen/github/Open-XML-SDK/data/schemas",
  ];
  for (const c of candidates) {
    try {
      readdirSync(c);
      return c;
    } catch {
      // try next
    }
  }
  throw new Error(`Cannot find Open-XML-SDK schemas dir. Tried:\n${candidates.join("\n")}`);
}

const SCHEMAS_DIR = findSchemasDir();

// Well-known prefix → URI mapping
const PREFIX_TO_URI: Record<string, string> = {
  w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
  a: "http://schemas.openxmlformats.org/drawingml/2006/main",
  p: "http://schemas.openxmlformats.org/presentationml/2006/main",
  r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
  mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
  wp: "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing",
  pic: "http://schemas.openxmlformats.org/drawingml/2006/picture",
  x: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  xl: "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
  v: "urn:schemas-microsoft-com:vml",
  o: "urn:schemas-microsoft-com:office:office",
  xvml: "urn:schemas-microsoft-com:office:excel",
  w10: "urn:schemas-microsoft-com:office:word",
  pvml: "urn:schemas-microsoft-com:office:powerpoint",
  m: "http://schemas.openxmlformats.org/officeDocument/2006/math",
  w14: "http://schemas.microsoft.com/office/word/2010/wordml",
  w15: "http://schemas.microsoft.com/office/word/2012/wordml",
  c: "http://schemas.openxmlformats.org/drawingml/2006/chart",
  xdr: "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing",
  cdr: "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing",
  ap: "http://schemas.openxmlformats.org/officeDocument/2006/extended-properties",
  op: "http://schemas.openxmlformats.org/officeDocument/2006/custom-properties",
  vt: "http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes",
  b: "http://schemas.openxmlformats.org/officeDocument/2006/bibliography",
  ds: "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
  sl: "http://schemas.openxmlformats.org/schemaLibrary/2006/main",
  lc: "http://schemas.openxmlformats.org/drawingml/2006/lockedCanvas",
  comp: "http://schemas.openxmlformats.org/drawingml/2006/compatibility",
  dgm: "http://schemas.openxmlformats.org/drawingml/2006/diagram",
  cx: "http://schemas.microsoft.com/office/drawing/2014/chartex",
  x14: "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main",
  x15: "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main",
  p14: "http://schemas.microsoft.com/office/powerpoint/2010/main",
  a14: "http://schemas.microsoft.com/office/drawing/2010/main",
  wpc: "http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas",
  wp14: "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing",
  wpg: "http://schemas.microsoft.com/office/word/2010/wordprocessingGroup",
  wps: "http://schemas.microsoft.com/office/word/2010/wordprocessingShape",
};

interface ParticleItem {
  readonly Name?: string;
  readonly Kind?: string;
  readonly Occurs?: readonly unknown[];
  readonly Items?: readonly ParticleItem[];
}

interface SchemaParticle {
  readonly Kind: string;
  readonly Occurs?: readonly unknown[];
  readonly Items: readonly ParticleItem[];
}

interface SchemaType {
  readonly Name: string;
  readonly ClassName: string;
  readonly IsAbstract?: boolean;
  readonly IsLeafElement?: boolean;
  readonly IsLeafText?: boolean;
  readonly Particle?: SchemaParticle;
}

interface SchemaFile {
  readonly TargetNamespace: string;
  readonly Types: readonly SchemaType[];
}

/** Schemas to process: [schemaFileName, outputDir, elementDepth, subsystemPascal] */
const SCHEMAS: ReadonlyArray<readonly [string, string, number, string]> = [
  [
    "schemas_openxmlformats_org_wordprocessingml_2006_main.json",
    "src/word/generated",
    2,
    "Wordprocessing",
  ],
  [
    "schemas_openxmlformats_org_spreadsheetml_2006_main.json",
    "src/excel/generated",
    2,
    "Spreadsheet",
  ],
  [
    "schemas_openxmlformats_org_presentationml_2006_main.json",
    "src/ppt/generated",
    2,
    "Presentation",
  ],
  ["schemas_openxmlformats_org_drawingml_2006_main.json", "src/drawing/generated", 2, "Drawing"],
  ["schemas_openxmlformats_org_drawingml_2006_chart.json", "src/chart/generated", 2, "Chart"],
  ["schemas_openxmlformats_org_drawingml_2006_picture.json", "src/picture/generated", 2, "Picture"],
  [
    "schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json",
    "src/spreadsheet-drawing/generated",
    2,
    "SpreadsheetDrawing",
  ],
  [
    "schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json",
    "src/wordprocessing-drawing/generated",
    2,
    "WordprocessingDrawing",
  ],
  [
    "schemas_openxmlformats_org_drawingml_2006_chartDrawing.json",
    "src/chart-drawing/generated",
    2,
    "ChartDrawing",
  ],
  ["schemas_openxmlformats_org_drawingml_2006_diagram.json", "src/diagram/generated", 2, "Diagram"],
  ["schemas_openxmlformats_org_officeDocument_2006_math.json", "src/math/generated", 2, "Math"],
  [
    "schemas_microsoft_com_office_drawing_2014_chartex.json",
    "src/chart-ex/generated",
    2,
    "ChartEx",
  ],
  [
    "schemas_microsoft_com_office_spreadsheetml_2009_9_main.json",
    "src/excel-2009/generated",
    2,
    "Excel2009",
  ],
  ["schemas_microsoft_com_office_word_2010_wordml.json", "src/word-2010/generated", 2, "Word2010"],
  [
    "schemas_microsoft_com_office_spreadsheetml_2010_11_main.json",
    "src/excel-2010/generated",
    2,
    "Excel2010",
  ],
  [
    "schemas_microsoft_com_office_powerpoint_2010_main.json",
    "src/ppt-2010/generated",
    2,
    "Ppt2010",
  ],
  [
    "schemas_microsoft_com_office_drawing_2010_main.json",
    "src/drawing-2010/generated",
    2,
    "Drawing2010",
  ],
  // vml family (Epic-94: regenerated with new value types, needs _child-map.ts)
  ["schemas-microsoft-com_vml.json", "src/vml/generated", 2, "Vml"],
  ["schemas-microsoft-com_office_office.json", "src/vml-office/generated", 2, "VmlOffice"],
  ["schemas-microsoft-com_office_word.json", "src/vml-word/generated", 2, "VmlWord"],
  ["schemas-microsoft-com_office_excel.json", "src/vml-excel/generated", 2, "VmlExcel"],
  [
    "schemas-microsoft-com_office_powerpoint.json",
    "src/vml-powerpoint/generated",
    2,
    "VmlPowerpoint",
  ],
];

function resolveNs(prefix: string, targetNs: string): string {
  if (prefix.length === 0) return targetNs;
  return PREFIX_TO_URI[prefix] ?? targetNs;
}

/**
 * Parse element qname from particle item Name: `"prefix:TypeName/prefix:localName"`.
 * Returns { ns, local } using the element part after the slash.
 */
function parseItemElemQName(name: string, targetNs: string): { ns: string; local: string } | null {
  const slash = name.indexOf("/");
  if (slash === -1) return null;
  const elemPart = name.slice(slash + 1);
  const colon = elemPart.indexOf(":");
  if (colon === -1) return { ns: targetNs, local: elemPart };
  const prefix = elemPart.slice(0, colon);
  const local = elemPart.slice(colon + 1);
  return { ns: resolveNs(prefix, targetNs), local };
}

/** Collect all leaf item Names from a particle tree. */
function collectLeafNames(particle: SchemaParticle | ParticleItem): string[] {
  const out: string[] = [];
  const items = particle.Items ?? [];
  for (const item of items) {
    if (item.Name !== undefined) {
      out.push(item.Name);
    } else if (item.Items !== undefined) {
      out.push(...collectLeafNames(item));
    }
  }
  return out;
}

interface ChildEntry {
  /** Parent composite class name */
  readonly parentClassName: string;
  /** Child element namespace URI */
  readonly ns: string;
  /** Child element local name */
  readonly local: string;
  /** Child element class name */
  readonly childClassName: string;
  /** Child element file name (for import) */
  readonly childFileName: string;
}

function processSchema(schemaData: SchemaFile): ChildEntry[] {
  const targetNs = schemaData.TargetNamespace;

  // Build map: type.Name → { className, fileName }
  const nameToClass = new Map<string, { className: string; fileName: string }>();
  for (const t of schemaData.Types) {
    if (t.ClassName.length === 0) continue;
    if (t.Name.length === 0) continue;
    nameToClass.set(t.Name, {
      className: t.ClassName,
      fileName: classNameToFileName(t.ClassName),
    });
  }

  const entries: ChildEntry[] = [];

  for (const t of schemaData.Types) {
    if (t.ClassName.length === 0) continue;
    if (t.IsAbstract === true) continue;
    if (t.IsLeafElement === true || t.IsLeafText === true) continue;
    if (t.Particle === undefined) continue;

    const parentClassName = t.ClassName;

    // Collect all leaf item names from particle
    const leafNames = collectLeafNames(t.Particle);
    // Deduplicate (same child can appear in multiple branches, e.g. choice)
    const seen = new Set<string>();
    for (const itemName of leafNames) {
      if (seen.has(itemName)) continue;
      seen.add(itemName);

      // Parse element qname from item name
      const elemQName = parseItemElemQName(itemName, targetNs);
      if (elemQName === null) continue;

      // Look up child class by exact type.Name match
      const child = nameToClass.get(itemName);
      if (child === undefined) continue;

      entries.push({
        parentClassName,
        ns: elemQName.ns,
        local: elemQName.local,
        childClassName: child.className,
        childFileName: child.fileName,
      });
    }
  }

  return entries;
}

function buildChildMapOutput(
  entries: ChildEntry[],
  sourcePath: string,
  subsystemPascal: string,
  elementDepth: number,
): string {
  if (entries.length === 0) {
    return [
      "// THIS FILE IS GENERATED BY tools/schema-codegen/gen-child-map.ts. DO NOT EDIT.",
      `// Source: ${sourcePath}`,
      "",
      `import type { ElementRegistry } from "${"../".repeat(elementDepth)}element/index.js";`,
      "",
      `/** 空：${subsystemPascal} 命名空间无复合元素子类型映射。 */`,
      `export function register${subsystemPascal}ChildMaps(_registry: ElementRegistry): void {}`,
      "",
    ].join("\n");
  }

  // Group entries by parentClassName
  const byParent = new Map<string, ChildEntry[]>();
  for (const e of entries) {
    let arr = byParent.get(e.parentClassName);
    if (arr === undefined) {
      arr = [];
      byParent.set(e.parentClassName, arr);
    }
    arr.push(e);
  }

  // Collect all unique child classes needed for import
  const childClasses = new Map<string, string>(); // className → fileName
  for (const e of entries) {
    childClasses.set(e.childClassName, e.childFileName);
  }

  // Sort parent class names deterministically
  const sortedParents = [...byParent.keys()].sort();

  // Build imports: parent classes + child classes
  // Parent classes needed to get runtime class name
  // Actually we key by string (class name), so we don't need to import parents.
  // We only need to import child classes.
  const sortedChildClasses = [...childClasses.entries()].sort((a, b) => a[0].localeCompare(b[0]));

  const importLines = sortedChildClasses
    .map(([cn, fn]) => `import { ${cn} } from "./${fn}.js";`)
    .join("\n");

  // Build registration blocks
  const registrationBlocks: string[] = [];
  for (const parentClassName of sortedParents) {
    const childEntries = byParent.get(parentClassName)!;
    const entriesStr = childEntries
      .map(
        (e) =>
          `    [${JSON.stringify(e.ns)}, ${JSON.stringify(e.local)}, ${e.childClassName}] as const,`,
      )
      .join("\n");
    registrationBlocks.push(
      `  registry.registerChildMap(${JSON.stringify(parentClassName)}, [\n${entriesStr}\n  ]);`,
    );
  }

  return [
    "// THIS FILE IS GENERATED BY tools/schema-codegen/gen-child-map.ts. DO NOT EDIT.",
    `// Source: ${sourcePath}`,
    "",
    `import type { ElementRegistry } from "${"../".repeat(elementDepth)}element/index.js";`,
    importLines,
    "",
    "/**",
    ` * 把 ${subsystemPascal} 命名空间下所有复合元素的子类型映射注册到 ElementRegistry。`,
    " * 与 registerXxxElements 配合调用，启用上下文感知反序列化（Epic-86）。",
    " */",
    `export function register${subsystemPascal}ChildMaps(registry: ElementRegistry): void {`,
    registrationBlocks.join("\n"),
    "}",
    "",
  ].join("\n");
}

async function main(): Promise<void> {
  let processed = 0;
  let skipped = 0;

  for (const [schemaFile, outDir, elementDepth, subsystemPascal] of SCHEMAS) {
    const inputPath = join(SCHEMAS_DIR, schemaFile);
    let json: SchemaFile;
    try {
      const raw = await readFileAsync(inputPath, "utf-8");
      json = JSON.parse(raw) as SchemaFile;
    } catch {
      process.stderr.write(`  SKIP (not found): ${schemaFile}\n`);
      skipped++;
      continue;
    }

    const outputDir = resolve(REPO_ROOT, outDir);
    await mkdirAsync(outputDir, { recursive: true });

    const entries = processSchema(json);
    const sourcePath = schemaFile;
    const content = buildChildMapOutput(entries, sourcePath, subsystemPascal, elementDepth);

    const outPath = join(outputDir, "_child-map.ts");
    await writeFileAsync(outPath, content);
    process.stdout.write(`  ${subsystemPascal}: ${entries.length} child entries -> ${outPath}\n`);
    processed++;
  }

  process.stdout.write(`\nDone: ${processed} schemas processed, ${skipped} skipped.\n`);
}

main().catch((err) => {
  process.stderr.write(`gen-child-map failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
