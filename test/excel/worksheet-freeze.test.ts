/**
 * Epic-32：Excel 冻结窗格便捷层单测。
 */

import { describe, expect, it } from "vitest";
import {
  Pane,
  Selection,
  SheetView,
  SheetViews,
  SpreadsheetDocument,
  Worksheet,
  getFreezePanes,
  setFreezePanes,
} from "../../src/excel/index.js";

function firstSheetView(ws: Worksheet): SheetView | undefined {
  return ws.firstChild(SheetViews)?.firstChild(SheetView);
}

describe("setFreezePanes / getFreezePanes", () => {
  it("空 worksheet 上 set rows=1 自动创建 sheetViews+sheetView+pane+selection", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 1 });
    const view = firstSheetView(ws);
    expect(view).toBeDefined();
    const pane = view?.firstChild(Pane);
    expect(pane?.verticalSplit?.toString()).toBe("1");
    expect(pane?.horizontalSplit).toBeUndefined();
    expect(pane?.state?.toString()).toBe("frozen");
    expect(pane?.activePane?.toString()).toBe("bottomLeft");
    expect(pane?.topLeftCell?.toString()).toBe("A2");
  });

  it("set columns=1 → activePane=topRight, topLeftCell=B1", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { columns: 1 });
    const pane = firstSheetView(ws)?.firstChild(Pane);
    expect(pane?.horizontalSplit?.toString()).toBe("1");
    expect(pane?.verticalSplit).toBeUndefined();
    expect(pane?.activePane?.toString()).toBe("topRight");
    expect(pane?.topLeftCell?.toString()).toBe("B1");
  });

  it("set rows=2,columns=3 → activePane=bottomRight, topLeftCell=D3", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 2, columns: 3 });
    const pane = firstSheetView(ws)?.firstChild(Pane);
    expect(pane?.horizontalSplit?.toString()).toBe("3");
    expect(pane?.verticalSplit?.toString()).toBe("2");
    expect(pane?.activePane?.toString()).toBe("bottomRight");
    expect(pane?.topLeftCell?.toString()).toBe("D3");
  });

  it("topLeftCell 显式传入覆盖默认计算", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 1, topLeftCell: "F10" });
    const pane = firstSheetView(ws)?.firstChild(Pane);
    expect(pane?.topLeftCell?.toString()).toBe("F10");
  });

  it("setFreezePanes(ws, undefined) 移除冻结但保留 sheetView", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 1 });
    setFreezePanes(ws, undefined);
    const view = firstSheetView(ws);
    expect(view).toBeDefined();
    expect(view?.firstChild(Pane)).toBeUndefined();
  });

  it("rows=0 columns=0 等同于 clear", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 1 });
    setFreezePanes(ws, { rows: 0, columns: 0 });
    expect(firstSheetView(ws)?.firstChild(Pane)).toBeUndefined();
  });

  it("移除冻结时不删除「默认 selection」（无 pane 属性的）", () => {
    const ws = new Worksheet();
    const views = new SheetViews();
    const view = new SheetView();
    const defaultSel = new Selection();
    view.appendChild(defaultSel);
    views.appendChild(view);
    ws.appendChild(views);
    setFreezePanes(ws, { rows: 1 });
    setFreezePanes(ws, undefined);
    // defaultSel（无 pane）仍在
    let hasDefault = false;
    for (const c of view.children)
      if (c instanceof Selection && c.pane === undefined) hasDefault = true;
    expect(hasDefault).toBe(true);
  });

  it("getFreezePanes 读回 set 的值", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 2, columns: 1 });
    expect(getFreezePanes(ws)).toEqual({
      rows: 2,
      columns: 1,
      topLeftCell: "B3",
    });
  });

  it("getFreezePanes 在无 pane 时返 undefined", () => {
    const ws = new Worksheet();
    expect(getFreezePanes(ws)).toBeUndefined();
  });

  it("getFreezePanes 在 pane state != frozen 时返 undefined", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 1 });
    const pane = firstSheetView(ws)?.firstChild(Pane);
    if (pane !== undefined) {
      // 模拟手动改成 split
      pane.state = undefined;
    }
    expect(getFreezePanes(ws)).toBeUndefined();
  });

  it("round-trip：通过 SpreadsheetDocument save → reopen 后冻结仍在", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
    setFreezePanes(ws, { rows: 1, columns: 2 });
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart!.worksheetParts[0]!.worksheet;
    expect(getFreezePanes(reWs)).toEqual({
      rows: 1,
      columns: 2,
      topLeftCell: "C2",
    });
  });

  it("多次 set 覆盖（不残留旧 pane）", () => {
    const ws = new Worksheet();
    setFreezePanes(ws, { rows: 5 });
    setFreezePanes(ws, { columns: 2 });
    const view = firstSheetView(ws);
    let paneCount = 0;
    for (const c of view!.children) if (c instanceof Pane) paneCount += 1;
    expect(paneCount).toBe(1);
    expect(getFreezePanes(ws)).toEqual({ columns: 2, topLeftCell: "C1" });
  });
});
