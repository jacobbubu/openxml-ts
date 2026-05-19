/**
 * Epic-33：列宽 / 行高便捷层单测。
 */

import { describe, expect, it } from "vitest";
import {
  Column,
  Columns,
  Row,
  SheetData,
  SpreadsheetDocument,
  Worksheet,
  getColumnWidth,
  getRowHeight,
  setColumnWidth,
  setRowHeight,
} from "../../src/excel/index.js";

function collectColumns(ws: Worksheet): Column[] {
  const cols = ws.firstChild(Columns);
  if (cols === undefined) return [];
  const out: Column[] = [];
  for (const c of cols.children) if (c instanceof Column) out.push(c);
  return out;
}

describe("setColumnWidth / getColumnWidth", () => {
  it("空 worksheet 上设单列宽自动创建 cols + col", () => {
    const ws = new Worksheet();
    setColumnWidth(ws, { from: 2, to: 2, widthChars: 12 });
    const list = collectColumns(ws);
    expect(list).toHaveLength(1);
    expect(list[0]?.min?.toString()).toBe("2");
    expect(list[0]?.max?.toString()).toBe("2");
    expect(list[0]?.width?.toString()).toBe("12");
    expect(list[0]?.customWidth?.toString()).toBe("1");
  });

  it("getColumnWidth 读出范围内任一列的宽度", () => {
    const ws = new Worksheet();
    setColumnWidth(ws, { from: 1, to: 3, widthChars: 20 });
    expect(getColumnWidth(ws, 1)).toBe(20);
    expect(getColumnWidth(ws, 2)).toBe(20);
    expect(getColumnWidth(ws, 3)).toBe(20);
    expect(getColumnWidth(ws, 4)).toBeUndefined();
  });

  it("widthChars=undefined 清除目标范围；cols 空时删除整个 cols 元素", () => {
    const ws = new Worksheet();
    setColumnWidth(ws, { from: 2, to: 5, widthChars: 18 });
    setColumnWidth(ws, { from: 2, to: 5, widthChars: undefined });
    expect(ws.firstChild(Columns)).toBeUndefined();
    expect(getColumnWidth(ws, 3)).toBeUndefined();
  });

  it("范围重叠：原 [1..5] 被新 [3..4] 切成 [1..2] + [5..5]", () => {
    const ws = new Worksheet();
    setColumnWidth(ws, { from: 1, to: 5, widthChars: 10 });
    setColumnWidth(ws, { from: 3, to: 4, widthChars: 25 });
    expect(getColumnWidth(ws, 1)).toBe(10);
    expect(getColumnWidth(ws, 2)).toBe(10);
    expect(getColumnWidth(ws, 3)).toBe(25);
    expect(getColumnWidth(ws, 4)).toBe(25);
    expect(getColumnWidth(ws, 5)).toBe(10);
  });

  it("完全包含：清除 [2..4] 时原 [1..5] 拆成 [1..1] + [5..5]", () => {
    const ws = new Worksheet();
    setColumnWidth(ws, { from: 1, to: 5, widthChars: 10 });
    setColumnWidth(ws, { from: 2, to: 4, widthChars: undefined });
    expect(getColumnWidth(ws, 1)).toBe(10);
    expect(getColumnWidth(ws, 2)).toBeUndefined();
    expect(getColumnWidth(ws, 3)).toBeUndefined();
    expect(getColumnWidth(ws, 4)).toBeUndefined();
    expect(getColumnWidth(ws, 5)).toBe(10);
  });

  it("cols 在 worksheet 中插在 sheetData 之前", () => {
    const ws = new Worksheet();
    const sd = new SheetData();
    ws.appendChild(sd);
    setColumnWidth(ws, { from: 1, to: 1, widthChars: 8 });
    const first = ws.children.at(0);
    const second = ws.children.at(1);
    expect(first).toBeInstanceOf(Columns);
    expect(second).toBe(sd);
  });

  it("非法范围抛错", () => {
    const ws = new Worksheet();
    expect(() => setColumnWidth(ws, { from: 0, to: 3, widthChars: 10 })).toThrow();
    expect(() => setColumnWidth(ws, { from: 5, to: 3, widthChars: 10 })).toThrow();
  });

  it("round-trip：通过 SpreadsheetDocument save → reopen 列宽保留", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
    setColumnWidth(ws, { from: 1, to: 2, widthChars: 30 });
    setColumnWidth(ws, { from: 4, to: 4, widthChars: 12.5 });
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart!.worksheetParts[0]!.worksheet;
    expect(getColumnWidth(reWs, 1)).toBe(30);
    expect(getColumnWidth(reWs, 2)).toBe(30);
    expect(getColumnWidth(reWs, 3)).toBeUndefined();
    expect(getColumnWidth(reWs, 4)).toBe(12.5);
  });
});

describe("setRowHeight / getRowHeight", () => {
  it("set 后 height + customHeight 都写入", () => {
    const r = new Row();
    setRowHeight(r, 30);
    expect(r.height?.toString()).toBe("30");
    expect(r.customHeight?.toString()).toBe("1");
    expect(getRowHeight(r)).toBe(30);
  });

  it("set undefined 清除两个属性", () => {
    const r = new Row();
    setRowHeight(r, 30);
    setRowHeight(r, undefined);
    expect(r.height).toBeUndefined();
    expect(r.customHeight).toBeUndefined();
    expect(getRowHeight(r)).toBeUndefined();
  });

  it("getRowHeight 读小数", () => {
    const r = new Row();
    setRowHeight(r, 22.5);
    expect(getRowHeight(r)).toBe(22.5);
  });
});
