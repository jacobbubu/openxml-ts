/**
 * Phase B：上游 64 份 dotnet/Open-XML-SDK fixture 扩到 **typed Document 层**。
 *
 * OPC 层守护已在 `upstream-smoke.test.ts` 落地。本测试再上一层：按扩展名分组路由
 * 到对应 typed Document，触发 typed root 加载，断言主门面可用——更接近真实用法
 * 路径，能抓出 OPC 层过但 typed Part lazy 加载抛错的回归。
 *
 * 与 OPC 层守护互补，不替代：
 * - OPC smoke 验「ZIP / Part / Relationship 解析不抛」；
 * - Typed smoke 验「门面 + typed Part lazy chain 不抛、关键集合非空」。
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "upstream-smoke");

/** 暂跳列表。每条配「原因」。 */
const SKIP_LIST: ReadonlyMap<string, string> = new Map([
  ["encrypted_pptx.pptx", "encryption not implemented (Phase D)"],
]);

interface FixtureCase {
  readonly file: string;
  readonly path: string;
  readonly ext: ".docx" | ".xlsx" | ".pptx";
}

let fixtures: FixtureCase[] = [];

beforeAll(async () => {
  const entries = await readdir(FIXTURES_DIR);
  fixtures = entries
    .filter((e) => [".docx", ".xlsx", ".pptx"].includes(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({
      file: e,
      path: join(FIXTURES_DIR, e),
      ext: extname(e).toLowerCase() as ".docx" | ".xlsx" | ".pptx",
    }));
});

async function probeDocx(bytes: Uint8Array): Promise<void> {
  const doc = await WordprocessingDocument.openAsync(bytes);
  const main = doc.mainDocumentPart;
  if (main === undefined) throw new Error("missing mainDocumentPart");
  let count = 0;
  for (const _ of main.document.descendants()) {
    count += 1;
    if (count >= 50) break; // 50 个 element 够烟雾测试
  }
}

async function probeXlsx(bytes: Uint8Array): Promise<void> {
  const doc = await SpreadsheetDocument.openAsync(bytes);
  const wp = doc.workbookPart;
  if (wp === undefined) throw new Error("missing workbookPart");
  if (wp.worksheetParts.length === 0) throw new Error("0 worksheetParts");
  void wp.workbook;
}

async function probePptx(bytes: Uint8Array): Promise<void> {
  const doc = await PresentationDocument.openAsync(bytes);
  const pp = doc.presentationPart;
  if (pp === undefined) throw new Error("missing presentationPart");
  void pp.presentation;
  void pp.slideParts; // 触发解析（即使 0 张也不抛）
}

describe("upstream fixture typed smoke · Document 层鲁棒", () => {
  it("发现 ≥ 60 份 fixture（确保未被误删）", () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(60);
  });

  it("63 份 (跳 encrypted) typed Document 层都能 open + 主门面非空 + 触发 typed root", async () => {
    const failures: { file: string; reason: string }[] = [];
    let probed = 0;
    let skipped = 0;
    for (const fx of fixtures) {
      const skipReason = SKIP_LIST.get(fx.file);
      if (skipReason !== undefined) {
        skipped += 1;
        continue;
      }
      try {
        const bytes = new Uint8Array(await readFile(fx.path));
        if (fx.ext === ".docx") await probeDocx(bytes);
        else if (fx.ext === ".xlsx") await probeXlsx(bytes);
        else await probePptx(bytes);
        probed += 1;
      } catch (err) {
        failures.push({ file: fx.file, reason: (err as Error).message ?? String(err) });
      }
    }
    if (failures.length > 0) {
      const detail = failures.map((f) => `  - ${f.file}: ${f.reason}`).join("\n");
      throw new Error(
        `${failures.length} 份 fixture typed Document 层失败（probed ${probed} / skipped ${skipped} / total ${fixtures.length}）：\n${detail}`,
      );
    }
    // 报告通过个数
    expect(probed + skipped).toBe(fixtures.length);
  });
});
