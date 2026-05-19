/**
 * Epic-42：PPT/DrawingML Paragraph 段落格式访问器单测。
 */

import { describe, expect, it } from "vitest";
import { ParagraphProperties } from "../../src/drawing/generated/paragraph-properties.js";
import { Paragraph } from "../../src/drawing/generated/paragraph.js";
import { Run } from "../../src/drawing/generated/run.js";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../src/element/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

describe("PPT Paragraph.alignment", () => {
  it("undefined when pPr 不存在", () => {
    expect(new Paragraph().alignment).toBeUndefined();
  });

  it("set 'ctr' 自动创建 pPr", () => {
    const p = new Paragraph();
    p.alignment = "ctr";
    expect(p.alignment).toBe("ctr");
    expect(p.firstChild(ParagraphProperties)?.alignment?.toString()).toBe("ctr");
  });

  it("set undefined 删 typed", () => {
    const p = new Paragraph();
    p.alignment = "r";
    p.alignment = undefined;
    expect(p.alignment).toBeUndefined();
  });
});

describe("PPT Paragraph.leftMarginEmu / indentEmu", () => {
  it("set/get EMU", () => {
    const p = new Paragraph();
    p.leftMarginEmu = 914400;
    p.indentEmu = -457200;
    expect(p.leftMarginEmu).toBe(914400);
    expect(p.indentEmu).toBe(-457200);
  });

  it("undefined 清", () => {
    const p = new Paragraph();
    p.leftMarginEmu = 100000;
    p.leftMarginEmu = undefined;
    expect(p.leftMarginEmu).toBeUndefined();
  });
});

describe("PPT Paragraph 多属性 + pPr 顺序", () => {
  it("pPr 作为 Paragraph 第一个 child", () => {
    const p = new Paragraph();
    const r = new Run();
    p.appendChild(r);
    p.alignment = "ctr";
    expect(p.children.at(0)).toBeInstanceOf(ParagraphProperties);
    expect(p.children.at(1)).toBe(r);
  });

  it("多属性共存", () => {
    const p = new Paragraph();
    p.alignment = "just";
    p.leftMarginEmu = 685800;
    p.indentEmu = 0;
    expect(p.alignment).toBe("just");
    expect(p.leftMarginEmu).toBe(685800);
    expect(p.indentEmu).toBe(0);
  });

  it("round-trip：通过 PresentationDocument save → reopen", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("spTree missing");

    const sp = u("p", "sp", NS_P);
    sp.appendChild(u("p", "nvSpPr", NS_P));
    sp.appendChild(u("p", "spPr", NS_P));
    const txBody = u("p", "txBody", NS_P);
    txBody.appendChild(u("a", "bodyPr", NS_A));
    txBody.appendChild(u("a", "lstStyle", NS_A));
    const p = new Paragraph();
    p.alignment = "ctr";
    p.leftMarginEmu = 914400;
    p.indentEmu = -457200;
    const r = new Run();
    const t = u("a", "t", NS_A);
    t.text = "Centered indented";
    r.appendChild(t);
    p.appendChild(r);
    txBody.appendChild(p);
    sp.appendChild(txBody);
    spTree.appendChild(sp);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    const reParas: Paragraph[] = [];
    for (const d of reSlide.descendants()) {
      if (d instanceof Paragraph) reParas.push(d);
    }
    expect(reParas[0]?.alignment).toBe("ctr");
    expect(reParas[0]?.leftMarginEmu).toBe(914400);
    expect(reParas[0]?.indentEmu).toBe(-457200);
  });
});
