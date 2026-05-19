/**
 * Epic-40：Paragraph.styleId 访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  ParagraphProperties,
  ParagraphStyleId,
  Run,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Paragraph.styleId", () => {
  it("undefined when pPr 不存在", () => {
    expect(new Paragraph().styleId).toBeUndefined();
  });

  it("set 'Heading1' 自动创建 pPr+pStyle", () => {
    const p = new Paragraph();
    p.styleId = "Heading1";
    expect(p.styleId).toBe("Heading1");
    const pPr = p.firstChild(ParagraphProperties);
    expect(pPr?.firstChild(ParagraphStyleId)?.val?.toString()).toBe("Heading1");
  });

  it("set 覆盖（不残留旧 pStyle）", () => {
    const p = new Paragraph();
    p.styleId = "Heading1";
    p.styleId = "Quote";
    expect(p.styleId).toBe("Quote");
    const pPr = p.firstChild(ParagraphProperties);
    let count = 0;
    for (const c of pPr!.children) if (c instanceof ParagraphStyleId) count += 1;
    expect(count).toBe(1);
  });

  it("set undefined 删 pStyle 但保留 pPr 其它子", () => {
    const p = new Paragraph();
    p.styleId = "Heading1";
    p.alignment = "center";
    p.styleId = undefined;
    expect(p.styleId).toBeUndefined();
    expect(p.alignment).toBe("center");
  });

  it("setter 把 pPr 插到 Paragraph 第一个子", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "x";
    r.appendChild(t);
    p.appendChild(r);
    p.styleId = "Quote";
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("pStyle 在 pPr 里是第一个子（schema 顺序）", () => {
    const p = new Paragraph();
    p.alignment = "center"; // 先建 pPr + Justification
    p.styleId = "Heading1";
    const pPr = p.firstChild(ParagraphProperties);
    expect(pPr?.children.at(0)).toBeInstanceOf(ParagraphStyleId);
  });

  it("round-trip：save → reopen 后 styleId 保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Title";
    r.appendChild(t);
    p.appendChild(r);
    p.styleId = "Heading1";
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.styleId).toBe("Heading1");
  });
});
