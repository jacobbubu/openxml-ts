/**
 * Epic-129 Phase 3：open 失败自动定位回归网。
 *
 * 目标：
 * 1. 扫描 upstream-smoke/ 中所有 fixture，尝试 openAsync。
 * 2. 将「已知可接受的失败」（如加密）记录在 KNOWN_FAILURES。
 * 3. 若发现新的（未登记的）失败，立即断言失败，不允许默默吞掉。
 * 4. 若已登记的失败消失（即 SDK 已修复），也会失败提示——促进维护。
 *
 * 这不是 "所有 fixture 必须 open 成功" 的测试（那是 upstream-smoke.test.ts 的职责）。
 * 这是回归网：任何新出现的 open 失败都必须被人工评审，登记或修复。
 *
 * 已知失败建 bug issue 跟进：
 * - CFB/password encryption: #387
 */

import { readFile, readdir } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";
import { openAsync } from "../../../src/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "..", "upstream-smoke");

/** OPC-capable extensions scanned by this test. */
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
 * Known open failures: filename → { errorPattern, followUpIssue }.
 *
 * - errorPattern: substring that MUST appear in the error message.
 *   If the error message no longer matches, the test fails to prompt cleanup.
 * - followUpIssue: GitHub issue tracking the root cause.
 *
 * To register a new known failure, add an entry here after creating a bug issue.
 */
const KNOWN_FAILURES: ReadonlyMap<string, { errorPattern: string; followUpIssue: string }> =
  new Map([
    [
      "encrypted_pptx.pptx",
      {
        errorPattern: "Encrypted",
        followUpIssue:
          "https://github.com/jacobbubu/openxml-ts/issues (officecrypto-tool integration)",
      },
    ],
    [
      "document with password.docx",
      {
        errorPattern: "Encrypted",
        followUpIssue: "https://github.com/jacobbubu/openxml-ts/issues/387",
      },
    ],
  ]);

interface FixtureCase {
  readonly file: string;
  readonly path: string;
}

let fixtures: FixtureCase[] = [];

beforeAll(async () => {
  const entries = await readdir(FIXTURES_DIR);
  fixtures = entries
    .filter((e) => SCANNED_EXTS.has(extname(e).toLowerCase()))
    .sort()
    .map((e) => ({ file: e, path: join(FIXTURES_DIR, e) }));
});

describe("upstream fixture open-failure regression net", () => {
  it("fixture 目录可读且包含文件", () => {
    expect(fixtures.length).toBeGreaterThan(0);
  });

  it("已知失败必须仍然失败（防止 KNOWN_FAILURES 腐烂）", async () => {
    const noLongerFailing: string[] = [];

    for (const [filename, spec] of KNOWN_FAILURES) {
      const fx = fixtures.find((f) => f.file === filename);
      if (fx === undefined) {
        // Fixture removed from directory — that's OK (someone cleaned up), but warn.
        continue;
      }
      let threw = false;
      let errorMsg = "";
      try {
        const bytes = new Uint8Array(await readFile(fx.path));
        await openAsync(bytes);
      } catch (err) {
        threw = true;
        errorMsg = (err as Error).message ?? String(err);
      }
      if (!threw) {
        noLongerFailing.push(
          `${filename}: expected failure but openAsync succeeded — remove from KNOWN_FAILURES or keep as regression`,
        );
      } else if (!errorMsg.includes(spec.errorPattern)) {
        noLongerFailing.push(
          `${filename}: error pattern "${spec.errorPattern}" not found in: "${errorMsg.slice(0, 200)}"`,
        );
      }
    }

    if (noLongerFailing.length > 0) {
      throw new Error(
        `KNOWN_FAILURES entries no longer match — update KNOWN_FAILURES:\n${noLongerFailing.map((s) => `  - ${s}`).join("\n")}`,
      );
    }
  });

  it("不允许出现未登记的 open 失败（新失败必须登记或修复）", async () => {
    const unregistered: { file: string; error: string }[] = [];

    for (const fx of fixtures) {
      if (KNOWN_FAILURES.has(fx.file)) {
        // Known failure — already verified above.
        continue;
      }
      try {
        const bytes = new Uint8Array(await readFile(fx.path));
        await openAsync(bytes);
      } catch (err) {
        const msg = (err as Error).message ?? String(err);
        unregistered.push({ file: fx.file, error: msg });
      }
    }

    if (unregistered.length > 0) {
      const detail = unregistered
        .map((f) => `  - ${f.file}:\n      ${f.error.slice(0, 300)}`)
        .join("\n");
      throw new Error(
        `${unregistered.length} 个未登记的 open 失败被检测到！\n请为每个失败创建 bug issue，然后将其加入 KNOWN_FAILURES（带 issue 链接），或修复 SDK。\n\n失败列表：\n${detail}`,
      );
    }
  });
});
