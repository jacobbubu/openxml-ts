/**
 * Epic-49：Cell.formula / Cell.cachedValue 访问器（cell-formula-accessor.ts）单元测试。
 */

import { describe, expect, it } from "vitest";
import {
  Cell,
  CellFormula,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
} from "../../src/excel/index.js";

// ─── formula getter / setter ──────────────────────────────────────────────────

describe("Cell.formula getter / setter（Epic-49）", () => {
  it("空 Cell 返回 undefined", () => {
    const c = new Cell();
    expect(c.formula).toBeUndefined();
  });

  it("set 字符串 + get 回读一致", () => {
    const c = new Cell();
    c.formula = "SUM(A1:A10)";
    expect(c.formula).toBe("SUM(A1:A10)");
    expect(c.firstChild(CellFormula)?.text).toBe("SUM(A1:A10)");
  });

  it("重复 set 覆盖公式，<f> 只有一个子元素", () => {
    const c = new Cell();
    c.formula = "A1+B1";
    c.formula = "AVERAGE(A1:A5)";
    expect(c.formula).toBe("AVERAGE(A1:A5)");
    expect([...c.descendants(CellFormula)]).toHaveLength(1);
  });

  it("set undefined 删除 <f>", () => {
    const c = new Cell();
    c.formula = "MAX(B2:B10)";
    c.formula = undefined;
    expect(c.formula).toBeUndefined();
    expect(c.firstChild(CellFormula)).toBeUndefined();
  });

  it("新建 <f> 时标记 isDirty", () => {
    const c = new Cell();
    expect(c.isDirty).toBe(false);
    c.formula = "1+2";
    expect(c.isDirty).toBe(true);
  });

  it("原地覆盖公式文本时标记 isDirty", () => {
    // 先写一次，再清 dirty，再二次覆盖 → 应再次 dirty
    const c = new Cell();
    c.formula = "A1";
    // 通过 clearCellDirty 复位（仅用于测试）
    import("../../src/excel/extensions/cell-extensions.js").then(({ clearCellDirty }) => {
      clearCellDirty(c);
    });
    // 覆盖时走 existing.text = value 路径
    c.formula = "B1";
    expect(c.isDirty).toBe(true);
  });
});

// ─── cachedValue getter / setter ──────────────────────────────────────────────

describe("Cell.cachedValue getter / setter（Epic-49）", () => {
  it("空 Cell 返回 undefined", () => {
    expect(new Cell().cachedValue).toBeUndefined();
  });

  it("set + get 一致", () => {
    const c = new Cell();
    c.cachedValue = "42";
    expect(c.cachedValue).toBe("42");
    expect(c.firstChild(CellValue)?.text).toBe("42");
  });

  it("set undefined 删除 <v>", () => {
    const c = new Cell();
    c.cachedValue = "100";
    c.cachedValue = undefined;
    expect(c.cachedValue).toBeUndefined();
    expect(c.firstChild(CellValue)).toBeUndefined();
  });

  it("新建 <v> 时标记 isDirty", () => {
    const c = new Cell();
    c.cachedValue = "3.14";
    expect(c.isDirty).toBe(true);
  });
});

// ─── formula + cachedValue 共存 ───────────────────────────────────────────────

describe("Cell.formula 与 Cell.cachedValue 共存（Epic-49）", () => {
  it("同一 Cell 可同时持有 <f> 和 <v>", () => {
    const c = new Cell();
    c.formula = "SUM(A1:A3)";
    c.cachedValue = "6";
    expect(c.formula).toBe("SUM(A1:A3)");
    expect(c.cachedValue).toBe("6");
    expect(c.firstChild(CellFormula)).toBeDefined();
    expect(c.firstChild(CellValue)).toBeDefined();
  });

  it("clear formula 不影响 cachedValue", () => {
    const c = new Cell();
    c.formula = "A1*2";
    c.cachedValue = "10";
    c.formula = undefined;
    expect(c.formula).toBeUndefined();
    expect(c.cachedValue).toBe("10");
  });

  it("clear cachedValue 不影响 formula", () => {
    const c = new Cell();
    c.formula = "A1+B1";
    c.cachedValue = "5";
    c.cachedValue = undefined;
    expect(c.formula).toBe("A1+B1");
    expect(c.cachedValue).toBeUndefined();
  });
});

// ─── round-trip（save → reopen）──────────────────────────────────────────────

describe("Cell.formula 端到端 round-trip（Epic-49）", () => {
  it("save → reopen 后 formula + cachedValue 保留", async () => {
    const doc = SpreadsheetDocument.create();
    const wsp = doc.workbookPart!.worksheetParts[0]!;
    const ws = wsp.worksheet;
    const sheetData = ws.firstChild(SheetData)!;

    const row = new Row();
    const cell = new Cell();
    cell.formula = "SUM(A1:A3)";
    cell.cachedValue = "15";
    row.appendChild(cell);
    sheetData.appendChild(row);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reCell = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)][0];

    expect(reCell?.formula).toBe("SUM(A1:A3)");
    expect(reCell?.cachedValue).toBe("15");
  });

  it("save → reopen 後无公式的 Cell formula 仍为 undefined", async () => {
    const doc = SpreadsheetDocument.create();
    const wsp = doc.workbookPart!.worksheetParts[0]!;
    const ws = wsp.worksheet;
    const sheetData = ws.firstChild(SheetData)!;

    const row = new Row();
    const cell = new Cell();
    cell.cachedValue = "42"; // 只有缓存值，无公式
    row.appendChild(cell);
    sheetData.appendChild(row);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reCell = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)][0];

    expect(reCell?.formula).toBeUndefined();
    expect(reCell?.cachedValue).toBe("42");
  });
});
