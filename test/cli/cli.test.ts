/**
 * Epic-9 验证：openxml-ts CLI 三种 subcommands。
 *
 * 跑 dist/bin/openxml-ts.js 子进程 + capture stdout/stderr。需 `pnpm build` 已编出。
 * 测试在 vitest 里跑前会触发一次 dist 编译（globalSetup 也行；当前直接靠用户
 * 跑 `pnpm test` 前 `pnpm build` 一次）。
 */

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { beforeAll, describe, expect, it } from "vitest";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, "../..");
const CLI = join(REPO, "dist/bin/openxml-ts.js");
const FIXTURE = join(REPO, "test/fixtures/golden/HelloWorld.docx");

function run(args: readonly string[]): { stdout: string; stderr: string; status: number } {
  const r = spawnSync(process.execPath, [CLI, ...args], {
    encoding: "utf-8",
    timeout: 15000,
  });
  return {
    stdout: r.stdout ?? "",
    stderr: r.stderr ?? "",
    status: r.status ?? -1,
  };
}

describe("openxml-ts CLI", () => {
  beforeAll(() => {
    if (!existsSync(CLI)) {
      throw new Error(
        "dist/bin/openxml-ts.js missing; run `pnpm build` before `pnpm test` for CLI suite",
      );
    }
  });

  describe("--help / no args", () => {
    it("--help 打印 usage", () => {
      const r = run(["--help"]);
      expect(r.status).toBe(0);
      expect(r.stdout).toContain("openxml-ts");
      expect(r.stdout).toContain("inspect");
      expect(r.stdout).toContain("cat");
    });

    it("无参数也打印 usage（不抛）", () => {
      const r = run([]);
      expect(r.status).toBe(0);
      expect(r.stdout).toContain("Usage");
    });

    it("未知 subcommand 报错退码 1", () => {
      const r = run(["bogus"]);
      expect(r.status).toBe(1);
      expect(r.stderr).toContain("unknown command");
    });
  });

  describe("inspect", () => {
    it("缺 file 参数 → 退码 1", () => {
      const r = run(["inspect"]);
      expect(r.status).toBe(1);
      expect(r.stderr).toContain("requires <file>");
    });

    it("inspect HelloWorld.docx → 列 parts + 关系", () => {
      const r = run(["inspect", FIXTURE]);
      expect(r.status).toBe(0);
      expect(r.stdout).toContain("Parts:");
      expect(r.stdout).toContain("/word/document.xml");
      expect(r.stdout).toContain("officeDocument");
    });
  });

  describe("cat", () => {
    it("缺参数 → 退码 1", () => {
      const r = run(["cat"]);
      expect(r.status).toBe(1);
      expect(r.stderr).toContain("requires <file>");
    });

    it("cat <file> </word/document.xml> 输出 XML", () => {
      const r = run(["cat", FIXTURE, "/word/document.xml"]);
      expect(r.status).toBe(0);
      expect(r.stdout).toContain("<w:document");
    });

    it("part 不存在 → 退码 1", () => {
      const r = run(["cat", FIXTURE, "/word/bogus.xml"]);
      expect(r.status).toBe(1);
      expect(r.stderr).toContain("part not found");
    });
  });

  describe("错误处理", () => {
    it("file 不存在 → 退码 2（内部错误）", () => {
      const r = run(["inspect", "/tmp/nonexistent.docx"]);
      expect(r.status).toBe(2);
      expect(r.stderr).toContain("openxml-ts:");
    });
  });
});
