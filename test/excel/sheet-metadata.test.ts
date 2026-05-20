/**
 * Epic-62：Excel Sheet 视觉元数据访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  BookViews,
  Sheet,
  SheetProperties,
  SpreadsheetDocument,
  TabColor,
  Workbook,
  WorkbookView,
  Worksheet,
  clearWorksheetTabColor,
  getActiveSheet,
  getSheetState,
  getWorksheetTabColor,
  setActiveSheet,
  setSheetState,
  setWorksheetTabColor,
} from "../../src/excel/index.js";

// ─── setSheetState / getSheetState ────────────────────────────────────────────

describe("setSheetState / getSheetState", () => {
  it("默认（无 state 属性）返回 'visible'", () => {
    const sheet = new Sheet();
    expect(getSheetState(sheet)).toBe("visible");
  });

  it("set hidden → getSheetState 返回 'hidden'", () => {
    const sheet = new Sheet();
    setSheetState(sheet, "hidden");
    expect(getSheetState(sheet)).toBe("hidden");
    expect(sheet.state?.toString()).toBe("hidden");
  });

  it("set veryHidden → getSheetState 返回 'veryHidden'", () => {
    const sheet = new Sheet();
    setSheetState(sheet, "veryHidden");
    expect(getSheetState(sheet)).toBe("veryHidden");
  });

  it("set visible → 移除 state 属性", () => {
    const sheet = new Sheet();
    setSheetState(sheet, "hidden");
    setSheetState(sheet, "visible");
    expect(sheet.state).toBeUndefined();
    expect(getSheetState(sheet)).toBe("visible");
  });

  it("多次切换状态正确", () => {
    const sheet = new Sheet();
    setSheetState(sheet, "veryHidden");
    setSheetState(sheet, "hidden");
    expect(getSheetState(sheet)).toBe("hidden");
    setSheetState(sheet, "visible");
    expect(getSheetState(sheet)).toBe("visible");
  });
});

// ─── setActiveSheet / getActiveSheet ─────────────────────────────────────────

describe("setActiveSheet / getActiveSheet", () => {
  it("空 workbook 上 getActiveSheet 返回 0", () => {
    const wb = new Workbook();
    expect(getActiveSheet(wb)).toBe(0);
  });

  it("setActiveSheet 自动创建 bookViews / workbookView", () => {
    const wb = new Workbook();
    setActiveSheet(wb, 2);
    const bookViews = wb.firstChild(BookViews);
    expect(bookViews).toBeDefined();
    const view = bookViews?.firstChild(WorkbookView);
    expect(view).toBeDefined();
    expect(view?.activeTab?.toString()).toBe("2");
  });

  it("getActiveSheet 读回 set 的索引", () => {
    const wb = new Workbook();
    setActiveSheet(wb, 3);
    expect(getActiveSheet(wb)).toBe(3);
  });

  it("setActiveSheet(0) → activeTab=0", () => {
    const wb = new Workbook();
    setActiveSheet(wb, 0);
    expect(getActiveSheet(wb)).toBe(0);
  });

  it("负数索引抛 RangeError", () => {
    const wb = new Workbook();
    expect(() => setActiveSheet(wb, -1)).toThrow(RangeError);
  });

  it("非整数索引抛 RangeError", () => {
    const wb = new Workbook();
    expect(() => setActiveSheet(wb, 1.5)).toThrow(RangeError);
  });

  it("多次 set 覆盖旧值", () => {
    const wb = new Workbook();
    setActiveSheet(wb, 1);
    setActiveSheet(wb, 4);
    expect(getActiveSheet(wb)).toBe(4);
  });
});

// ─── setWorksheetTabColor / getWorksheetTabColor / clearWorksheetTabColor ────

describe("Worksheet 标签颜色", () => {
  it("空 worksheet 上 getWorksheetTabColor 返回 undefined", () => {
    const ws = new Worksheet();
    expect(getWorksheetTabColor(ws)).toBeUndefined();
  });

  it("setWorksheetTabColor 自动创建 sheetPr + tabColor", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FFFF0000");
    const sheetPr = ws.firstChild(SheetProperties);
    expect(sheetPr).toBeDefined();
    const tabColor = sheetPr?.firstChild(TabColor);
    expect(tabColor).toBeDefined();
    expect(tabColor?.rgb?.toString()).toBe("FFFF0000");
  });

  it("getWorksheetTabColor 读回设置的颜色", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FF00FF00");
    expect(getWorksheetTabColor(ws)).toBe("FF00FF00");
  });

  it("6 位 RGB 自动补 FF 前缀", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FF0000");
    expect(getWorksheetTabColor(ws)).toBe("FFFF0000");
  });

  it("小写十六进制转大写", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "ff0000ff");
    expect(getWorksheetTabColor(ws)).toBe("FF0000FF");
  });

  it("无效颜色字符串抛 RangeError", () => {
    const ws = new Worksheet();
    expect(() => setWorksheetTabColor(ws, "ZZZ")).toThrow(RangeError);
  });

  it("clearWorksheetTabColor 移除 tabColor", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FFFF0000");
    clearWorksheetTabColor(ws);
    expect(getWorksheetTabColor(ws)).toBeUndefined();
    // 空 sheetPr 也被移除
    expect(ws.firstChild(SheetProperties)).toBeUndefined();
  });

  it("clearWorksheetTabColor 在无颜色时静默", () => {
    const ws = new Worksheet();
    expect(() => clearWorksheetTabColor(ws)).not.toThrow();
  });

  it("覆盖颜色：第二次 set 替换 rgb 值", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FFFF0000");
    setWorksheetTabColor(ws, "FF0000FF");
    expect(getWorksheetTabColor(ws)).toBe("FF0000FF");
    // 只有一个 tabColor
    const sheetPr = ws.firstChild(SheetProperties);
    let count = 0;
    for (const child of sheetPr!.children) {
      if (child instanceof TabColor) count += 1;
    }
    expect(count).toBe(1);
  });

  it("sheetPr 有属性时 clear 不删除 sheetPr", () => {
    const ws = new Worksheet();
    setWorksheetTabColor(ws, "FFFF0000");
    // 手动给 sheetPr 加属性，模拟有其他用途
    const sheetPr = ws.firstChild(SheetProperties)!;
    sheetPr.codeName = { toString: () => "Sheet1" } as never;
    clearWorksheetTabColor(ws);
    // tabColor 被移除，但 sheetPr 保留
    expect(ws.firstChild(SheetProperties)).toBeDefined();
    expect(getWorksheetTabColor(ws)).toBeUndefined();
  });
});

// ─── Round-trip 通过 SpreadsheetDocument ─────────────────────────────────────

describe("round-trip via SpreadsheetDocument", () => {
  it("Sheet state round-trip：hidden → 保存再读回 → hidden", async () => {
    const doc = SpreadsheetDocument.create();
    const workbook = doc.workbookPart!.workbook;
    const sheets = workbook.firstChild(
      (await import("../../src/excel/generated/sheets.js")).Sheets,
    );
    let firstSheet: Sheet | undefined;
    if (sheets) {
      for (const child of sheets.children) {
        if (child instanceof Sheet) {
          firstSheet = child;
          break;
        }
      }
    }
    if (firstSheet === undefined) throw new Error("no Sheet found");
    setSheetState(firstSheet, "hidden");
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWorkbook = reopened.workbookPart!.workbook;
    const reSheets = reWorkbook.firstChild(
      (await import("../../src/excel/generated/sheets.js")).Sheets,
    );
    let reSheet: Sheet | undefined;
    if (reSheets) {
      for (const child of reSheets.children) {
        if (child instanceof Sheet) {
          reSheet = child;
          break;
        }
      }
    }
    expect(reSheet).toBeDefined();
    expect(getSheetState(reSheet!)).toBe("hidden");
  });

  it("activeTab round-trip：set 2 → 保存再读回 → 2", async () => {
    const doc = SpreadsheetDocument.create();
    setActiveSheet(doc.workbookPart!.workbook, 2);
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    expect(getActiveSheet(reopened.workbookPart!.workbook)).toBe(2);
  });

  it("tabColor round-trip：set FFFF0000 → 保存再读回 → FFFF0000", async () => {
    const doc = SpreadsheetDocument.create();
    const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
    setWorksheetTabColor(ws, "FFFF0000");
    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reWs = reopened.workbookPart!.worksheetParts[0]!.worksheet;
    expect(getWorksheetTabColor(reWs)).toBe("FFFF0000");
  });
});
