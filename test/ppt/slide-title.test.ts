/**
 * Epic-37：Slide.title 访问器单测。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../src/element/index.js";
import { Slide } from "../../src/ppt/generated/slide.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

function buildTitleSlide(initialText: string): Slide {
  const slide = new Slide();
  const cSld = u("p", "cSld", NS_P);
  const spTree = u("p", "spTree", NS_P);
  const sp = u("p", "sp", NS_P);

  const nvSpPr = u("p", "nvSpPr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", "2");
  cNvPr.extendedAttributes.set("name", "Title 1");
  nvSpPr.appendChild(cNvPr);
  nvSpPr.appendChild(u("p", "cNvSpPr", NS_P));
  const nvPr = u("p", "nvPr", NS_P);
  const ph = u("p", "ph", NS_P);
  ph.extendedAttributes.set("type", "title");
  nvPr.appendChild(ph);
  nvSpPr.appendChild(nvPr);
  sp.appendChild(nvSpPr);
  sp.appendChild(u("p", "spPr", NS_P));

  const txBody = u("p", "txBody", NS_P);
  txBody.appendChild(u("a", "bodyPr", NS_A));
  txBody.appendChild(u("a", "lstStyle", NS_A));
  const p = u("a", "p", NS_A);
  if (initialText.length > 0) {
    const r = u("a", "r", NS_A);
    r.appendChild(u("a", "rPr", NS_A));
    const t = u("a", "t", NS_A);
    t.text = initialText;
    r.appendChild(t);
    p.appendChild(r);
  }
  txBody.appendChild(p);
  sp.appendChild(txBody);

  spTree.appendChild(sp);
  cSld.appendChild(spTree);
  slide.appendChild(cSld);
  return slide;
}

describe("Slide.title", () => {
  it("getter 找到 title placeholder 返回文本", () => {
    const slide = buildTitleSlide("My Title");
    expect(slide.title).toBe("My Title");
  });

  it("getter 找不到 title placeholder 返 undefined", () => {
    const slide = new Slide();
    expect(slide.title).toBeUndefined();
  });

  it("getter 在空 title 返空串", () => {
    const slide = buildTitleSlide("");
    expect(slide.title).toBe("");
  });

  it("setter 替换 title 文本", () => {
    const slide = buildTitleSlide("Old");
    slide.title = "New Title";
    expect(slide.title).toBe("New Title");
  });

  it("setter undefined 清空 title", () => {
    const slide = buildTitleSlide("Filled");
    slide.title = undefined;
    expect(slide.title).toBe("");
  });

  it("setter 找不到 title 抛错", () => {
    const slide = new Slide();
    expect(() => {
      slide.title = "anything";
    }).toThrow(/title placeholder not found/);
  });

  it("setter 支持 ctrTitle 类型", () => {
    const slide = buildTitleSlide("");
    // 把 ph type 改成 ctrTitle
    for (const ph of slide.descendants()) {
      if (ph.localName === "ph") {
        ph.extendedAttributes.set("type", "ctrTitle");
        break;
      }
    }
    slide.title = "Centered Title";
    expect(slide.title).toBe("Centered Title");
  });

  it("round-trip：通过 PresentationDocument save → reopen，title 保留", async () => {
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart!.slideParts[0]!;
    const slide = slidePart.slide;
    // seed slide 没 title placeholder——往现有 spTree 加一个 title sp
    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("seed slide missing spTree");
    const temp = buildTitleSlide("Round Trip Title");
    let titleSp: OpenXmlCompositeElement | undefined;
    for (const d of temp.descendants()) {
      if (d.localName === "sp" && d instanceof OpenXmlCompositeElement) {
        titleSp = d;
        break;
      }
    }
    if (titleSp === undefined) throw new Error("title sp not built");
    titleSp.parent?.children.remove(titleSp);
    spTree.appendChild(titleSp);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    expect(reSlide.title).toBe("Round Trip Title");
  });
});
