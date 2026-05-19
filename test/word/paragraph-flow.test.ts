/**
 * Epic-43：Paragraph 分页控制访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  KeepLines,
  KeepNext,
  PageBreakBefore,
  Paragraph,
  ParagraphProperties,
  Run,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Paragraph.keepNext", () => {
  it("undefined when pPr 不存在", () => {
    expect(new Paragraph().keepNext).toBeUndefined();
  });

  it("set true 自动创建 pPr+KeepNext", () => {
    const p = new Paragraph();
    p.keepNext = true;
    expect(p.keepNext).toBe(true);
    expect(p.firstChild(ParagraphProperties)?.firstChild(KeepNext)).toBeInstanceOf(KeepNext);
  });

  it("set false 写 val=false", () => {
    const p = new Paragraph();
    p.keepNext = false;
    expect(p.keepNext).toBe(false);
  });

  it("set undefined 删", () => {
    const p = new Paragraph();
    p.keepNext = true;
    p.keepNext = undefined;
    expect(p.keepNext).toBeUndefined();
  });
});

describe("Paragraph.keepLines / pageBreakBefore", () => {
  it("keepLines 同语义", () => {
    const p = new Paragraph();
    p.keepLines = true;
    expect(p.keepLines).toBe(true);
    expect(p.firstChild(ParagraphProperties)?.firstChild(KeepLines)).toBeInstanceOf(KeepLines);
  });

  it("pageBreakBefore 同语义", () => {
    const p = new Paragraph();
    p.pageBreakBefore = true;
    expect(p.pageBreakBefore).toBe(true);
    expect(p.firstChild(ParagraphProperties)?.firstChild(PageBreakBefore)).toBeInstanceOf(
      PageBreakBefore,
    );
  });
});

describe("Paragraph 分页控制综合 + round-trip", () => {
  it("三个共存", () => {
    const p = new Paragraph();
    p.keepNext = true;
    p.keepLines = true;
    p.pageBreakBefore = true;
    expect(p.keepNext).toBe(true);
    expect(p.keepLines).toBe(true);
    expect(p.pageBreakBefore).toBe(true);
  });

  it("setter 把 pPr 插到 Paragraph 第一个 child", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "x";
    r.appendChild(t);
    p.appendChild(r);
    p.keepNext = true;
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("round-trip：save → reopen 后所有字段保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Heading";
    r.appendChild(t);
    p.appendChild(r);
    p.keepNext = true;
    p.keepLines = true;
    p.pageBreakBefore = true;
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.keepNext).toBe(true);
    expect(reP?.keepLines).toBe(true);
    expect(reP?.pageBreakBefore).toBe(true);
  });

  it("与 alignment / styleId 并存不互相破坏", () => {
    const p = new Paragraph();
    p.alignment = "center";
    p.styleId = "Heading1";
    p.keepNext = true;
    expect(p.alignment).toBe("center");
    expect(p.styleId).toBe("Heading1");
    expect(p.keepNext).toBe(true);
  });
});
