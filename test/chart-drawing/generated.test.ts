/**
 * Epic-68 smoke test：验证 chart-drawing codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（GroupShape / Shape / Picture / GraphicFrame），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerChartDrawingElements } from "../../src/chart-drawing/generated/_registry.js";
import {
  GraphicFrame,
  GroupShape,
  Picture,
  Shape,
} from "../../src/chart-drawing/generated/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing";

describe("Generated · 核心 ChartDrawing 元素形态", () => {
  it.each([
    { Ctor: GroupShape, localName: "grpSp" },
    { Ctor: Shape, localName: "sp" },
    { Ctor: Picture, localName: "pic" },
    { Ctor: GraphicFrame, localName: "graphicFrame" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("cdr");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerChartDrawingElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 GroupShape", () => {
    const registry = new ElementRegistry();
    expect(() => registerChartDrawingElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "grpSp");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(GroupShape);
    }
  });
});
