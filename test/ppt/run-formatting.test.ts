/**
 * Epic-39：DrawingML Run 格式访问器单测。
 */

import { describe, expect, it } from "vitest";
import { RgbColorModelHex } from "../../src/drawing/generated/rgb-color-model-hex.js";
import { RunProperties } from "../../src/drawing/generated/run-properties.js";
import { Run } from "../../src/drawing/generated/run.js";
import { SolidFill } from "../../src/drawing/generated/solid-fill.js";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../src/element/index.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

describe("PPT Run.bold / italic", () => {
  it("set true / false / undefined", () => {
    const r = new Run();
    expect(r.bold).toBeUndefined();
    r.bold = true;
    expect(r.bold).toBe(true);
    r.bold = false;
    expect(r.bold).toBe(false);
    r.bold = undefined;
    expect(r.bold).toBeUndefined();
  });

  it("italic 同语义", () => {
    const r = new Run();
    r.italic = true;
    expect(r.italic).toBe(true);
    r.italic = undefined;
    expect(r.italic).toBeUndefined();
  });

  it("rPr 不存在时自动创建", () => {
    const r = new Run();
    r.bold = true;
    expect(r.firstChild(RunProperties)).toBeInstanceOf(RunProperties);
  });
});

describe("PPT Run.underline", () => {
  it("set sng / dbl / none", () => {
    const r = new Run();
    r.underline = "sng";
    expect(r.underline).toBe("sng");
    r.underline = "dbl";
    expect(r.underline).toBe("dbl");
    r.underline = undefined;
    expect(r.underline).toBeUndefined();
  });
});

describe("PPT Run.fontSizeHundredths", () => {
  it("set/get number（1/100 pt）", () => {
    const r = new Run();
    r.fontSizeHundredths = 2400;
    expect(r.fontSizeHundredths).toBe(2400);
    expect(r.firstChild(RunProperties)?.fontSize?.toString()).toBe("2400");
  });

  it("undefined 清", () => {
    const r = new Run();
    r.fontSizeHundredths = 1800;
    r.fontSizeHundredths = undefined;
    expect(r.fontSizeHundredths).toBeUndefined();
  });
});

describe("PPT Run.colorHex", () => {
  it("set hex 创建 solidFill > srgbClr", () => {
    const r = new Run();
    r.colorHex = "FF0000";
    expect(r.colorHex).toBe("FF0000");
    const fill = r.firstChild(RunProperties)?.firstChild(SolidFill);
    expect(fill?.firstChild(RgbColorModelHex)?.val?.toString()).toBe("FF0000");
  });

  it("undefined 删 solidFill", () => {
    const r = new Run();
    r.colorHex = "00FF00";
    r.colorHex = undefined;
    expect(r.colorHex).toBeUndefined();
    expect(r.firstChild(RunProperties)?.firstChild(SolidFill)).toBeUndefined();
  });

  it("set 覆盖 不残留旧色 child", () => {
    const r = new Run();
    r.colorHex = "FF0000";
    r.colorHex = "00FF00";
    const fill = r.firstChild(RunProperties)?.firstChild(SolidFill);
    let count = 0;
    for (const c of fill!.children) if (c instanceof RgbColorModelHex) count += 1;
    expect(count).toBe(1);
    expect(r.colorHex).toBe("00FF00");
  });
});

describe("PPT Run 多属性 + round-trip", () => {
  it("多属性共存", () => {
    const r = new Run();
    r.bold = true;
    r.italic = true;
    r.underline = "sng";
    r.fontSizeHundredths = 2800;
    r.colorHex = "0000FF";
    expect(r.bold).toBe(true);
    expect(r.italic).toBe(true);
    expect(r.underline).toBe("sng");
    expect(r.fontSizeHundredths).toBe(2800);
    expect(r.colorHex).toBe("0000FF");
  });

  it("round-trip：通过 PresentationDocument save → reopen", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    // 手工 append 一个含 styled run 的 sp + txBody
    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("spTree not found");

    const sp = u("p", "sp", NS_P);
    sp.appendChild(u("p", "nvSpPr", NS_P));
    sp.appendChild(u("p", "spPr", NS_P));
    const txBody = u("p", "txBody", NS_P);
    txBody.appendChild(u("a", "bodyPr", NS_A));
    txBody.appendChild(u("a", "lstStyle", NS_A));
    const p = u("a", "p", NS_A);
    const r = new Run();
    r.bold = true;
    r.italic = true;
    r.colorHex = "FF0000";
    r.fontSizeHundredths = 2400;
    const t = u("a", "t", NS_A);
    t.text = "Styled";
    r.appendChild(t);
    p.appendChild(r);
    txBody.appendChild(p);
    sp.appendChild(txBody);
    spTree.appendChild(sp);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    const reRuns: Run[] = [];
    for (const d of reSlide.descendants()) {
      if (d instanceof Run) reRuns.push(d);
    }
    expect(reRuns[0]?.bold).toBe(true);
    expect(reRuns[0]?.italic).toBe(true);
    expect(reRuns[0]?.colorHex).toBe("FF0000");
    expect(reRuns[0]?.fontSizeHundredths).toBe(2400);
  });

  it("rPr 作为 Run 第一个 child", () => {
    const r = new Run();
    const t = new OpenXmlUnknownElement("a", "t", NS_A);
    t.text = "x";
    r.appendChild(t);
    r.bold = true;
    expect(r.children.at(0)).toBeInstanceOf(RunProperties);
    expect(r.children.at(1)).toBe(t);
  });
});

// silence unused import lint
void Slide;
