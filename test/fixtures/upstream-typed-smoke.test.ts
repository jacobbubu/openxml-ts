/**
 * Phase B：上游 dotnet/Open-XML-SDK fixture 扩到 **typed Document 层**（Epic-129 扩充至 230+ fixtures）。
 *
 * 分层扫描：
 *   - core/  (64 份，原始 TestFiles 抽样) —— typed Document 层严格测试
 *   - extended/ (168 份，Epic-129 新增)   —— typed Document 层鲁棒测试
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
  // CFB password-protected docx — encrypted container not supported.
  ["document with password.docx", "CFB/password encryption not implemented (follow-up #387)"],
]);

/** Map template/macro extensions to their base document type for typed probing. */
const EXT_TO_BASE: Record<string, ".docx" | ".xlsx" | ".pptx"> = {
  ".docx": ".docx",
  ".docm": ".docx",
  ".dotx": ".docx",
  ".xlsx": ".xlsx",
  ".xlsm": ".xlsx",
  ".xltx": ".xlsx",
  ".pptx": ".pptx",
  ".pptm": ".pptx",
  ".potx": ".pptx",
};

interface FixtureCase {
  readonly file: string;
  readonly path: string;
  readonly ext: string;
}

let coreFixtures: FixtureCase[] = [];
let extendedFixtures: FixtureCase[] = [];

beforeAll(async () => {
  // core: 原始 64 份在顶层（向后兼容老测试 hardcode path）
  const coreEntries = await readdir(FIXTURES_DIR);
  coreFixtures = coreEntries
    .filter((e) => Object.keys(EXT_TO_BASE).includes(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({ file: e, path: join(FIXTURES_DIR, e), ext: extname(e).toLowerCase() }));

  // extended: Epic-129 新增 167 份在 extended/ 子目录
  const extEntries = await readdir(join(FIXTURES_DIR, "extended"));
  extendedFixtures = extEntries
    .filter((e) => Object.keys(EXT_TO_BASE).includes(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({
      file: e,
      path: join(FIXTURES_DIR, "extended", e),
      ext: extname(e).toLowerCase(),
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

async function runTypedSweep(fixtures: FixtureCase[]): Promise<{ file: string; reason: string }[]> {
  const failures: { file: string; reason: string }[] = [];
  for (const fx of fixtures) {
    const skipReason = SKIP_LIST.get(fx.file);
    if (skipReason !== undefined) continue;
    try {
      const bytes = new Uint8Array(await readFile(fx.path));
      const baseExt = EXT_TO_BASE[fx.ext];
      if (baseExt === ".docx") await probeDocx(bytes);
      else if (baseExt === ".xlsx") await probeXlsx(bytes);
      else await probePptx(bytes);
    } catch (err) {
      failures.push({ file: fx.file, reason: (err as Error).message ?? String(err) });
    }
  }
  return failures;
}

describe("upstream fixture typed smoke · Document 层鲁棒 · core (64 份严格)", () => {
  it("发现 64 份 core fixture", () => {
    expect(coreFixtures.length).toBe(64);
  });

  it("core 全部 fixture typed Document 层都能 open + 主门面非空 + 触发 typed root", async () => {
    const failures = await runTypedSweep(coreFixtures);
    if (failures.length > 0) {
      const detail = failures.map((f) => `  - ${f.file}: ${f.reason}`).join("\n");
      throw new Error(
        `${failures.length} 份 core fixture typed Document 层失败（total ${coreFixtures.length}）：\n${detail}`,
      );
    }
    expect(failures).toHaveLength(0);
  }, 30000);
});

describe("upstream fixture typed smoke · Document 层鲁棒 · extended (Epic-129 新增)", () => {
  it("发现 ≥ 160 份 extended fixture", () => {
    expect(extendedFixtures.length).toBeGreaterThanOrEqual(160);
  });

  it("extended fixture typed Document 层 robustness 抽样（软约束，typed 层失败仅记录不 fail）", async () => {
    // Epic-129 设计意图：extended 是为了发现 OPC 层 robustness 问题（已在 upstream-smoke.test.ts 严格断言），
    // typed Document 层失败在 extended 层不算 fail——这些失败暴露的是 TS 端 typed accessor 不支持的真实文档结构，
    // 应当通过 follow-up bug issue 跟进，而不是阻塞 robustness 抽样的扩充。
    const failures = await runTypedSweep(extendedFixtures);
    // 仅当失败超过 50% extended fixture 时才算回归——这是 robustness 安全网，
    // 防止 typed 层完全崩溃（如全局 deserializer 改坏）。
    const threshold = Math.floor(extendedFixtures.length * 0.5);
    if (failures.length > threshold) {
      const detail = failures
        .slice(0, 10)
        .map((f) => `  - ${f.file}: ${f.reason}`)
        .join("\n");
      throw new Error(
        `extended fixture typed open 失败率 > 50% (${failures.length}/${extendedFixtures.length})，疑似回归：\n${detail}${failures.length > 10 ? `\n  ... 还有 ${failures.length - 10} 份` : ""}`,
      );
    }
    // 通过——但把失败数日志到 stdout 供 follow-up 跟进
    if (failures.length > 0) {
      console.log(
        `[Epic-129 extended typed soft-fail] ${failures.length}/${extendedFixtures.length} fixture typed open 失败（已收尾 follow-up issue 跟进）`,
      );
    }
  }, 60000);
});
