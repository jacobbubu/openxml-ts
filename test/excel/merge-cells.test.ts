/**
 * Epic-53：Excel 合并单元格便捷层单测。
 */

import { describe, expect, it } from "vitest";
import {
  MergeCell,
  MergeCells,
  SpreadsheetDocument,
  Worksheet,
  clearAllMergedCells,
  getMergedRanges,
  mergeCells,
  unmergeCells,
} from "../../src/excel/index.js";

describe("mergeCells / unmergeCells / clearAllMergedCells / getMergedRanges", () => {
  it("空 worksheet 上 mergeCells 单个 range → 自动创建 mergeCells 元素", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1:B2");
    const mc = ws.firstChild(MergeCells);
    expect(mc).toBeDefined();
    expect(getMergedRanges(ws)).toEqual(["A1:B2"]);
  });

  it("批量添加多个 range", () => {
    const ws = new Worksheet();
    mergeCells(ws, ["A1:B2", "C3:D4"]);
    expect(getMergedRanges(ws)).toEqual(["A1:B2", "C3:D4"]);
  });

  it("重复 range 幂等（不重复添加）", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1:B2");
    mergeCells(ws, "A1:B2");
    expect(getMergedRanges(ws)).toEqual(["A1:B2"]);
  });

  it("count 属性同步正确", () => {
    const ws = new Worksheet();
    mergeCells(ws, ["A1:B2", "C3:D4"]);
    const mc = ws.firstChild(MergeCells);
    expect(mc?.count?.toString()).toBe("2");
  });

  it("unmergeCells 删除指定 range", () => {
    const ws = new Worksheet();
    mergeCells(ws, ["A1:B2", "C3:D4"]);
    unmergeCells(ws, "A1:B2");
    expect(getMergedRanges(ws)).toEqual(["C3:D4"]);
  });

  it("unmergeCells 删除最后一个 range 后自动删除 mergeCells 元素", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1:B2");
    unmergeCells(ws, "A1:B2");
    expect(ws.firstChild(MergeCells)).toBeUndefined();
    expect(getMergedRanges(ws)).toEqual([]);
  });

  it("clearAllMergedCells 清除所有合并并删除元素", () => {
    const ws = new Worksheet();
    mergeCells(ws, ["A1:B2", "C3:D4", "E5:F6"]);
    clearAllMergedCells(ws);
    expect(ws.firstChild(MergeCells)).toBeUndefined();
    expect(getMergedRanges(ws)).toEqual([]);
  });

  it("getMergedRanges 无合并时返回空数组", () => {
    const ws = new Worksheet();
    expect(getMergedRanges(ws)).toEqual([]);
  });

  it("非法 range 字符串抛 RangeError", () => {
    const ws = new Worksheet();
    expect(() => mergeCells(ws, "invalid")).toThrow(RangeError);
    expect(() => mergeCells(ws, "a1:b2")).toThrow(RangeError);
    expect(() => mergeCells(ws, "A1-B2")).toThrow(RangeError);
    expect(() => unmergeCells(ws, "bad")).toThrow(RangeError);
  });

  it("count 属性在 unmergeCells 后正确更新", () => {
    const ws = new Worksheet();
    mergeCells(ws, ["A1:B2", "C3:D4", "E5:F6"]);
    unmergeCells(ws, "C3:D4");
    const mc = ws.firstChild(MergeCells);
    expect(mc?.count?.toString()).toBe("2");
    expect(getMergedRanges(ws)).toEqual(["A1:B2", "E5:F6"]);
  });

  it("round-trip：通过 SpreadsheetDocument save → reopen 后合并仍在", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
    if (ws === undefined) throw new Error("expected worksheet");
    mergeCells(ws, ["A1:B1", "C1:D1"]);
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart?.worksheetParts[0]?.worksheet;
    if (reWs === undefined) throw new Error("expected worksheet after reopen");
    expect(getMergedRanges(reWs)).toEqual(["A1:B1", "C1:D1"]);
    const mc = reWs.firstChild(MergeCells);
    expect(mc?.count?.toString()).toBe("2");
  });

  it("单格 range（如 A1）合法", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1");
    expect(getMergedRanges(ws)).toEqual(["A1"]);
  });

  it("unmergeCells 不存在的 range 静默跳过", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1:B2");
    expect(() => unmergeCells(ws, "C3:D4")).not.toThrow();
    expect(getMergedRanges(ws)).toEqual(["A1:B2"]);
  });

  it("clearAllMergedCells 在无合并时不抛错", () => {
    const ws = new Worksheet();
    expect(() => clearAllMergedCells(ws)).not.toThrow();
  });

  it("MergeCell 元素的 reference 属性正确序列化", () => {
    const ws = new Worksheet();
    mergeCells(ws, "A1:C3");
    const mc = ws.firstChild(MergeCells);
    const cell = mc?.firstChild(MergeCell);
    expect(cell?.reference?.toString()).toBe("A1:C3");
  });
});
