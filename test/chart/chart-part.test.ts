/**
 * Epic-66 · ChartPart typed part + 跨命名空间 registry 解析
 *
 * 覆盖：
 * 1. 静态常量——relationshipType / contentType 正确
 * 2. 空 ChartPart 构造——placeholder root 形态（localName / prefix / namespace）
 * 3. round-trip：Complex01.xlsx → DrawingPart → ChartPart → chartSpace
 *    - root 是 typed ChartSpace（非 OpenXmlUnknownElement）
 *    - 内嵌 <c:...> 子解析为 typed chart 类
 *    - 内嵌 <a:...> 子解析为 typed drawing 类（非 OpenXmlUnknownElement）
 *    - save → reopen → 结构稳定（字节 round-trip）
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ChartSpace } from "../../src/chart/generated/chart-space.js";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { DrawingPart } from "../../src/excel/parts/drawing-part.js";
import {
  ElementRegistry,
  OpenXmlCompositeElement,
  OpenXmlUnknownElement,
} from "../../src/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import { ChartPart } from "../../src/parts/chart-part.js";
import { resolveRelativePartUri } from "../../src/parts/relationship-uri.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES_DIR = join(HERE, "../fixtures/upstream-smoke");

const CHART_NS = "http://schemas.openxmlformats.org/drawingml/2006/chart";
const DRAWING_NS = "http://schemas.openxmlformats.org/drawingml/2006/main";

// ─── 1. 静态常量 ──────────────────────────────────────────────────────────────

describe("ChartPart · 静态常量", () => {
  it("relationshipType 正确", () => {
    expect(ChartPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
    );
  });

  it("contentType 正确", () => {
    expect(ChartPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.drawingml.chart+xml",
    );
  });
});

// ─── 2. 空 ChartPart 构造（新建场景） ────────────────────────────────────────

describe("ChartPart · 空构造（新建场景）", () => {
  it("chartSpace 返回占位 OpenXmlUnknownElement（c:chartSpace）", () => {
    const pkg = createInMemory();
    const rawPart = pkg.createPart(
      "/xl/charts/chart1.xml" as import("../../src/packaging/interfaces/types.js").PartUri,
      ChartPart.contentType,
    );
    const cp = new ChartPart(rawPart);
    const root = cp.chartSpace;
    expect(root).toBeInstanceOf(OpenXmlUnknownElement);
    expect(root.localName).toBe("chartSpace");
    expect(root.prefix).toBe("c");
    expect(root.namespaceUri).toBe(CHART_NS);
  });
});

// ─── 3. Round-trip：Complex01.xlsx ──────────────────────────────────────────

/**
 * 从 SpreadsheetDocument 中提取所有 ChartPart：
 * worksheet → drawing rel → DrawingPart（传 pkg）→ chartParts
 */
async function openChartParts(bytes: Uint8Array): Promise<ChartPart[]> {
  const doc = await SpreadsheetDocument.openAsync(bytes);
  const wp = doc.workbookPart;
  if (wp === undefined) throw new Error("workbookPart missing");
  const out: ChartPart[] = [];
  const emptyReg = new ElementRegistry();
  for (const wsp of wp.worksheetParts) {
    for (const rel of wsp.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!rel.type.includes("/drawing")) continue;
      if (rel.type.includes("vml") || rel.type.includes("diagram")) continue;
      const drawingUri = resolveRelativePartUri(wsp.part.uri, rel.target);
      if (drawingUri === undefined || !doc.package.hasPart(drawingUri)) continue;
      const dp = new DrawingPart(doc.package.getPart(drawingUri), emptyReg, doc.package);
      out.push(...dp.chartParts);
    }
  }
  return out;
}

describe("ChartPart · round-trip Complex01.xlsx", () => {
  it("Complex01.xlsx 含至少 1 个 ChartPart", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Complex01.xlsx")));
    const chartParts = await openChartParts(bytes);
    expect(chartParts.length).toBeGreaterThanOrEqual(1);
  });

  it("chartSpace root 反序列化为 typed ChartSpace（非 OpenXmlUnknownElement）", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Complex01.xlsx")));
    const chartParts = await openChartParts(bytes);
    expect(chartParts.length).toBeGreaterThanOrEqual(1);
    const root = chartParts[0]!.chartSpace;
    expect(root).toBeInstanceOf(ChartSpace);
    expect(root).not.toBeInstanceOf(OpenXmlUnknownElement);
  });

  it("chartSpace 含 typed chart 子元素（c: namespace，非 OpenXmlUnknownElement）", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Complex01.xlsx")));
    const chartParts = await openChartParts(bytes);
    const root = chartParts[0]!.chartSpace;
    expect(root).toBeInstanceOf(OpenXmlCompositeElement);
    const typedChart = [...(root as OpenXmlCompositeElement).descendants()].filter(
      (el) => el.namespaceUri === CHART_NS && !(el instanceof OpenXmlUnknownElement),
    );
    expect(typedChart.length).toBeGreaterThan(0);
  });

  it("至少 1 个 <a:...> drawing 子元素解析为 typed（非 OpenXmlUnknownElement）", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Complex01.xlsx")));
    const chartParts = await openChartParts(bytes);
    const root = chartParts[0]!.chartSpace;
    expect(root).toBeInstanceOf(OpenXmlCompositeElement);
    const typedDrawing = [...(root as OpenXmlCompositeElement).descendants()].filter(
      (el) => el.namespaceUri === DRAWING_NS && !(el instanceof OpenXmlUnknownElement),
    );
    expect(typedDrawing.length).toBeGreaterThan(0);
  });

  it("save → reopen → 仍有 ChartPart（round-trip 字节稳定）", async () => {
    const bytes = new Uint8Array(await readFile(join(FIXTURES_DIR, "Complex01.xlsx")));
    const doc1 = await SpreadsheetDocument.openAsync(bytes);
    const bytes2 = await doc1.saveAsBytesAsync();
    const chartParts2 = await openChartParts(bytes2);
    expect(chartParts2.length).toBeGreaterThanOrEqual(1);
    const root2 = chartParts2[0]!.chartSpace;
    expect(root2).toBeInstanceOf(ChartSpace);
  });
});
