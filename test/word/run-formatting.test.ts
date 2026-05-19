/**
 * Epic-38：Run 格式访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Bold,
  Color,
  FontSize,
  Paragraph,
  Run,
  RunProperties,
  Text,
  Underline,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Run.bold", () => {
  it("undefined when rPr 不存在", () => {
    expect(new Run().bold).toBeUndefined();
  });

  it("set true 自动创建 rPr+Bold（空 val）", () => {
    const r = new Run();
    r.bold = true;
    const rPr = r.firstChild(RunProperties);
    expect(rPr?.firstChild(Bold)).toBeInstanceOf(Bold);
    expect(rPr?.firstChild(Bold)?.val).toBeUndefined();
    expect(r.bold).toBe(true);
  });

  it("set false 写 Bold w:val=false", () => {
    const r = new Run();
    r.bold = false;
    expect(r.firstChild(RunProperties)?.firstChild(Bold)?.val?.value).toBe(false);
    expect(r.bold).toBe(false);
  });

  it("set undefined 删 Bold", () => {
    const r = new Run();
    r.bold = true;
    r.bold = undefined;
    expect(r.firstChild(RunProperties)?.firstChild(Bold)).toBeUndefined();
    expect(r.bold).toBeUndefined();
  });
});

describe("Run.italic", () => {
  it("set / get / clear 行为同 bold", () => {
    const r = new Run();
    expect(r.italic).toBeUndefined();
    r.italic = true;
    expect(r.italic).toBe(true);
    r.italic = false;
    expect(r.italic).toBe(false);
    r.italic = undefined;
    expect(r.italic).toBeUndefined();
  });
});

describe("Run.underline", () => {
  it("set single / double", () => {
    const r = new Run();
    r.underline = "single";
    expect(r.underline).toBe("single");
    r.underline = "double";
    expect(r.underline).toBe("double");
  });

  it("set undefined 删 Underline", () => {
    const r = new Run();
    r.underline = "single";
    r.underline = undefined;
    expect(r.underline).toBeUndefined();
    expect(r.firstChild(RunProperties)?.firstChild(Underline)).toBeUndefined();
  });
});

describe("Run.fontSizeHalfPoints", () => {
  it("set/get 半点数", () => {
    const r = new Run();
    r.fontSizeHalfPoints = 24;
    expect(r.fontSizeHalfPoints).toBe(24);
    expect(r.firstChild(RunProperties)?.firstChild(FontSize)?.val?.toString()).toBe("24");
  });

  it("undefined 删 FontSize", () => {
    const r = new Run();
    r.fontSizeHalfPoints = 32;
    r.fontSizeHalfPoints = undefined;
    expect(r.fontSizeHalfPoints).toBeUndefined();
  });
});

describe("Run.colorHex", () => {
  it("set/get hex 颜色", () => {
    const r = new Run();
    r.colorHex = "FF0000";
    expect(r.colorHex).toBe("FF0000");
    expect(r.firstChild(RunProperties)?.firstChild(Color)?.val?.toString()).toBe("FF0000");
  });

  it("set undefined 删 Color", () => {
    const r = new Run();
    r.colorHex = "00FF00";
    r.colorHex = undefined;
    expect(r.colorHex).toBeUndefined();
  });
});

describe("Run 综合 + round-trip", () => {
  it("多个属性共存不互相破坏", () => {
    const r = new Run();
    r.bold = true;
    r.italic = true;
    r.underline = "single";
    r.fontSizeHalfPoints = 28;
    r.colorHex = "0000FF";
    expect(r.bold).toBe(true);
    expect(r.italic).toBe(true);
    expect(r.underline).toBe("single");
    expect(r.fontSizeHalfPoints).toBe(28);
    expect(r.colorHex).toBe("0000FF");
  });

  it("rPr 作为 Run 第一个 child", () => {
    const r = new Run();
    const t = new Text();
    t.text = "hello";
    r.appendChild(t);
    r.bold = true;
    expect(r.children.at(0)).toBeInstanceOf(RunProperties);
    expect(r.children.at(1)).toBe(t);
  });

  it("round-trip：save → reopen 后所有格式属性保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Styled";
    r.appendChild(t);
    r.bold = true;
    r.italic = true;
    r.underline = "single";
    r.fontSizeHalfPoints = 28;
    r.colorHex = "FF0000";
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reR] = [...reopened.mainDocumentPart!.document.descendants(Run)];
    expect(reR?.bold).toBe(true);
    expect(reR?.italic).toBe(true);
    expect(reR?.underline).toBe("single");
    expect(reR?.fontSizeHalfPoints).toBe(28);
    expect(reR?.colorHex).toBe("FF0000");
  });
});
