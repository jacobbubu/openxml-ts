#!/usr/bin/env -S node --experimental-strip-types
/**
 * Golden 生成器 —— 把 `test/fixtures/golden/*.{docx,xlsx,pptx}` 用 openxml-ts 读出来，
 * 把 OPC 结构（Parts / Content-Types / Relationships）落到对应 `<name>.golden.json`。
 *
 * 用法：
 *   pnpm tsx tools/golden-generator/generate.ts
 *
 * 何时跑：fixture 新增/替换、或公共 API 行为变更影响快照时。
 *
 * 未来扩展：本工具旨在被 .NET cli 实现替代，以提供跨实现的「真正黄金」
 * 参照。见同目录 README.md。
 */

import { readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { SpreadsheetDocument } from "../../src/excel/index.ts";
import { openAsync } from "../../src/index.ts";
import { PresentationDocument } from "../../src/ppt/index.ts";
import { WordprocessingDocument } from "../../src/word/index.ts";
import { snapshotElement } from "./element-snapshot.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
/**
 * 扫描目录列表——「中央 fixtures」+ 子系统专属 fixtures（Story-4.7 起把 pptx
 * 集中到 test/ppt/fixtures/）。任何 docx/xlsx/pptx 都会在原地生成 .golden.json
 * 与（若实现 element snapshot）.element.golden.json。
 */
const FIXTURES_DIRS = [
  resolve(HERE, "../../test/fixtures/golden"),
  resolve(HERE, "../../test/ppt/fixtures"),
];

interface RelSnapshot {
  id: string;
  type: string;
  targetMode: string;
  target: string;
}

interface PartSnapshot {
  uri: string;
  contentType: string;
  contentByteLength: number;
  relationships: RelSnapshot[];
}

interface ContentTypeSnapshot {
  defaults: Array<{ extension: string; contentType: string }>;
  overrides: Array<{ partName: string; contentType: string }>;
}

interface GoldenSnapshot {
  source: string;
  generatedBy: string;
  parts: PartSnapshot[];
  packageRelationships: RelSnapshot[];
  contentTypes: ContentTypeSnapshot;
}

async function readBytes(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    if (value !== undefined) {
      chunks.push(value);
      total += value.byteLength;
    }
  }
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return out;
}

async function snapshot(filePath: string): Promise<GoldenSnapshot> {
  const bytes = new Uint8Array(await readFile(filePath));
  const pkg = await openAsync(bytes);
  const parts: PartSnapshot[] = [];
  for (const p of pkg.parts()) {
    const content = await readBytes(p.openReadStream());
    parts.push({
      uri: p.uri,
      contentType: p.contentType,
      contentByteLength: content.byteLength,
      relationships: [...p.relationships].map((r) => ({
        id: r.id,
        type: r.type,
        targetMode: r.targetMode,
        target: r.target,
      })),
    });
  }
  const contentTypes: ContentTypeSnapshot = {
    defaults: [...pkg.contentTypes.defaults()].map((d) => ({
      extension: d.extension,
      contentType: d.contentType,
    })),
    overrides: [...pkg.contentTypes.overrides()].map((o) => ({
      partName: o.partName,
      contentType: o.contentType,
    })),
  };
  return {
    source: filePath.split("/").slice(-1)[0] ?? filePath,
    generatedBy: "openxml-ts tools/golden-generator",
    parts,
    packageRelationships: [...pkg.relationships].map((r) => ({
      id: r.id,
      type: r.type,
      targetMode: r.targetMode,
      target: r.target,
    })),
    contentTypes,
  };
}

async function elementSnapshot(filePath: string): Promise<unknown> {
  const bytes = new Uint8Array(await readFile(filePath));
  const doc = await WordprocessingDocument.openAsync(bytes);
  const main = doc.mainDocumentPart;
  if (main === undefined) {
    throw new Error("missing main document part");
  }
  return {
    source: filePath.split("/").slice(-1)[0],
    generatedBy: "openxml-ts tools/golden-generator",
    document: snapshotElement(main.document),
  };
}

async function elementSnapshotXlsx(filePath: string): Promise<unknown> {
  const bytes = new Uint8Array(await readFile(filePath));
  const doc = await SpreadsheetDocument.openAsync(bytes);
  const wp = doc.workbookPart;
  if (wp === undefined) {
    throw new Error("missing workbook part");
  }
  const worksheets = wp.worksheetParts.map((wsp) => snapshotElement(wsp.worksheet));
  return {
    source: filePath.split("/").slice(-1)[0],
    generatedBy: "openxml-ts tools/golden-generator",
    workbook: snapshotElement(wp.workbook),
    worksheets,
  };
}

async function elementSnapshotPptx(filePath: string): Promise<unknown> {
  const bytes = new Uint8Array(await readFile(filePath));
  const doc = await PresentationDocument.openAsync(bytes);
  const pp = doc.presentationPart;
  if (pp === undefined) {
    throw new Error("missing presentation part");
  }
  const slides = pp.slideParts.map((sp) => snapshotElement(sp.slide));
  return {
    source: filePath.split("/").slice(-1)[0],
    generatedBy: "openxml-ts tools/golden-generator",
    presentation: snapshotElement(pp.presentation),
    slides,
  };
}

async function main(): Promise<void> {
  for (const dir of FIXTURES_DIRS) {
    await processDir(dir);
  }
}

async function processDir(fixturesDir: string): Promise<void> {
  let entries: string[];
  try {
    entries = await readdir(fixturesDir);
  } catch {
    // 目录尚未建立时静默跳（fixtures 全空场景）
    return;
  }
  for (const entry of entries) {
    const ext = extname(entry).toLowerCase();
    if (ext !== ".docx" && ext !== ".xlsx" && ext !== ".pptx") continue;
    const filePath = join(fixturesDir, entry);
    process.stdout.write(`Generating golden for ${entry} ... `);
    const snap = await snapshot(filePath);
    const out = `${filePath}.golden.json`;
    await writeFile(out, `${JSON.stringify(snap, null, 2)}\n`);
    process.stdout.write("opc");

    // Story-2.8：docx 走 WordprocessingDocument element snapshot。
    // Story-3.7：xlsx 走 SpreadsheetDocument element snapshot（workbook +
    // 全部 worksheet 子树）。
    // Story-4.7：pptx 走 PresentationDocument element snapshot（presentation +
    // 全部 slide 子树）。
    if (ext === ".docx") {
      const elemSnap = await elementSnapshot(filePath);
      const elemOut = `${filePath}.element.golden.json`;
      await writeFile(elemOut, `${JSON.stringify(elemSnap, null, 2)}\n`);
      process.stdout.write(" + element");
    } else if (ext === ".xlsx") {
      const elemSnap = await elementSnapshotXlsx(filePath);
      const elemOut = `${filePath}.element.golden.json`;
      await writeFile(elemOut, `${JSON.stringify(elemSnap, null, 2)}\n`);
      process.stdout.write(" + element");
    } else if (ext === ".pptx") {
      const elemSnap = await elementSnapshotPptx(filePath);
      const elemOut = `${filePath}.element.golden.json`;
      await writeFile(elemOut, `${JSON.stringify(elemSnap, null, 2)}\n`);
      process.stdout.write(" + element");
    }
    process.stdout.write("\n");
  }
}

main().catch((err) => {
  process.stderr.write(`golden-generator failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
