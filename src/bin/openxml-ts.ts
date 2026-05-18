#!/usr/bin/env node
/**
 * `openxml-ts` 命令行工具——给非 SDK 用户提供直接检查 docx/xlsx/pptx 的入口。
 *
 * 用法：
 *   openxml-ts inspect <file>           列 part / content-type / relationship
 *   openxml-ts cat <file> <partUri>     打印指定 part 的 XML 到 stdout
 *
 * 不依赖外部 CLI parser（自己写最小 argv 处理）。退出码：
 *   0 成功；1 用户错误；2 内部错误。
 */

import { readFile } from "node:fs/promises";
import { openAsync } from "../index.js";
import type { IPackage } from "../packaging/interfaces/package.js";
import type { PartUri } from "../packaging/interfaces/types.js";

interface CliArgs {
  readonly command: "inspect" | "cat" | "help";
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
      "  openxml-ts --help                  Show this message",
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
      process.stdout.write(`    part-rels:\n`);
      for (const rel of partRels) {
        process.stdout.write(`      ${rel.id} (${rel.type}) → ${rel.target}\n`);
      }
    }
  }
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
}

main().catch((err) => {
  process.stderr.write(`openxml-ts: ${(err as Error).message}\n`);
  process.exit(2);
});
