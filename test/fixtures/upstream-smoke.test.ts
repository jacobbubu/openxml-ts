/**
 * 上游 dotnet/Open-XML-SDK 测试 fixture 烟雾测试（Epic-129 扩充至 230+ fixtures）。
 *
 * 分层扫描：
 *   - core/  (64 份，原始 TestFiles 抽样) —— OPC 层鲁棒
 *   - extended/ (168 份，Epic-129 新增)   —— OPC 层鲁棒
 *
 * 断言（对两层均适用）：
 * - 包能解（不抛）；
 * - parts() 可枚举；
 * - 包级 relationships 可读；
 * - 至少有 1 个 Part；
 *
 * 这是覆盖长尾的最低门槛——不验内容正确性，只保 OPC 层鲁棒。
 *
 * 若某 fixture 用了 OOXML Strict 命名空间、加密 (encrypted_*)、或其它本 SDK
 * 暂未实现的能力，加入 SKIP_LIST 暂跳，并在 issue 里记录。
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { openAsync } from "../../src/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "upstream-smoke");

/** OPC-capable extensions scanned by this test (includes template variants). */
const SCANNED_EXTS = new Set([
  ".docx",
  ".xlsx",
  ".pptx",
  ".dotx",
  ".xltx",
  ".potx",
  ".docm",
  ".xlsm",
  ".pptm",
]);

/**
 * 已知暂跳——每条配「原因」+ issue / Epic 链接。
 * 列表里的 fixture 仍参与 list（验证文件存在），但 openAsync 不强制成功。
 */
const SKIP_LIST: ReadonlyMap<string, string> = new Map([
  // encrypted pptx：OOXML 加密支持不在 v0.6.0 范围。
  ["encrypted_pptx.pptx", "encryption not implemented"],
  // CFB password-protected docx — encrypted container not supported.
  ["document with password.docx", "CFB/password encryption not implemented (follow-up #387)"],
]);

interface FixtureCase {
  readonly file: string;
  readonly path: string;
  readonly ext: string;
}

let coreFixtures: FixtureCase[] = [];
let extendedFixtures: FixtureCase[] = [];

beforeAll(async () => {
  // core: 原始 64 份在顶层（保持向后兼容，被多个老测试 hardcode path）
  const coreEntries = await readdir(FIXTURES_DIR);
  coreFixtures = coreEntries
    .filter((e) => SCANNED_EXTS.has(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({ file: e, path: join(FIXTURES_DIR, e), ext: extname(e).toLowerCase() }));

  // extended: Epic-129 新增 167 份在 extended/ 子目录
  const extEntries = await readdir(join(FIXTURES_DIR, "extended"));
  extendedFixtures = extEntries
    .filter((e) => SCANNED_EXTS.has(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({
      file: e,
      path: join(FIXTURES_DIR, "extended", e),
      ext: extname(e).toLowerCase(),
    }));
});

async function runOpcSweep(fixtures: FixtureCase[]): Promise<{ file: string; reason: string }[]> {
  const failures: { file: string; reason: string }[] = [];
  for (const fx of fixtures) {
    const skipReason = SKIP_LIST.get(fx.file);
    try {
      const bytes = new Uint8Array(await readFile(fx.path));
      const pkg = await openAsync(bytes);
      const parts = [...pkg.parts()];
      if (parts.length === 0) {
        failures.push({ file: fx.file, reason: "empty parts list" });
        continue;
      }
      // 包级关系可读（即使 0 条也不抛）
      void pkg.relationships.count;
    } catch (err) {
      const msg = (err as Error).message ?? String(err);
      if (skipReason !== undefined) {
        // 预期会抛——只验抛了，不验类型
        continue;
      }
      failures.push({ file: fx.file, reason: msg });
    }
  }
  return failures;
}

describe("upstream fixture smoke · OPC 层鲁棒 · core (64 份严格)", () => {
  it("发现 64 份 core fixture", () => {
    expect(coreFixtures.length).toBe(64);
  });

  it("core 全部 fixture OPC 层都能 openAsync + 枚举 parts（SKIP_LIST 外 0 失败）", async () => {
    const failures = await runOpcSweep(coreFixtures);
    if (failures.length > 0) {
      const detail = failures.map((f) => `  - ${f.file}: ${f.reason}`).join("\n");
      throw new Error(`${failures.length} 份 core fixture OPC 层失败：\n${detail}`);
    }
  }, 30000);
});

describe("upstream fixture smoke · OPC 层鲁棒 · extended (Epic-129 新增)", () => {
  it("发现 ≥ 160 份 extended fixture（Epic-129 扩充后）", () => {
    expect(extendedFixtures.length).toBeGreaterThanOrEqual(160);
  });

  it("全部 extended fixture OPC 层都能 openAsync + 枚举 parts（已知失败在 SKIP_LIST）", async () => {
    const failures = await runOpcSweep(extendedFixtures);
    if (failures.length > 0) {
      const detail = failures.map((f) => `  - ${f.file}: ${f.reason}`).join("\n");
      throw new Error(`${failures.length} 份 extended fixture OPC 层失败：\n${detail}`);
    }
  }, 60000);

  it("core + extended 总计 ≥ 220 份", () => {
    expect(coreFixtures.length + extendedFixtures.length).toBeGreaterThanOrEqual(220);
  });
});
