/**
 * Epic-41：Run.styleId 访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  Run,
  RunProperties,
  RunStyle,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Run.styleId", () => {
  it("undefined when rPr 不存在", () => {
    expect(new Run().styleId).toBeUndefined();
  });

  it("set 'Strong' 自动创建 rPr+rStyle", () => {
    const r = new Run();
    r.styleId = "Strong";
    expect(r.styleId).toBe("Strong");
    expect(r.firstChild(RunProperties)?.firstChild(RunStyle)?.val?.toString()).toBe("Strong");
  });

  it("set 覆盖（不残留旧 rStyle）", () => {
    const r = new Run();
    r.styleId = "Strong";
    r.styleId = "Emphasis";
    expect(r.styleId).toBe("Emphasis");
    let count = 0;
    for (const c of r.firstChild(RunProperties)!.children) {
      if (c instanceof RunStyle) count += 1;
    }
    expect(count).toBe(1);
  });

  it("set undefined 删 rStyle，保留 rPr 其它子", () => {
    const r = new Run();
    r.styleId = "Strong";
    r.bold = true;
    r.styleId = undefined;
    expect(r.styleId).toBeUndefined();
    expect(r.bold).toBe(true);
  });

  it("rStyle 在 rPr 里是第一个子（schema 顺序）", () => {
    const r = new Run();
    r.bold = true; // 先建 rPr + Bold
    r.styleId = "Strong";
    const rPr = r.firstChild(RunProperties);
    expect(rPr?.children.at(0)).toBeInstanceOf(RunStyle);
  });

  it("setter 把 rPr 插到 Run 第一个子", () => {
    const r = new Run();
    const t = new Text();
    t.text = "hi";
    r.appendChild(t);
    r.styleId = "Hyperlink";
    expect(r.children.at(0)).toBeInstanceOf(RunProperties);
    expect(r.children.at(1)).toBe(t);
  });

  it("round-trip：save → reopen 后 styleId 保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "Linked";
    r.appendChild(t);
    r.styleId = "Hyperlink";
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reR] = [...reopened.mainDocumentPart!.document.descendants(Run)];
    expect(reR?.styleId).toBe("Hyperlink");
  });
});
