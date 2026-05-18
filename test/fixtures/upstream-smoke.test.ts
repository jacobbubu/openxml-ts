/**
 * 上游 dotnet/Open-XML-SDK 测试 fixture 烟雾测试。
 *
 * 把上游 `test/DocumentFormat.OpenXml.Tests.Assets/assets/TestFiles/` 下的 64 份
 * docx/xlsx/pptx 全部跑一遍 OPC 层 `openAsync`，断言：
 *
 * - 包能解（不抛）；
 * - parts() 可枚举；
 * - 包级 relationships 可读；
 * - 至少有 1 个 Part；
 *
 * 这是覆盖长尾的最低门槛——不验内容正确性，只保 OPC 层鲁棒。具体 element /
 * typed Part 层的回归靠 Word/Excel/PPT 各 epic 的 roundtrip 测试守护。
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

/**
 * 已知暂跳——每条配「原因」+ issue / Epic 链接。
 * 列表里的 fixture 仍参与 list（验证文件存在），但 openAsync 不强制成功。
 */
const SKIP_LIST: ReadonlyMap<string, string> = new Map([
  // encrypted pptx：OOXML 加密支持不在 v0.6.0 范围。
  ["encrypted_pptx.pptx", "encryption not implemented"],
]);

interface FixtureCase {
  readonly file: string;
  readonly path: string;
  readonly ext: string;
}

let fixtures: FixtureCase[] = [];

beforeAll(async () => {
  const entries = await readdir(FIXTURES_DIR);
  fixtures = entries
    .filter((e) => [".docx", ".xlsx", ".pptx"].includes(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({ file: e, path: join(FIXTURES_DIR, e), ext: extname(e).toLowerCase() }));
});

describe("upstream fixture smoke · OPC 层鲁棒", () => {
  it("发现 ≥ 60 份真实 fixture（确保 copy 完整）", () => {
    expect(fixtures.length).toBeGreaterThanOrEqual(60);
  });

  /**
   * 把 it.each 在 beforeAll 后动态注册不太方便（vitest 顺序问题），改用一个 it
   * 内部循环。失败时报哪个 fixture 失败。
   */
  it("64 份 fixture OPC 层都能 openAsync + 枚举 parts", async () => {
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
    if (failures.length > 0) {
      const detail = failures.map((f) => `  - ${f.file}: ${f.reason}`).join("\n");
      throw new Error(`${failures.length} 份 fixture OPC 层失败：\n${detail}`);
    }
  });
});
