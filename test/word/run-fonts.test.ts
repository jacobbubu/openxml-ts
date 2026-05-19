/**
 * Epic-50：Run.fontFamily / Run.fontFamilyDetail 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { RunFonts } from "../../src/word/generated/run-fonts.js";
import {
  Bold,
  Paragraph,
  Run,
  RunProperties,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Run.fontFamily", () => {
  it("初始值为 undefined（无 rPr）", () => {
    expect(new Run().fontFamily).toBeUndefined();
  });

  it("set string 同时设置 ascii/eastAsia/hAnsi/cs 四个字段", () => {
    const r = new Run();
    r.fontFamily = "Calibri";
    const rf = r.firstChild(RunProperties)?.firstChild(RunFonts);
    expect(rf?.ascii?.toString()).toBe("Calibri");
    expect(rf?.eastAsia?.toString()).toBe("Calibri");
    expect(rf?.highAnsi?.toString()).toBe("Calibri");
    expect(rf?.complexScript?.toString()).toBe("Calibri");
  });

  it("get 返回 ascii 值", () => {
    const r = new Run();
    r.fontFamily = "Arial";
    expect(r.fontFamily).toBe("Arial");
  });

  it("set undefined 删除 <w:rFonts>", () => {
    const r = new Run();
    r.fontFamily = "Calibri";
    r.fontFamily = undefined;
    expect(r.firstChild(RunProperties)?.firstChild(RunFonts)).toBeUndefined();
    expect(r.fontFamily).toBeUndefined();
  });

  it("覆盖写入新字体名", () => {
    const r = new Run();
    r.fontFamily = "Times New Roman";
    r.fontFamily = "Arial";
    expect(r.fontFamily).toBe("Arial");
    const rf = r.firstChild(RunProperties)?.firstChild(RunFonts);
    expect(rf?.eastAsia?.toString()).toBe("Arial");
  });
});

describe("Run.fontFamilyDetail", () => {
  it("初始值为 undefined（无 rFonts）", () => {
    expect(new Run().fontFamilyDetail).toBeUndefined();
  });

  it("set 部分字段只写入指定字段", () => {
    const r = new Run();
    r.fontFamilyDetail = { ascii: "Calibri", eastAsia: "宋体" };
    const rf = r.firstChild(RunProperties)?.firstChild(RunFonts);
    expect(rf?.ascii?.toString()).toBe("Calibri");
    expect(rf?.eastAsia?.toString()).toBe("宋体");
    expect(rf?.highAnsi).toBeUndefined();
    expect(rf?.complexScript).toBeUndefined();
  });

  it("get 返回完整 detail 对象", () => {
    const r = new Run();
    r.fontFamilyDetail = { ascii: "Calibri", eastAsia: "宋体", hAnsi: "Calibri", cs: "Arial" };
    const detail = r.fontFamilyDetail;
    expect(detail?.ascii).toBe("Calibri");
    expect(detail?.eastAsia).toBe("宋体");
    expect(detail?.hAnsi).toBe("Calibri");
    expect(detail?.cs).toBe("Arial");
  });

  it("set undefined 删除 <w:rFonts>", () => {
    const r = new Run();
    r.fontFamilyDetail = { ascii: "Arial" };
    r.fontFamilyDetail = undefined;
    expect(r.firstChild(RunProperties)?.firstChild(RunFonts)).toBeUndefined();
    expect(r.fontFamilyDetail).toBeUndefined();
  });

  it("与 bold 等格式属性共存不互相破坏", () => {
    const r = new Run();
    r.bold = true;
    r.fontFamily = "Calibri";
    expect(r.bold).toBe(true);
    expect(r.fontFamily).toBe("Calibri");
    const rPr = r.firstChild(RunProperties);
    expect(rPr?.firstChild(Bold)).toBeInstanceOf(Bold);
    expect(rPr?.firstChild(RunFonts)).toBeInstanceOf(RunFonts);
  });

  it("rPr 作为 Run 第一个 child", () => {
    const r = new Run();
    const t = new Text();
    t.text = "hello";
    r.appendChild(t);
    r.fontFamily = "Calibri";
    expect(r.children.at(0)).toBeInstanceOf(RunProperties);
    expect(r.children.at(1)).toBe(t);
  });

  it("round-trip：save → reopen 后字体属性保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "字体测试";
    r.appendChild(t);
    r.fontFamilyDetail = { ascii: "Calibri", eastAsia: "宋体", hAnsi: "Calibri", cs: "Arial" };
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reR] = [...reopened.mainDocumentPart!.document.descendants(Run)];
    expect(reR?.fontFamilyDetail?.ascii).toBe("Calibri");
    expect(reR?.fontFamilyDetail?.eastAsia).toBe("宋体");
    expect(reR?.fontFamilyDetail?.hAnsi).toBe("Calibri");
    expect(reR?.fontFamilyDetail?.cs).toBe("Arial");
  });
});
