/**
 * Epic-68 smoke test：验证 wordprocessing-drawing codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（Inline / Anchor / DocProperties / Extent），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerWordprocessingDrawingElements } from "../../src/wordprocessing-drawing/generated/_registry.js";
import {
  Anchor,
  DocProperties,
  HorizontalPosition,
  Inline,
} from "../../src/wordprocessing-drawing/generated/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing";

describe("Generated · 核心 WordprocessingDrawing 元素形态", () => {
  it.each([
    { Ctor: Inline, localName: "inline" },
    { Ctor: Anchor, localName: "anchor" },
    { Ctor: DocProperties, localName: "docPr" },
    { Ctor: HorizontalPosition, localName: "positionH" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("wp");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerWordprocessingDrawingElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 Inline", () => {
    const registry = new ElementRegistry();
    expect(() => registerWordprocessingDrawingElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "inline");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(Inline);
    }
  });
});
