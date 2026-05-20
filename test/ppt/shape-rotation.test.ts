/**
 * Epic-60：Shape 旋转与翻转访问器单测。
 */

import { describe, expect, it } from "vitest";
import { Transform2D } from "../../src/drawing/generated/transform2-d.js";
import { OpenXmlCompositeElement } from "../../src/element/index.js";
import { NonVisualDrawingProperties } from "../../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeProperties } from "../../src/ppt/generated/non-visual-shape-properties.js";
import { ShapeProperties } from "../../src/ppt/generated/shape-properties.js";
import { Shape } from "../../src/ppt/generated/shape.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** 构造带 p:nvSpPr 和 p:spPr > a:xfrm（可选 rot/flipH/flipV）的 Shape。 */
function buildShape(
  opts: {
    rot?: number;
    flipH?: boolean;
    flipV?: boolean;
  } = {},
): Shape {
  const sp = new Shape();
  const nvSpPr = new NonVisualShapeProperties();
  const cNvPr = new NonVisualDrawingProperties();
  cNvPr.applyAttribute("id", "1");
  cNvPr.applyAttribute("name", "Shape1");
  nvSpPr.appendChild(cNvPr);
  sp.appendChild(nvSpPr);

  const spPr = new ShapeProperties();
  sp.appendChild(spPr);

  if (opts.rot !== undefined || opts.flipH !== undefined || opts.flipV !== undefined) {
    const xfrm = new Transform2D();
    if (opts.rot !== undefined) xfrm.applyAttribute("rot", String(opts.rot));
    if (opts.flipH !== undefined) xfrm.applyAttribute("flipH", opts.flipH ? "1" : "0");
    if (opts.flipV !== undefined) xfrm.applyAttribute("flipV", opts.flipV ? "1" : "0");
    spPr.appendChild(xfrm);
  }

  return sp;
}

describe("Shape.rotationDegrees getter", () => {
  it("spPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.rotationDegrees).toBeUndefined();
  });

  it("xfrm 不存在时返回 undefined", () => {
    const sp = new Shape();
    sp.appendChild(new ShapeProperties());
    expect(sp.rotationDegrees).toBeUndefined();
  });

  it("rot 属性不存在时返回 undefined", () => {
    const sp = buildShape({ flipH: true });
    expect(sp.rotationDegrees).toBeUndefined();
  });

  it("rot=5400000 → 90 度", () => {
    const sp = buildShape({ rot: 5400000 });
    expect(sp.rotationDegrees).toBe(90);
  });

  it("rot=0 → 0 度", () => {
    const sp = buildShape({ rot: 0 });
    expect(sp.rotationDegrees).toBe(0);
  });

  it("rot=10800000 → 180 度", () => {
    const sp = buildShape({ rot: 10800000 });
    expect(sp.rotationDegrees).toBe(180);
  });

  it("rot=16200000 → 270 度", () => {
    const sp = buildShape({ rot: 16200000 });
    expect(sp.rotationDegrees).toBe(270);
  });
});

describe("Shape.rotationDegrees setter", () => {
  it("设置 90 度后 getter 返回 90", () => {
    const sp = new Shape();
    sp.rotationDegrees = 90;
    expect(sp.rotationDegrees).toBe(90);
  });

  it("设置 0 度后 getter 返回 0", () => {
    const sp = new Shape();
    sp.rotationDegrees = 0;
    expect(sp.rotationDegrees).toBe(0);
  });

  it("设置 180 度后 getter 返回 180", () => {
    const sp = new Shape();
    sp.rotationDegrees = 180;
    expect(sp.rotationDegrees).toBe(180);
  });

  it("设置 270 度后 getter 返回 270", () => {
    const sp = new Shape();
    sp.rotationDegrees = 270;
    expect(sp.rotationDegrees).toBe(270);
  });

  it("更新已有值（90 → 45）", () => {
    const sp = buildShape({ rot: 5400000 });
    sp.rotationDegrees = 45;
    expect(sp.rotationDegrees).toBe(45);
  });

  it("setter undefined 删除 rot 属性（xfrm 存在）", () => {
    const sp = buildShape({ rot: 5400000 });
    sp.rotationDegrees = undefined;
    expect(sp.rotationDegrees).toBeUndefined();
    const spPr = sp.firstChild(ShapeProperties);
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm?.rotation).toBeUndefined();
  });

  it("setter undefined 在 spPr 不存在时静默", () => {
    const sp = new Shape();
    expect(() => {
      sp.rotationDegrees = undefined;
    }).not.toThrow();
  });

  it("setter undefined 在 xfrm 不存在时静默", () => {
    const sp = new Shape();
    sp.appendChild(new ShapeProperties());
    expect(() => {
      sp.rotationDegrees = undefined;
    }).not.toThrow();
  });

  it("spPr / xfrm 不存在时 setter 自动创建节点链", () => {
    const sp = new Shape();
    sp.rotationDegrees = 90;
    const spPr = sp.firstChild(ShapeProperties);
    expect(spPr).toBeDefined();
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm).toBeDefined();
    expect(xfrm?.rotation?.value).toBe(5400000);
  });

  it("内部存储为 60000 分之 1 度整数", () => {
    const sp = new Shape();
    sp.rotationDegrees = 90;
    const spPr = sp.firstChild(ShapeProperties);
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm?.rotation?.value).toBe(90 * 60000);
  });
});

describe("Shape.flipHorizontal getter", () => {
  it("xfrm 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.flipHorizontal).toBeUndefined();
  });

  it("flipH 属性不存在时返回 undefined", () => {
    const sp = buildShape({ rot: 5400000 });
    expect(sp.flipHorizontal).toBeUndefined();
  });

  it("flipH=true → getter 返回 true", () => {
    const sp = buildShape({ flipH: true });
    expect(sp.flipHorizontal).toBe(true);
  });

  it("flipH=false → getter 返回 false", () => {
    const sp = buildShape({ flipH: false });
    expect(sp.flipHorizontal).toBe(false);
  });
});

describe("Shape.flipHorizontal setter", () => {
  it("设置 true 后 getter 返回 true", () => {
    const sp = new Shape();
    sp.flipHorizontal = true;
    expect(sp.flipHorizontal).toBe(true);
  });

  it("设置 false 后 getter 返回 false", () => {
    const sp = new Shape();
    sp.flipHorizontal = false;
    expect(sp.flipHorizontal).toBe(false);
  });

  it("setter undefined 删除 flipH 属性", () => {
    const sp = buildShape({ flipH: true });
    sp.flipHorizontal = undefined;
    expect(sp.flipHorizontal).toBeUndefined();
    const xfrm = sp.firstChild(ShapeProperties)?.firstChild(Transform2D);
    expect(xfrm?.horizontalFlip).toBeUndefined();
  });

  it("setter undefined 在 spPr 不存在时静默", () => {
    const sp = new Shape();
    expect(() => {
      sp.flipHorizontal = undefined;
    }).not.toThrow();
  });
});

describe("Shape.flipVertical getter/setter", () => {
  it("xfrm 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.flipVertical).toBeUndefined();
  });

  it("flipV=true → getter 返回 true", () => {
    const sp = buildShape({ flipV: true });
    expect(sp.flipVertical).toBe(true);
  });

  it("设置 true 后 getter 返回 true", () => {
    const sp = new Shape();
    sp.flipVertical = true;
    expect(sp.flipVertical).toBe(true);
  });

  it("setter undefined 删除 flipV 属性", () => {
    const sp = buildShape({ flipV: true });
    sp.flipVertical = undefined;
    expect(sp.flipVertical).toBeUndefined();
    const xfrm = sp.firstChild(ShapeProperties)?.firstChild(Transform2D);
    expect(xfrm?.verticalFlip).toBeUndefined();
  });
});

describe("组合访问器（rotation + flip + position + size）", () => {
  it("旋转不影响 flipH / flipV", () => {
    const sp = new Shape();
    sp.rotationDegrees = 90;
    sp.flipHorizontal = true;
    sp.flipVertical = false;
    expect(sp.rotationDegrees).toBe(90);
    expect(sp.flipHorizontal).toBe(true);
    expect(sp.flipVertical).toBe(false);
  });

  it("清除 rotation 不影响 flip 标志", () => {
    const sp = new Shape();
    sp.rotationDegrees = 180;
    sp.flipHorizontal = true;
    sp.rotationDegrees = undefined;
    expect(sp.rotationDegrees).toBeUndefined();
    expect(sp.flipHorizontal).toBe(true);
  });

  it("同时设置 position + size + rotation + flipH", () => {
    const sp = new Shape();
    sp.position = { xEmu: 914400, yEmu: 685800 };
    sp.size = { widthEmu: 1828800, heightEmu: 685800 };
    sp.rotationDegrees = 45;
    sp.flipHorizontal = true;
    expect(sp.position).toEqual({ xEmu: 914400, yEmu: 685800 });
    expect(sp.size).toEqual({ widthEmu: 1828800, heightEmu: 685800 });
    expect(sp.rotationDegrees).toBe(45);
    expect(sp.flipHorizontal).toBe(true);
  });
});

describe("round-trip via PresentationDocument", () => {
  it("save → reopen 后 rot / flipH 值保留在 XML 中", async () => {
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart?.slideParts[0];
    if (slidePart === undefined) throw new Error("no slide part");
    const slide = slidePart.slide;

    let spTree: OpenXmlCompositeElement | undefined;
    for (const d of slide.descendants()) {
      if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
        spTree = d;
        break;
      }
    }
    if (spTree === undefined) throw new Error("seed slide missing spTree");

    const sp = new Shape();
    const nvSpPr = new NonVisualShapeProperties();
    const cNvPr = new NonVisualDrawingProperties();
    cNvPr.applyAttribute("id", "99");
    cNvPr.applyAttribute("name", "RotatedShape");
    nvSpPr.appendChild(cNvPr);
    sp.appendChild(nvSpPr);
    spTree.appendChild(sp);

    sp.rotationDegrees = 90;
    sp.flipHorizontal = true;
    sp.flipVertical = false;

    const bytes = await doc.saveAsBytesAsync();

    const { ZipReader, BlobReader, TextWriter } = await import("@zip.js/zip.js");
    const reader = new ZipReader(new BlobReader(new Blob([bytes])));
    const entries = await reader.getEntries();
    let slideXml = "";
    for (const entry of entries) {
      if (entry.filename.match(/ppt\/slides\/slide\d+\.xml/)) {
        slideXml = (await entry.getData?.(new TextWriter())) ?? "";
        break;
      }
    }
    await reader.close();

    expect(slideXml).toContain('rot="5400000"');
    expect(slideXml).toContain('flipH="1"');
    expect(slideXml).toContain('flipV="0"');
  });
});
