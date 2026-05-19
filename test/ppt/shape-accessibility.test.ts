/**
 * Epic-48：Shape 无障碍属性访问器单测。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../../src/element/index.js";
import { NonVisualDrawingProperties } from "../../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeProperties } from "../../src/ppt/generated/non-visual-shape-properties.js";
import { Shape } from "../../src/ppt/generated/shape.js";
import { PresentationDocument } from "../../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

/** 构造一个带 p:nvSpPr > p:cNvPr 的 Shape。 */
function buildShape(
  opts: {
    name?: string;
    altTitle?: string;
    altDescription?: string;
  } = {},
): Shape {
  const sp = new Shape();
  const nvSpPr = new NonVisualShapeProperties();
  const cNvPr = new NonVisualDrawingProperties();
  cNvPr.applyAttribute("id", "2");
  if (opts.name !== undefined) cNvPr.applyAttribute("name", opts.name);
  if (opts.altTitle !== undefined) cNvPr.applyAttribute("title", opts.altTitle);
  if (opts.altDescription !== undefined) cNvPr.applyAttribute("descr", opts.altDescription);
  nvSpPr.appendChild(cNvPr);
  sp.appendChild(nvSpPr);
  return sp;
}

describe("Shape.name", () => {
  it("getter 返回 cNvPr.name 字符串值", () => {
    const sp = buildShape({ name: "Rectangle 1" });
    expect(sp.name).toBe("Rectangle 1");
  });

  it("getter 在 cNvPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.name).toBeUndefined();
  });

  it("setter 写入新值", () => {
    const sp = buildShape({ name: "Old Name" });
    sp.name = "New Name";
    expect(sp.name).toBe("New Name");
  });

  it("setter undefined 清除 name 属性", () => {
    const sp = buildShape({ name: "To Remove" });
    sp.name = undefined;
    expect(sp.name).toBeUndefined();
  });

  it("setter 在没有 nvSpPr 时自动创建节点链", () => {
    const sp = new Shape();
    sp.name = "Auto Created";
    expect(sp.name).toBe("Auto Created");
    // 验证节点确实被创建
    let found = false;
    for (const d of sp.descendants()) {
      if (d.localName === "cNvPr") {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  });
});

describe("Shape.altTitle", () => {
  it("getter 返回 cNvPr.title 字符串值", () => {
    const sp = buildShape({ altTitle: "My Alt Title" });
    expect(sp.altTitle).toBe("My Alt Title");
  });

  it("getter 在 cNvPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.altTitle).toBeUndefined();
  });

  it("getter 在 title 属性缺失时返回 undefined", () => {
    const sp = buildShape({ name: "Only Name" });
    expect(sp.altTitle).toBeUndefined();
  });

  it("setter 写入新值", () => {
    const sp = buildShape({ altTitle: "Old Title" });
    sp.altTitle = "New Alt Title";
    expect(sp.altTitle).toBe("New Alt Title");
  });

  it("setter undefined 清除 title 属性", () => {
    const sp = buildShape({ altTitle: "To Clear" });
    sp.altTitle = undefined;
    expect(sp.altTitle).toBeUndefined();
  });

  it("setter 在空 Shape 上自动创建 nvSpPr > cNvPr 链", () => {
    const sp = new Shape();
    sp.altTitle = "Created Title";
    expect(sp.altTitle).toBe("Created Title");
  });
});

describe("Shape.altDescription", () => {
  it("getter 返回 cNvPr.descr 字符串值", () => {
    const sp = buildShape({ altDescription: "Detailed description" });
    expect(sp.altDescription).toBe("Detailed description");
  });

  it("getter 在 cNvPr 不存在时返回 undefined", () => {
    const sp = new Shape();
    expect(sp.altDescription).toBeUndefined();
  });

  it("setter 写入新值", () => {
    const sp = buildShape({ altDescription: "Old Desc" });
    sp.altDescription = "New Description";
    expect(sp.altDescription).toBe("New Description");
  });

  it("setter undefined 清除 descr 属性", () => {
    const sp = buildShape({ altDescription: "To Remove" });
    sp.altDescription = undefined;
    expect(sp.altDescription).toBeUndefined();
  });

  it("setter 在空 Shape 上自动创建 nvSpPr > cNvPr 链", () => {
    const sp = new Shape();
    sp.altDescription = "Auto Desc";
    expect(sp.altDescription).toBe("Auto Desc");
  });

  it("三个属性可以独立设置而互不干扰", () => {
    const sp = new Shape();
    sp.name = "Shape Name";
    sp.altTitle = "Alt Title";
    sp.altDescription = "Alt Description";
    expect(sp.name).toBe("Shape Name");
    expect(sp.altTitle).toBe("Alt Title");
    expect(sp.altDescription).toBe("Alt Description");
  });
});

describe("Shape 无障碍属性 round-trip", () => {
  it("save → reopen 后 altTitle / altDescription 保留", async () => {
    const doc = PresentationDocument.create();
    const slidePart = doc.presentationPart!.slideParts[0]!;
    const slide = slidePart.slide;

    // 找到 spTree 并插入一个带无障碍属性的 sp
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
    cNvPr.applyAttribute("name", "Test Shape");
    nvSpPr.appendChild(cNvPr);
    sp.appendChild(nvSpPr);
    sp.appendChild(u("p", "spPr", NS_P));
    spTree.appendChild(sp);

    // 写入无障碍属性
    sp.altTitle = "Round Trip Title";
    sp.altDescription = "Round Trip Description";

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(bytes);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;

    // 在重新打开的幻灯片中找到我们的 shape
    let foundAltTitle: string | undefined;
    let foundAltDescription: string | undefined;
    for (const d of reSlide.descendants()) {
      if (d.localName === "cNvPr") {
        const typed = d as unknown as {
          title?: { value?: string };
          description?: { value?: string };
        };
        if (typed.title?.value !== undefined) {
          foundAltTitle = typed.title.value;
          foundAltDescription = typed.description?.value;
          break;
        }
      }
    }
    expect(foundAltTitle).toBe("Round Trip Title");
    expect(foundAltDescription).toBe("Round Trip Description");
  });
});
