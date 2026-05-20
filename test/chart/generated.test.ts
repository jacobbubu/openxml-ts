/**
 * Epic-65 smoke test：验证 chart codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（ChartSpace / Chart / BarChart / LineChart / PlotArea），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { registerChartElements } from "../../src/chart/generated/_registry.js";
import {
  BarChart,
  Chart,
  ChartSpace,
  LineChart,
  PlotArea,
} from "../../src/chart/generated/index.js";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/chart";

describe("Generated · 核心 Chart 元素形态", () => {
  it.each([
    { Ctor: ChartSpace, localName: "chartSpace" },
    { Ctor: Chart, localName: "chart" },
    { Ctor: PlotArea, localName: "plotArea" },
    { Ctor: BarChart, localName: "barChart" },
    { Ctor: LineChart, localName: "lineChart" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("c");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerChartElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 ChartSpace", () => {
    const registry = new ElementRegistry();
    expect(() => registerChartElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "chartSpace");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(ChartSpace);
    }
  });
});
