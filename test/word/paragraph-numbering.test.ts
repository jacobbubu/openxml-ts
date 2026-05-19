/**
 * Epic-54：Paragraph.numbering 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { NumberingId } from "../../src/word/generated/numbering-id.js";
import { NumberingLevelReference } from "../../src/word/generated/numbering-level-reference.js";
import { NumberingProperties } from "../../src/word/generated/numbering-properties.js";
import {
  Paragraph,
  ParagraphProperties,
  Run,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Paragraph.numbering", () => {
  it("undefined when pPr 不存在", () => {
    expect(new Paragraph().numbering).toBeUndefined();
  });

  it("undefined when pPr 存在但无 numPr", () => {
    const p = new Paragraph();
    p.alignment = "center";
    expect(p.numbering).toBeUndefined();
  });

  it("set { id, level } 自动创建 pPr + numPr", () => {
    const p = new Paragraph();
    p.numbering = { id: 1, level: 0 };
    expect(p.numbering).toEqual({ id: 1, level: 0 });
    const pPr = p.firstChild(ParagraphProperties);
    expect(pPr).toBeDefined();
    const numPr = pPr!.firstChild(NumberingProperties);
    expect(numPr).toBeDefined();
    expect(numPr!.firstChild(NumberingLevelReference)?.val?.value).toBe(0);
    expect(numPr!.firstChild(NumberingId)?.val?.value).toBe(1);
  });

  it("set { id, level } 覆盖原有 numPr（不残留旧值）", () => {
    const p = new Paragraph();
    p.numbering = { id: 1, level: 0 };
    p.numbering = { id: 3, level: 2 };
    expect(p.numbering).toEqual({ id: 3, level: 2 });
    // 确认 pPr 里只有一个 numPr
    const pPr = p.firstChild(ParagraphProperties);
    let count = 0;
    for (const c of pPr!.children) if (c instanceof NumberingProperties) count += 1;
    expect(count).toBe(1);
  });

  it("set undefined 删除 numPr 但保留 pPr 其它子", () => {
    const p = new Paragraph();
    p.numbering = { id: 1, level: 0 };
    p.alignment = "left";
    p.numbering = undefined;
    expect(p.numbering).toBeUndefined();
    expect(p.alignment).toBe("left");
  });

  it("set undefined 当 pPr 不存在时 noop（不抛）", () => {
    const p = new Paragraph();
    expect(() => {
      p.numbering = undefined;
    }).not.toThrow();
    expect(p.numbering).toBeUndefined();
  });

  it("setter 把 pPr 插到 Paragraph 第一个子（Run 之前）", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "item";
    r.appendChild(t);
    p.appendChild(r);
    p.numbering = { id: 2, level: 1 };
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("numPr 在 pPr 里排在 pStyle 之后（共存 styleId）", () => {
    const p = new Paragraph();
    p.styleId = "ListParagraph"; // 先建 pPr + pStyle
    p.numbering = { id: 1, level: 0 };
    const pPr = p.firstChild(ParagraphProperties);
    const children = [...pPr!.children];
    const numPrIdx = children.findIndex((c) => c instanceof NumberingProperties);
    // pStyle 在 index 0，numPr 应该在 index 1
    expect(numPrIdx).toBe(1);
  });

  it("numPr 作为 pPr 第一个子（无 pStyle 时）", () => {
    const p = new Paragraph();
    p.alignment = "center"; // 建 pPr + Justification，无 pStyle
    p.numbering = { id: 1, level: 0 };
    const pPr = p.firstChild(ParagraphProperties);
    expect(pPr!.children.at(0)).toBeInstanceOf(NumberingProperties);
  });

  it("round-trip：save → reopen 后 numbering 保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;

    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "list item";
    r.appendChild(t);
    p.appendChild(r);
    p.numbering = { id: 2, level: 1 };
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.numbering).toEqual({ id: 2, level: 1 });
  });
});
