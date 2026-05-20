/**
 * Epic-75 smoke test：验证 chart-ex codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（ChartSpace / Chart / PlotArea / Axis），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerChartExElements } from "../../src/chart-ex/generated/_registry.js";
import { Axis, ChartSpace, Formula, PlotArea } from "../../src/chart-ex/generated/index.js";
import { OpenXmlLeafElement } from "../../src/element/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.microsoft.com/office/drawing/2014/chartex";

describe("Generated · 核心 ChartEx composite 元素形态", () => {
  it.each([
    { Ctor: ChartSpace, localName: "chartSpace" },
    { Ctor: Axis, localName: "axis" },
    { Ctor: PlotArea, localName: "plotArea" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("cx");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · 核心 ChartEx leaf 元素形态", () => {
  it("Formula 实例化得到正确 localName/prefix/namespace", () => {
    const e = new Formula();
    expect(e).toBeInstanceOf(OpenXmlLeafElement);
    expect(e.localName).toBe("f");
    expect(e.prefix).toBe("cx");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerChartExElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 ChartSpace", () => {
    const registry = new ElementRegistry();
    expect(() => registerChartExElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "chartSpace");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(ChartSpace);
    }
  });
});
