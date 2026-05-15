/**
 * Story-1.9 性能基线（PRD §NFR-1）。
 *
 * 跑法：`pnpm bench`。每条 case 取「1 MB 包」为基准——100 个 Part × 10 KB 内容。
 *
 * 阈值（在合理硬件上）:
 * - openAsync + 枚举 Parts：≤ 100 ms p95
 * - saveAsBytesAsync：≤ 200 ms p95
 *
 * bench 不强制阈值（vitest bench 是统计性能数据，不是 pass/fail）。
 * 实际值见 docs/implementation/bench-baseline.md，回归走 PR diff 评估。
 */

import { beforeAll, bench, describe } from "vitest";
import { packageToZipBytes } from "../src/backends/zip/zip-writer.js";
import {
  type OpenXmlPackage,
  type PartUri,
  createInMemory,
  openAsync,
  tryPartUri,
} from "../src/index.js";

function uri(s: string): PartUri {
  const u = tryPartUri(s);
  if (u === undefined) throw new Error(`bad fixture URI ${s}`);
  return u;
}

const ONE_KB = 1024;
const PART_BYTES = 10 * ONE_KB;
const PART_COUNT = 100; // 100 * 10KB ≈ 1 MB

let oneMegabyteZip: Uint8Array = new Uint8Array(0);
let openedFor1Mb: OpenXmlPackage | undefined;

async function build1MbZip(): Promise<Uint8Array> {
  const pkg = createInMemory();
  const payload = new Uint8Array(PART_BYTES).fill(0x41);
  for (let i = 0; i < PART_COUNT; i += 1) {
    const part = pkg.createPart(uri(`/word/part${i}.bin`), "application/octet-stream");
    await part.writeAsync(payload);
  }
  // 加几条关系，避免 saveAs 时跳 _rels/.rels 路径
  for (let i = 0; i < 10; i += 1) {
    pkg.relationships.create({
      type: "http://example.com/r",
      target: `word/part${i}.bin`,
      targetMode: "internal",
    });
  }
  return packageToZipBytes(pkg as never);
}

// 顶层 beforeAll —— vitest bench 模式下嵌套 describe 里的 beforeAll 不保证执行
beforeAll(async () => {
  oneMegabyteZip = await build1MbZip();
  openedFor1Mb = await openAsync(oneMegabyteZip);
});

describe("openAsync — 1 MB 包", () => {
  bench("openAsync + 枚举 Parts", async () => {
    const pkg = await openAsync(oneMegabyteZip);
    for (const part of pkg.parts()) {
      void part.uri;
    }
  });
});

describe("saveAsBytesAsync — 1 MB 包", () => {
  bench("saveAsBytesAsync 整包透传", async () => {
    if (openedFor1Mb === undefined) throw new Error("bench setup not ready");
    await openedFor1Mb.saveAsBytesAsync();
  });
});

describe("createInMemory + saveAsBytesAsync — 端到端构造", () => {
  bench("100 个 10KB Part 构造 + ZIP 写出", async () => {
    const pkg = createInMemory();
    const payload = new Uint8Array(PART_BYTES).fill(0x41);
    for (let i = 0; i < PART_COUNT; i += 1) {
      const part = pkg.createPart(uri(`/word/part${i}.bin`), "application/octet-stream");
      await part.writeAsync(payload);
    }
    await packageToZipBytes(pkg as never);
  });
});
