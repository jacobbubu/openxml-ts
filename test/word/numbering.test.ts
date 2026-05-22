/**
 * Story-22：NumberingPart + addNumberingDefinition + createListParagraph 单元测试。
 * Epic-102：numbering abstractNum/num 元素分组顺序测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import { AbstractNum } from "../../src/word/generated/abstract-num.js";
import { NumberingInstance } from "../../src/word/generated/numbering-instance.js";
import {
  NumberingPart,
  Paragraph,
  WordprocessingDocument,
  createListParagraph,
} from "../../src/word/index.js";

describe("WordprocessingDocument.addNumberingDefinition（Story-22.2）", () => {
  it("第一次调用自动创建 NumberingPart + 主文档关系", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.numberingPart).toBeUndefined();

    const { numId } = doc.addNumberingDefinition({ type: "decimal" });
    expect(numId).toBe(1);

    expect(doc.numberingPart).toBeInstanceOf(NumberingPart);
    const xml = serialize(doc.numberingPart!.numbering);
    expect(xml).toContain('<w:abstractNum w:abstractNumId="0">');
    expect(xml).toContain('<w:numFmt w:val="decimal"');
    expect(xml).toContain('<w:lvlText w:val="%1."');
    expect(xml).toContain('<w:num w:numId="1">');
  });

  it("第二次调用复用 NumberingPart，abstractNumId + numId 都自增", () => {
    const doc = WordprocessingDocument.create();
    const a = doc.addNumberingDefinition({ type: "decimal" });
    const b = doc.addNumberingDefinition({ type: "bullet" });
    expect(a.numId).toBe(1);
    expect(b.numId).toBe(2);

    const xml = serialize(doc.numberingPart!.numbering);
    expect(xml).toContain('<w:abstractNum w:abstractNumId="0">');
    expect(xml).toContain('<w:abstractNum w:abstractNumId="1">');
    // bullet 写默认符号
    expect(xml).toContain('<w:numFmt w:val="bullet"');
    expect(xml).toMatch(/<w:lvlText w:val="●"/);
  });

  it("9 级 lvl 全写出", () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    const xml = serialize(doc.numberingPart!.numbering);
    const levels = xml.match(/<w:lvl /g) ?? [];
    expect(levels).toHaveLength(9);
  });

  it("save → reopen 后定义保留 + nextNumberingId 正确", async () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    const out = await doc.saveAsBytesAsync();

    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.numberingPart).toBeDefined();
    expect(reopened.nextNumberingId()).toBe(2);
  });
});

describe("WordprocessingDocument.nextNumberingId（Story-22.2）", () => {
  it("空文档（无 NumberingPart）返 1", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.nextNumberingId()).toBe(1);
  });

  it("含 num 时返最大 numId + 1", () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    doc.addNumberingDefinition({ type: "bullet" });
    expect(doc.nextNumberingId()).toBe(3);
  });
});

describe("createListParagraph（Story-22.3）", () => {
  it("返完整 Paragraph 含 <w:numPr><w:ilvl/><w:numId/>", () => {
    const p = createListParagraph(5, 2, "list text");
    expect(p).toBeInstanceOf(Paragraph);
    const xml = serialize(p);
    expect(xml).toContain("<w:numPr>");
    expect(xml).toContain('<w:ilvl w:val="2"');
    expect(xml).toContain('<w:numId w:val="5"');
    expect(xml).toContain(">list text<");
  });

  it("level ≥ 9 或 < 0 抛 friendly 错", () => {
    expect(() => createListParagraph(1, 9, "x")).toThrow(OpenXmlPackageError);
    expect(() => createListParagraph(1, -1, "x")).toThrow(/level must be integer 0..8/);
  });

  it("前导/尾随空格自动 xml:space=preserve", () => {
    const p = createListParagraph(1, 0, " padded ");
    expect(serialize(p)).toContain('xml:space="preserve"');
  });
});

describe("端到端 列表 round-trip", () => {
  it("addNumberingDefinition + createListParagraph + save + reopen 后引用保留", async () => {
    const doc = WordprocessingDocument.create();
    const { numId } = doc.addNumberingDefinition({ type: "decimal" });
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const append = (e: unknown): void =>
      (body as { appendChild: (e: unknown) => void }).appendChild(e);
    for (const text of ["First", "Second", "Third"]) {
      append(createListParagraph(numId, 0, text));
    }

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const xml = serialize(reopened.mainDocumentPart!.document);
    expect((xml.match(/<w:numPr>/g) ?? []).length).toBe(3);
    expect(xml).toContain(`<w:numId w:val="${numId}"`);
    expect(reopened.numberingPart).toBeDefined();
  });
});

describe("Epic-102：CT_Numbering abstractNum/num 分组顺序", () => {
  /** 取 numbering 根下所有直接子元素的 localName 有序列表。 */
  function numberingChildNames(doc: WordprocessingDocument): string[] {
    const np = doc.numberingPart;
    if (np === undefined) return [];
    return [...np.numbering.children].map((c) => c.localName);
  }

  it("两次 addNumberingDefinition 后 all abstractNum 在 all num 之前", () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    doc.addNumberingDefinition({ type: "bullet" });

    const names = numberingChildNames(doc);
    const lastAbstract = names.lastIndexOf("abstractNum");
    const firstNum = names.indexOf("num");

    expect(lastAbstract).toBeGreaterThanOrEqual(0);
    expect(firstNum).toBeGreaterThanOrEqual(0);
    expect(lastAbstract).toBeLessThan(firstNum);
  });

  it("三次 addNumberingDefinition 后顺序为 abstractNum×3, num×3", () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    doc.addNumberingDefinition({ type: "bullet" });
    doc.addNumberingDefinition({ type: "decimal" });

    const names = numberingChildNames(doc);
    // 前三个是 abstractNum，后三个是 num
    expect(names.slice(0, 3)).toEqual(["abstractNum", "abstractNum", "abstractNum"]);
    expect(names.slice(3)).toEqual(["num", "num", "num"]);
  });

  it("直接 descendants 类型顺序也正确", () => {
    const doc = WordprocessingDocument.create();
    doc.addNumberingDefinition({ type: "decimal" });
    doc.addNumberingDefinition({ type: "bullet" });

    const np = doc.numberingPart!;
    const children = [...np.numbering.children];
    const abstractNums = children.filter((c) => c instanceof AbstractNum);
    const numInsts = children.filter((c) => c instanceof NumberingInstance);

    expect(abstractNums).toHaveLength(2);
    expect(numInsts).toHaveLength(2);

    // 每个 abstractNum 的索引都小于每个 num 的索引
    const abstractIndices = abstractNums.map((c) => children.indexOf(c));
    const numIndices = numInsts.map((c) => children.indexOf(c));
    const maxAbstract = Math.max(...abstractIndices);
    const minNum = Math.min(...numIndices);
    expect(maxAbstract).toBeLessThan(minNum);
  });
});
