/**
 * Epic-35：Paragraph.tabStops 访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  ParagraphProperties,
  Run,
  TabStop,
  Tabs,
  Text,
  WordprocessingDocument,
} from "../../src/word/index.js";

describe("Paragraph.tabStops", () => {
  it("undefined when pPr 不存在", () => {
    const p = new Paragraph();
    expect(p.tabStops).toBeUndefined();
  });

  it("set 一个 tab stop 自动创建 pPr+tabs+tab", () => {
    const p = new Paragraph();
    p.tabStops = [{ positionDxa: 1440 }];
    const pPr = p.firstChild(ParagraphProperties);
    const tabs = pPr?.firstChild(Tabs);
    expect(tabs).toBeDefined();
    const stops = [...tabs!.children];
    expect(stops).toHaveLength(1);
    expect(stops[0]).toBeInstanceOf(TabStop);
  });

  it("get 读回 set 的数组（按 position 排序）", () => {
    const p = new Paragraph();
    p.tabStops = [
      { positionDxa: 2880, alignment: "right" },
      { positionDxa: 1440, alignment: "left", leader: "dot" },
    ];
    const stops = p.tabStops;
    expect(stops).toHaveLength(2);
    expect(stops?.[0]).toEqual({ positionDxa: 1440, alignment: "left", leader: "dot" });
    expect(stops?.[1]).toEqual({ positionDxa: 2880, alignment: "right" });
  });

  it("set undefined 删 tabs", () => {
    const p = new Paragraph();
    p.tabStops = [{ positionDxa: 1440 }];
    p.tabStops = undefined;
    expect(p.tabStops).toBeUndefined();
  });

  it("set 空数组等同于 clear", () => {
    const p = new Paragraph();
    p.tabStops = [{ positionDxa: 1440 }];
    p.tabStops = [];
    expect(p.tabStops).toBeUndefined();
  });

  it("整体替换不残留旧 tab", () => {
    const p = new Paragraph();
    p.tabStops = [{ positionDxa: 720 }, { positionDxa: 1440 }];
    p.tabStops = [{ positionDxa: 2880, alignment: "right" }];
    expect(p.tabStops).toEqual([{ positionDxa: 2880, alignment: "right" }]);
  });

  it("setter 把 pPr 插到 Paragraph 第一个子", () => {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "x";
    r.appendChild(t);
    p.appendChild(r);
    p.tabStops = [{ positionDxa: 720 }];
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("与 alignment / indent 并存不互相破坏", () => {
    const p = new Paragraph();
    p.alignment = "center";
    p.indent = { leftDxa: 720 };
    p.tabStops = [{ positionDxa: 1440, alignment: "right", leader: "underscore" }];
    expect(p.alignment).toBe("center");
    expect(p.indent).toEqual({ leftDxa: 720 });
    expect(p.tabStops).toEqual([{ positionDxa: 1440, alignment: "right", leader: "underscore" }]);
  });

  it("round-trip：save → reopen tabStops 完整", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = "tabbed line";
    r.appendChild(t);
    p.appendChild(r);
    p.tabStops = [
      { positionDxa: 1440, alignment: "left" },
      { positionDxa: 4320, alignment: "right", leader: "dot" },
    ];
    (body as { appendChild: (e: unknown) => void }).appendChild(p);
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const [reP] = [...reopened.mainDocumentPart!.document.descendants(Paragraph)];
    expect(reP?.tabStops).toEqual([
      { positionDxa: 1440, alignment: "left" },
      { positionDxa: 4320, alignment: "right", leader: "dot" },
    ]);
  });
});
