/**
 * Epic-68 smoke test：验证 spreadsheet-drawing codegen 跑出的元素类按预期可用。
 *
 * 抽样核心元素（WorksheetDrawing / TwoCellAnchor / OneCellAnchor / AbsoluteAnchor），
 * 加上 registry 注册流程的端到端检查。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry, OpenXmlCompositeElement } from "../../src/index.js";
import { registerSpreadsheetDrawingElements } from "../../src/spreadsheet-drawing/generated/_registry.js";
import {
  AbsoluteAnchor,
  OneCellAnchor,
  TwoCellAnchor,
  WorksheetDrawing,
} from "../../src/spreadsheet-drawing/generated/index.js";

const CNS = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing";

describe("Generated · 核心 SpreadsheetDrawing 元素形态", () => {
  it.each([
    { Ctor: WorksheetDrawing, localName: "wsDr" },
    { Ctor: TwoCellAnchor, localName: "twoCellAnchor" },
    { Ctor: OneCellAnchor, localName: "oneCellAnchor" },
    { Ctor: AbsoluteAnchor, localName: "absoluteAnchor" },
  ])("$Ctor.name 实例化得到正确 localName/prefix/namespace", ({ Ctor, localName }) => {
    const e = new Ctor();
    expect(e).toBeInstanceOf(OpenXmlCompositeElement);
    expect(e.localName).toBe(localName);
    expect(e.prefix).toBe("xdr");
    expect(e.namespaceUri).toBe(CNS);
  });
});

describe("Generated · registerSpreadsheetDrawingElements 注册流程", () => {
  it("注册到 ElementRegistry 不抛出，且可查到 WorksheetDrawing", () => {
    const registry = new ElementRegistry();
    expect(() => registerSpreadsheetDrawingElements(registry)).not.toThrow();
    const Ctor = registry.lookup(CNS, "wsDr");
    expect(Ctor).toBeDefined();
    if (Ctor !== undefined) {
      const e = new Ctor();
      expect(e).toBeInstanceOf(WorksheetDrawing);
    }
  });
});
