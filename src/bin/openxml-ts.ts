#!/usr/bin/env node
/**
 * `openxml-ts` 命令行工具——给非 SDK 用户提供直接检查 docx/xlsx/pptx 的入口。
 *
 * 用法：
 *   openxml-ts inspect <file>             列 part / content-type / relationship
 *   openxml-ts cat <file> <partUri>       打印指定 part 的 XML 到 stdout
 *   openxml-ts validate <file>            校验 docx/xlsx/pptx
 *
 * 不依赖外部 CLI parser（自己写最小 argv 处理）。退出码：
 *   0 成功（validate 无错误）；1 用户错误；2 内部错误；3 validate 发现错误。
 */

import { readFile } from "node:fs/promises";
import { openAsync } from "../index.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { PartUri } from "../packaging/interfaces/types.js";

interface CliArgs {
  readonly command: "inspect" | "cat" | "validate" | "help";
  readonly file?: string;
  readonly partUri?: string;
}

function parseArgs(argv: readonly string[]): CliArgs {
  const args = [...argv];
  if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
    return { command: "help" };
  }
  const command = args[0] as string;
  if (command === "inspect") {
    if (args[1] === undefined) {
      process.stderr.write("openxml-ts: inspect requires <file>\n");
      process.exit(1);
    }
    return { command: "inspect", file: args[1] };
  }
  if (command === "cat") {
    if (args[1] === undefined || args[2] === undefined) {
      process.stderr.write("openxml-ts: cat requires <file> <partUri>\n");
      process.exit(1);
    }
    return { command: "cat", file: args[1], partUri: args[2] };
  }
  if (command === "validate") {
    if (args[1] === undefined) {
      process.stderr.write("openxml-ts: validate requires <file>\n");
      process.exit(1);
    }
    return { command: "validate", file: args[1] };
  }
  process.stderr.write(`openxml-ts: unknown command "${command}"\n`);
  process.exit(1);
}

function printHelp(): void {
  process.stdout.write(
    [
      "openxml-ts — TypeScript port of Microsoft Open-XML-SDK",
      "",
      "Usage:",
      "  openxml-ts inspect <file>          Show OPC structure (parts, content types, relationships)",
      "  openxml-ts cat <file> <partUri>    Print part XML to stdout (e.g. /word/document.xml)",
      "  openxml-ts validate <file>         Validate docx/xlsx/pptx against ECMA-376 schema",
      "  openxml-ts --help                  Show this message",
      "",
      "validate exits with code 0 when no errors are found, code 3 when errors are found.",
      "",
    ].join("\n"),
  );
}

async function loadPackage(file: string): Promise<IPackage> {
  const bytes = new Uint8Array(await readFile(file));
  if (bytes.byteLength === 0) {
    process.stderr.write(`openxml-ts: file ${file} is empty\n`);
    process.exit(1);
  }
  return openAsync(bytes);
}

async function cmdInspect(file: string): Promise<void> {
  const pkg = await loadPackage(file);
  const parts = [...pkg.parts()];
  process.stdout.write(`=== ${file} ===\n`);
  process.stdout.write(`Parts: ${parts.length}\n`);
  process.stdout.write(`Package relationships: ${pkg.relationships.count}\n\n`);

  process.stdout.write("Package-level relationships:\n");
  for (const rel of pkg.relationships) {
    process.stdout.write(`  ${rel.id} (${rel.type}) → ${rel.target}\n`);
  }
  process.stdout.write("\nParts:\n");
  for (const part of parts) {
    process.stdout.write(`  ${part.uri}\n`);
    process.stdout.write(`    contentType: ${part.contentType}\n`);
    const partRels = [...part.relationships];
    if (partRels.length > 0) {
      process.stdout.write("    part-rels:\n");
      for (const rel of partRels) {
        process.stdout.write(`      ${rel.id} (${rel.type}) → ${rel.target}\n`);
      }
    }
  }
}

async function cmdValidate(file: string): Promise<void> {
  const bytes = new Uint8Array(await readFile(file));
  if (bytes.byteLength === 0) {
    process.stderr.write(`openxml-ts: file ${file} is empty\n`);
    process.exit(1);
  }

  // Auto-detect format from content type of first main part
  const pkg = await openAsync(bytes);
  const parts = [...pkg.parts()];
  const mainPart = parts.find(
    (p) =>
      p.contentType?.includes("wordprocessingml") ||
      p.contentType?.includes("spreadsheetml") ||
      p.contentType?.includes("presentationml"),
  );

  if (!mainPart) {
    process.stderr.write("openxml-ts: could not detect document type from package contents.\n");
    process.exit(1);
  }

  const { OpenXmlValidator, registerConstraints } = await import("../validation/OpenXmlValidator.js");
  const formatName = mainPart.contentType.includes("wordprocessingml")
    ? "Word"
    : mainPart.contentType.includes("spreadsheetml")
      ? "Excel"
      : "PPT";

  // Lazy-load and register constraints for the detected format
  const validator = new OpenXmlValidator();
  let errors: ReturnType<typeof validator.validate>;

  if (formatName === "Word") {
    const { constraints: word } = await import("../validation/constraints/word.js");
    const { constraints: drawing } = await import("../validation/constraints/drawing.js");
    registerConstraints(word);
    registerConstraints(drawing);
    const { WordprocessingDocument } = await import("../word/index.js");
    const doc = await WordprocessingDocument.openAsync(bytes);
    process.stderr.write(`Validating ${file} as Word...\n`);
    errors = validator.validate(doc);
  } else if (formatName === "Excel") {
    const { constraints: excel } = await import("../validation/constraints/excel.js");
    const { constraints: drawing } = await import("../validation/constraints/drawing.js");
    const { constraints: ssDrawing } = await import("../validation/constraints/spreadsheet-drawing.js");
    registerConstraints(excel);
    registerConstraints(drawing);
    registerConstraints(ssDrawing);
    const { SpreadsheetDocument } = await import("../excel/index.js");
    const doc = await SpreadsheetDocument.openAsync(bytes);
    process.stderr.write(`Validating ${file} as Excel...\n`);
    errors = validator.validate(doc);
  } else {
    const { constraints: ppt } = await import("../validation/constraints/ppt.js");
    const { constraints: drawing } = await import("../validation/constraints/drawing.js");
    registerConstraints(ppt);
    registerConstraints(drawing);
    const { PresentationDocument } = await import("../ppt/index.js");
    const doc = await PresentationDocument.openAsync(bytes);
    process.stderr.write(`Validating ${file} as PPT...\n`);
    errors = validator.validate(doc);
  }

  if (errors.length === 0) {
    process.stdout.write("No validation errors found.\n");
    return;
  }

  process.stdout.write(`\n${errors.length} validation error(s):\n\n`);
  for (const e of errors) {
    const typeLabel =
      e.errorType === "Schema"
        ? "Schema"
        : e.errorType === "Semantic"
          ? "Semantic"
          : e.errorType === "MarkupCompatibility"
            ? "MC"
            : "Package";
    process.stdout.write(`[${typeLabel}] ${e.id}\n`);
    process.stdout.write(`  ${e.description}\n`);
    if (e.path) process.stdout.write(`  path: ${e.path}\n`);
    process.stdout.write("\n");
  }

  process.exit(3);
}

async function cmdCat(file: string, partUri: string): Promise<void> {
  const pkg = await loadPackage(file);
  if (!pkg.hasPart(partUri as PartUri)) {
    process.stderr.write(`openxml-ts: part not found: ${partUri}\n`);
    process.exit(1);
  }
  const part = pkg.getPart(partUri as PartUri);
  const reader = part.openReadStream().getReader();
  const chunks: Uint8Array[] = [];
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value !== undefined) chunks.push(value);
  }
  for (const c of chunks) process.stdout.write(c);
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.command === "help") {
    printHelp();
    return;
  }
  if (args.command === "inspect") {
    await cmdInspect(args.file as string);
    return;
  }
  if (args.command === "cat") {
    await cmdCat(args.file as string, args.partUri as string);
    return;
  }
  if (args.command === "validate") {
    await cmdValidate(args.file as string);
    return;
  }
}

main().catch((err) => {
  process.stderr.write(`openxml-ts: ${(err as Error).message}\n`);
  process.exit(2);
});
