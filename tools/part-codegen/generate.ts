#!/usr/bin/env -S bun run
/**
 * Part codegen — Epic-77
 *
 * 从 data/parts/*.json 生成 TypedXmlPart / BinaryPart 子类。
 *
 * 规则：
 * - Base == "OpenXmlPackage" 或无 RelationshipType → 跳过
 * - 名字已在 HAND_WRITTEN 集合中 → 跳过（手写版优先）
 * - 有 ContentType（XML 类型）且无 Extension → TypedXmlPart<OpenXmlElement>
 * - 有 Extension（二进制）且无 ContentType → BinaryPart（无 contentType 静态常量）
 * - 有 Extension + ContentType（如 VbaProjectPart）→ BinaryPart（有 contentType 静态常量）
 * - CustomUIPart / StylesPart 等非标 base → 降级 TypedXmlPart（faithful 简化）
 *
 * 输出：
 * - src/parts/generated/<kebab-name>.ts  每个 Part 类一个文件
 * - src/parts/generated/index.ts          barrel 导出
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../..");
const DATA_DIR = "/Users/rongshen/github/Open-XML-SDK/data/parts";
const OUT_DIR = resolve(REPO_ROOT, "src/parts/generated");

/** Part 名字已被手写实现 — codegen 跳过，手写版优先。 */
const HAND_WRITTEN = new Set([
  "BinaryPart",
  "CalculationChainPart",
  "ChartPart",
  "CoreFilePropertiesPart",
  "CorePropertiesPart",
  "CustomFilePropertiesPart",
  "CustomXmlPart",
  "CustomXmlPropertiesPart",
  "DrawingPart",
  "DrawingsPart",
  "ExtendedFilePropertiesPart",
  "FontTablePart",
  "FooterPart",
  "FootnotesPart",
  "HeaderPart",
  "ImagePart",
  "MainDocumentPart",
  "NotesMasterPart",
  "NotesSlidePart",
  "NumberingDefinitionsPart",
  "PresentationPart",
  "SettingsPart",
  "SharedStringTablePart",
  "SlideLayoutPart",
  "SlideMasterPart",
  "SlidePart",
  "StyleDefinitionsPart",
  "StylesPart",
  "ThemePart",
  "WebSettingsPart",
  "WorkbookPart",
  "WorkbookStylesPart",
  "WorksheetPart",
]);

interface PartDef {
  Name: string;
  Base?: string;
  RelationshipType?: string;
  ContentType?: string;
  Target?: string;
  Extension?: string;
  Paths?: Record<string, string>;
  Version?: string;
}

/** PascalCase → kebab-case (e.g. AlternativeFormatImportPart → alternative-format-import-part) */
function toKebab(name: string): string {
  return name
    .replace(/([A-Z])/g, (_m, c, offset) =>
      offset === 0 ? c.toLowerCase() : `-${c.toLowerCase()}`,
    )
    .replace(/-+/g, "-");
}

/** Determine whether a part should use BinaryPart base. */
function isBinary(def: PartDef): boolean {
  // Has an Extension field (e.g. .bin, .dat, .glb) → binary/opaque blob
  // even if it also has a ContentType (VbaProjectPart etc.)
  if (def.Extension) return true;
  // Explicit binary/octet content types
  if (def.ContentType === "application/binary") return true;
  return false;
}

function generateTypedXmlPart(def: PartDef): string {
  const { Name, RelationshipType, ContentType } = def;

  const contentTypeLine = ContentType
    ? `  static readonly contentType = ${JSON.stringify(ContentType)};\n`
    : "";

  return `/**
 * \`${Name}\` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.${Name}.
 *
 * Root element is an opaque \`OpenXmlUnknownElement\` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class ${Name} extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = ${JSON.stringify(RelationshipType)};
${contentTypeLine}
  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, ${Name}Root);
  }
}

class ${Name}Root extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
`;
}

function generateBinaryPart(def: PartDef): string {
  const { Name, RelationshipType, ContentType, Extension } = def;

  const contentTypeLine = ContentType
    ? `  static readonly contentType = ${JSON.stringify(ContentType)};\n`
    : "";

  const extensionLine = Extension
    ? `  static readonly extension = ${JSON.stringify(Extension)};\n`
    : "";

  return `/**
 * \`${Name}\` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.${Name}.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class ${Name} extends BinaryPart {
  static readonly relationshipType = ${JSON.stringify(RelationshipType)};
${contentTypeLine}${extensionLine}
  constructor(part: IPackagePart) {
    super(part);
  }
}
`;
}

async function main(): Promise<void> {
  await mkdir(OUT_DIR, { recursive: true });

  const files = (await import("node:fs"))
    .readdirSync(DATA_DIR)
    .filter((f: string) => f.endsWith(".json"))
    .sort();

  const generated: string[] = [];
  const skipped: string[] = [];

  for (const file of files as string[]) {
    const raw = await readFile(join(DATA_DIR, file), "utf-8");
    const def: PartDef = JSON.parse(raw);

    const { Name, Base, RelationshipType } = def;

    // Skip document types (OpenXmlPackage)
    if (Base === "OpenXmlPackage") {
      skipped.push(`${Name} (OpenXmlPackage)`);
      continue;
    }
    // Skip parts without a RelationshipType (shouldn't happen in the data but guard anyway)
    if (!RelationshipType) {
      skipped.push(`${Name} (no RelationshipType)`);
      continue;
    }
    // Skip hand-written parts
    if (HAND_WRITTEN.has(Name)) {
      skipped.push(`${Name} (hand-written)`);
      continue;
    }

    const kebab = toKebab(Name);
    const fileName = `${kebab}.ts`;

    let content: string;
    if (isBinary(def)) {
      content = generateBinaryPart(def);
    } else {
      content = generateTypedXmlPart(def);
    }

    await writeFile(join(OUT_DIR, fileName), content, "utf-8");
    generated.push(Name);
    process.stdout.write(`  ✓ ${Name} → ${fileName}\n`);
  }

  // Write barrel index.ts (sorted for determinism)
  const exportLines = generated
    .slice()
    .sort()
    .map((name) => `export { ${name} } from "./${toKebab(name)}.js";`)
    .join("\n");

  const indexContent = `/**
 * Generated typed Part classes — Epic-77.
 * Do not edit manually; re-run \`tools/part-codegen/generate.ts\` to regenerate.
 */

${exportLines}
`;

  await writeFile(join(OUT_DIR, "index.ts"), indexContent, "utf-8");

  process.stdout.write(`\nGenerated ${generated.length} parts → ${OUT_DIR}\n`);
  process.stdout.write(`Skipped ${skipped.length} parts\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
