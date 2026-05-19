/**
 * Epic-52：Shape 定位与尺寸访问器单测。
 */

import { describe, expect, it } from "vitest";
import { Extents } from "../../src/drawing/generated/extents.js";
import { Offset } from "../../src/drawing/generated/offset.js";
import { Transform2D } from "../../src/drawing/generated/transform2-d.js";
import { OpenXmlCompositeElement } from "../../src/element/index.js";
import { NonVisualDrawingProperties } from "../../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeProperties } from "../../src/ppt/generated/non-visual-shape-properties.js";
import { ShapeProperties } from "../../src/ppt/generated/shape-properties.js";
import { Shape } from "../../src/ppt/generated/shape.js";
import { PresentationDocument } from "../../src/ppt/index.js";

/** 构造带 p:nvSpPr 和 p:spPr > a:xfrm > a:off + a:ext 的 Shape。 */
function buildShape(
  opts: {
    xEmu?: number;
    yEmu?: number;
    widthEmu?: number;
    heightEmu?: number;
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

  if (
    opts.xEmu !== undefined ||
    opts.yEmu !== undefined ||
    opts.widthEmu !== undefined ||
    opts.heightEmu !== undefined
  ) {
    const xfrm = new Transform2D();
    spPr.appendChild(xfrm);

    if (opts.xEmu !== undefined && opts.yEmu !== undefined) {
      const off = new Offset();
      off.applyAttribute("x", String(opts.xEmu));
      off.applyAttribute("y", String(opts.yEmu));
      xfrm.appendChild(off);
    }

    if (opts.widthEmu !== undefined && opts.heightEmu !== undefined) {
      const ext = new Extents();
      ext.applyAttribute("cx", String(opts.widthEmu));
      ext.applyAttribute("cy", String(opts.heightEmu));
      xfrm.appendChild(ext);
    }
  }

  return sp;
}

describe("Shape.position getter", () => {
  it("返回 { xEmu, yEmu } 当 a:off 存在", () => {
    const sp = buildShape({ xEmu: 914400, yEmu: 685800 });
    expect(sp.position).toEqual({ xEmu: 914400, yEmu: 685800 });
  });

  it("spPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.position).toBeUndefined();
  });

  it("xfrm 不存在时返回 undefined", () => {
    const sp = new Shape();
    sp.appendChild(new ShapeProperties());
    expect(sp.position).toBeUndefined();
  });

  it("a:off 不存在但 a:ext 存在时返回 undefined", () => {
    const sp = buildShape({ widthEmu: 1828800, heightEmu: 685800 });
    expect(sp.position).toBeUndefined();
  });
});

describe("Shape.position setter", () => {
  it("写入新值并可 getter 读回", () => {
    const sp = new Shape();
    sp.position = { xEmu: 914400, yEmu: 685800 };
    expect(sp.position).toEqual({ xEmu: 914400, yEmu: 685800 });
  });

  it("更新已有值", () => {
    const sp = buildShape({ xEmu: 100000, yEmu: 200000 });
    sp.position = { xEmu: 500000, yEmu: 600000 };
    expect(sp.position).toEqual({ xEmu: 500000, yEmu: 600000 });
  });

  it("setter undefined 删除 a:off（spPr 不存在时静默）", () => {
    const sp = new Shape();
    sp.position = undefined; // 不应抛出
    expect(sp.position).toBeUndefined();
  });

  it("setter undefined 删除已有 a:off", () => {
    const sp = buildShape({ xEmu: 914400, yEmu: 685800 });
    sp.position = undefined;
    expect(sp.position).toBeUndefined();
    // 验证 a:off 节点已被移除
    const spPr = sp.firstChild(ShapeProperties);
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm?.firstChild(Offset)).toBeUndefined();
  });

  it("spPr / xfrm 不存在时 setter 自动创建节点链", () => {
    const sp = new Shape();
    sp.position = { xEmu: 457200, yEmu: 274638 };
    // 验证 spPr > xfrm > off 链路被创建
    const spPr = sp.firstChild(ShapeProperties);
    expect(spPr).toBeDefined();
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm).toBeDefined();
    const off = xfrm?.firstChild(Offset);
    expect(off).toBeDefined();
    expect(off?.x?.value).toBe(457200n);
    expect(off?.y?.value).toBe(274638n);
  });
});

describe("Shape.size getter", () => {
  it("返回 { widthEmu, heightEmu } 当 a:ext 存在", () => {
    const sp = buildShape({ widthEmu: 1828800, heightEmu: 685800 });
    expect(sp.size).toEqual({ widthEmu: 1828800, heightEmu: 685800 });
  });

  it("spPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.size).toBeUndefined();
  });

  it("a:ext 不存在但 a:off 存在时返回 undefined", () => {
    const sp = buildShape({ xEmu: 914400, yEmu: 685800 });
    expect(sp.size).toBeUndefined();
  });
});

describe("Shape.size setter", () => {
  it("写入新值并可 getter 读回", () => {
    const sp = new Shape();
    sp.size = { widthEmu: 1828800, heightEmu: 685800 };
    expect(sp.size).toEqual({ widthEmu: 1828800, heightEmu: 685800 });
  });

  it("更新已有值", () => {
    const sp = buildShape({ widthEmu: 1000000, heightEmu: 500000 });
    sp.size = { widthEmu: 2000000, heightEmu: 1000000 };
    expect(sp.size).toEqual({ widthEmu: 2000000, heightEmu: 1000000 });
  });

  it("setter undefined 删除 a:ext（xfrm 不存在时静默）", () => {
    const sp = new Shape();
    sp.size = undefined; // 不应抛出
    expect(sp.size).toBeUndefined();
  });

  it("setter undefined 删除已有 a:ext", () => {
    const sp = buildShape({ widthEmu: 1828800, heightEmu: 685800 });
    sp.size = undefined;
    expect(sp.size).toBeUndefined();
    const spPr = sp.firstChild(ShapeProperties);
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm?.firstChild(Extents)).toBeUndefined();
  });

  it("spPr / xfrm 不存在时 setter 自动创建节点链", () => {
    const sp = new Shape();
    sp.size = { widthEmu: 3657600, heightEmu: 1371600 };
    const spPr = sp.firstChild(ShapeProperties);
    expect(spPr).toBeDefined();
    const xfrm = spPr?.firstChild(Transform2D);
    expect(xfrm).toBeDefined();
    const ext = xfrm?.firstChild(Extents);
    expect(ext).toBeDefined();
    expect(ext?.cx?.value).toBe(3657600n);
    expect(ext?.cy?.value).toBe(1371600n);
  });
});

describe("position + size 共存", () => {
  it("同时设置 position 和 size，两者互不干扰", () => {
    const sp = new Shape();
    sp.position = { xEmu: 914400, yEmu: 685800 };
    sp.size = { widthEmu: 1828800, heightEmu: 685800 };
    expect(sp.position).toEqual({ xEmu: 914400, yEmu: 685800 });
    expect(sp.size).toEqual({ widthEmu: 1828800, heightEmu: 685800 });
  });

  it("清除 position 不影响 size", () => {
    const sp = buildShape({ xEmu: 914400, yEmu: 685800, widthEmu: 1828800, heightEmu: 685800 });
    sp.position = undefined;
    expect(sp.position).toBeUndefined();
    expect(sp.size).toEqual({ widthEmu: 1828800, heightEmu: 685800 });
  });

  it("清除 size 不影响 position", () => {
    const sp = buildShape({ xEmu: 914400, yEmu: 685800, widthEmu: 1828800, heightEmu: 685800 });
    sp.size = undefined;
    expect(sp.size).toBeUndefined();
    expect(sp.position).toEqual({ xEmu: 914400, yEmu: 685800 });
  });
});

describe("spPr 在 nvSpPr 之后插入", () => {
  it("setter 自动创建的 spPr 位于 nvSpPr 之后", () => {
    const sp = new Shape();
    const nvSpPr = new NonVisualShapeProperties();
    sp.appendChild(nvSpPr);

    sp.position = { xEmu: 100000, yEmu: 200000 };

    const kids = sp.children.toArray();
    const nvIdx = kids.indexOf(nvSpPr);
    const spPr = sp.firstChild(ShapeProperties);
    expect(spPr).toBeDefined();
    const spPrIdx = spPr !== undefined ? kids.indexOf(spPr) : -1;
    expect(spPrIdx).toBe(nvIdx + 1);
  });
});

describe("Shape position/size round-trip via PresentationDocument", () => {
  it("save → reopen 后 position 和 size 的 EMU 值保留在 XML 中", async () => {
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
    cNvPr.applyAttribute("name", "TestShape");
    nvSpPr.appendChild(cNvPr);
    sp.appendChild(nvSpPr);

    spTree.appendChild(sp);

    sp.position = { xEmu: 914400, yEmu: 685800 };
    sp.size = { widthEmu: 1828800, heightEmu: 685800 };

    const bytes = await doc.saveAsBytesAsync();

    // Verify EMU values survived serialization by searching the raw XML in the zip
    const { ZipReader, BlobReader, TextWriter } = await import("@zip.js/zip.js");
    const reader = new ZipReader(new BlobReader(new Blob([bytes])));
    const entries = await reader.getEntries();
    let slideXml = "";
    for (const entry of entries) {
      if (entry.filename.match(/ppt\/slides\/slide\d+\.xml/)) {
        slideXml = await entry.getData?.(new TextWriter());
        break;
      }
    }
    await reader.close();

    expect(slideXml).toContain('x="914400"');
    expect(slideXml).toContain('y="685800"');
    expect(slideXml).toContain('cx="1828800"');
  });
});
