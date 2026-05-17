/**
 * Story-2.8 端到端：真实 docx 经 WordprocessingDocument 加载 → element 树快照
 * 与 golden 一致；读 → 写 → 读三轮，结构稳定。
 *
 * xlsx / pptx 仅形态验证（element schema 类未生成，不应解出 typed 树）。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { WordprocessingDocument } from "../../src/word/index.js";
import { snapshotElement } from "../../tools/golden-generator/element-snapshot.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/golden");

interface GoldenFile {
  readonly source: string;
  readonly generatedBy: string;
  readonly document: unknown;
}

async function loadGolden(file: string): Promise<unknown> {
  const text = await readFile(join(FIXTURES_DIR, `${file}.element.golden.json`), "utf-8");
  const parsed = JSON.parse(text) as GoldenFile;
  return parsed.document;
}

describe("Element-tree golden roundtrip · HelloWorld.docx", () => {
  it("openAsync → snapshot element tree 与 golden 完全一致", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const snap = snapshotElement(doc.mainDocumentPart?.document);
    expect(snap).toEqual(await loadGolden("HelloWorld.docx"));
  });

  it("第二轮 read → write → read 后 element 树仍与 golden 一致", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
    const first = await WordprocessingDocument.openAsync(bytes);
    // 触发 typed root 加载 + flush
    void first.mainDocumentPart?.document;
    const rebytes = await first.saveAsBytesAsync();

    const second = await WordprocessingDocument.openAsync(rebytes);
    const snap = snapshotElement(second.mainDocumentPart?.document);
    expect(snap).toEqual(await loadGolden("HelloWorld.docx"));
  });

  it("第三轮再 write → read 一次仍稳定", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "HelloWorld.docx")));
    const first = await WordprocessingDocument.openAsync(bytes);
    void first.mainDocumentPart?.document;
    const r1 = await first.saveAsBytesAsync();

    const second = await WordprocessingDocument.openAsync(r1);
    void second.mainDocumentPart?.document;
    const r2 = await second.saveAsBytesAsync();

    const third = await WordprocessingDocument.openAsync(r2);
    const snap = snapshotElement(third.mainDocumentPart?.document);
    expect(snap).toEqual(await loadGolden("HelloWorld.docx"));
  });
});

describe("Element-tree golden · pptx 形态校验（Story-4.7 已落 element snapshot）", () => {
  it("pptx fixture 现已生成 .element.golden.json，含 presentation + slides 子树", async () => {
    const text = await readFile(join(FIXTURES_DIR, "mcppt.pptx.element.golden.json"), "utf-8");
    expect(text).toContain('"className": "Presentation"');
    expect(text).toContain('"slides"');
  });

  it("xlsx fixture 已在 Story-3.7 落 element golden", async () => {
    // 仅形态：详细 roundtrip 在 test/excel/roundtrip.test.ts 覆盖
    const text = await readFile(
      join(FIXTURES_DIR, "basicspreadsheet.xlsx.element.golden.json"),
      "utf-8",
    );
    expect(text).toContain('"className": "Workbook"');
  });
});
