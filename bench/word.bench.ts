/**
 * Story-2.10 Word 子系统性能基线（epic-2-prd §NFR-1）。
 *
 * 跑法：`pnpm bench`。基准 fixture：合成 ~1 MB docx：
 *   14000 段 Paragraph × 1 Run × 1 Text，每行带确定性高熵 token，让压缩后体积接近
 *   element 树规模（约 1 MB zipped / ~3 MB 未压缩 XML）。
 *
 * 阈值（NFR-1.1 / 1.2，单线程本地 NVMe）:
 * - WordprocessingDocument.openAsync + 主文档 element 树 descendants 全量遍历：≤ 300 ms p95
 * - element 树 → XML 序列化（saveAsBytesAsync）：≤ 200 ms p95
 *
 * bench 不强制阈值（vitest bench 是统计性能数据，不是 pass/fail）。
 * 实际值见 docs/implementation/bench-baseline.md «Epic-2 段» ，回归走 PR diff 评估。
 */

import { beforeAll, bench, describe } from "vitest";
import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

const LINE_COUNT = 14000;

/** 确定性高熵 token：xorshift32，让 ZIP 压缩到接近 element 树本身的字节量级。 */
function token(seed: number): string {
  let x = seed >>> 0 || 1;
  let s = "";
  for (let i = 0; i < 6; i++) {
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    s += (x >>> 0).toString(36);
  }
  return s;
}

let oneMegabyteDocx: Uint8Array = new Uint8Array(0);

async function build1MbDocx(): Promise<Uint8Array> {
  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  for (let i = 0; i < LINE_COUNT; i += 1) {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = `${i.toString(16)} ${token(i + 1)} ${token(i * 31 + 7)}`;
    r.appendChild(t);
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);
  }
  return doc.saveAsBytesAsync();
}

beforeAll(async () => {
  oneMegabyteDocx = await build1MbDocx();
});

describe("WordprocessingDocument.openAsync — 1 MB docx", () => {
  bench("open + 主文档 descendants 遍历", async () => {
    const doc = await WordprocessingDocument.openAsync(oneMegabyteDocx);
    const document = doc.mainDocumentPart!.document;
    let count = 0;
    for (const _ of document.descendants()) count += 1;
    void count;
  });
});

describe("element 树 → bytes — 1 MB docx", () => {
  bench("修改 1 个 Text + saveAsBytes 整包写回", async () => {
    const doc = await WordprocessingDocument.openAsync(oneMegabyteDocx);
    const [first] = doc.mainDocumentPart!.document.descendants(Text);
    if (first !== undefined) first.text = "MUTATED";
    await doc.saveAsBytesAsync();
  });
});

describe("WordprocessingDocument.create — 端到端 14000 段构造", () => {
  bench("create + 填充 + saveAsBytes", async () => {
    await build1MbDocx();
  });
});
