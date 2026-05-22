/**
 * Epic-100：Shape p:nvSpPr 完整性单测。
 *
 * 验证 nvSpPr 必须包含 cNvPr + cNvSpPr + nvPr 三个子元素。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlCompositeElement } from "../../src/element/index.js";
import { ApplicationNonVisualDrawingProperties } from "../../src/ppt/generated/application-non-visual-drawing-properties.js";
import { NonVisualDrawingProperties } from "../../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeDrawingProperties } from "../../src/ppt/generated/non-visual-shape-drawing-properties.js";
import { NonVisualShapeProperties } from "../../src/ppt/generated/non-visual-shape-properties.js";
import { Shape } from "../../src/ppt/generated/shape.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** 构造一个带完整 nvSpPr（cNvPr + cNvSpPr + nvPr）的 Shape。 */
function buildCompleteShape(id: string, name: string): Shape {
  const sp = new Shape();
  const nvSpPr = new NonVisualShapeProperties();
  const cNvPr = new NonVisualDrawingProperties();
  cNvPr.applyAttribute("id", id);
  cNvPr.applyAttribute("name", name);
  nvSpPr.appendChild(cNvPr);
  nvSpPr.appendChild(new NonVisualShapeDrawingProperties());
  nvSpPr.appendChild(new ApplicationNonVisualDrawingProperties());
  sp.appendChild(nvSpPr);
  return sp;
}

describe("Shape nvSpPr 完整性", () => {
  it("nvSpPr 包含 cNvPr 子元素", () => {
    const sp = buildCompleteShape("2", "TestShape");
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    expect(nvSpPr).toBeDefined();
    const cNvPr = nvSpPr?.firstChild(NonVisualDrawingProperties);
    expect(cNvPr).toBeDefined();
  });

  it("nvSpPr 包含 cNvSpPr 子元素", () => {
    const sp = buildCompleteShape("2", "TestShape");
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    const cNvSpPr = nvSpPr?.firstChild(NonVisualShapeDrawingProperties);
    expect(cNvSpPr).toBeDefined();
  });

  it("nvSpPr 包含 nvPr 子元素", () => {
    const sp = buildCompleteShape("2", "TestShape");
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    const nvPr = nvSpPr?.firstChild(ApplicationNonVisualDrawingProperties);
    expect(nvPr).toBeDefined();
  });

  it("nvSpPr 恰好包含三个子元素（顺序：cNvPr, cNvSpPr, nvPr）", () => {
    const sp = buildCompleteShape("2", "TestShape");
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    const kids = nvSpPr?.children.toArray() ?? [];
    expect(kids).toHaveLength(3);
    expect(kids[0]?.localName).toBe("cNvPr");
    expect(kids[1]?.localName).toBe("cNvSpPr");
    expect(kids[2]?.localName).toBe("nvPr");
  });

  it("cNvPr id 和 name 属性正确设置", () => {
    const sp = buildCompleteShape("5", "MyShape");
    const nvSpPr = sp.firstChild(NonVisualShapeProperties);
    const cNvPr = nvSpPr?.firstChild(NonVisualDrawingProperties);
    expect(cNvPr?.id?.toString()).toBe("5");
    expect(cNvPr?.name?.toString()).toBe("MyShape");
  });

  it("round-trip：save → reopen 后 nvSpPr 三子元素仍完整", async () => {
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart!.slideParts[0]!;
    const slide = slidePart.slide;

    // 找到 spTree
    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("spTree missing");

    const sp = buildCompleteShape("2", "RoundTripShape");
    spTree.appendChild(sp);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;

    // 找到我们插入的 shape 的 nvSpPr（NonVisualShapeProperties）
    let foundNvSpPr: OpenXmlCompositeElement | undefined;
    for (const d of reSlide.descendants()) {
      if (d.localName === "nvSpPr" && d instanceof OpenXmlCompositeElement) {
        foundNvSpPr = d;
        break;
      }
    }
    expect(foundNvSpPr).toBeDefined();

    // 验证三个子元素均存在
    const childNames: string[] = [];
    for (const c of foundNvSpPr!.children) {
      childNames.push(c.localName);
    }
    expect(childNames).toContain("cNvPr");
    expect(childNames).toContain("cNvSpPr");
    expect(childNames).toContain("nvPr");
  });
});
