/**
 * Epic-25：Excel Cell.formula / Cell.cachedValue 访问器单元测试。
 */

import { describe, expect, it } from "vitest";
import { Cell, CellFormula, CellValue, SpreadsheetDocument } from "../../src/excel/index.js";

describe("Cell.formula getter / setter（Epic-25）", () => {
  it("空 Cell 返 undefined", () => {
    expect(new Cell().formula).toBeUndefined();
  });

  it("set + get 文本一致", () => {
    const c = new Cell();
    c.formula = "SUM(A1:A10)";
    expect(c.formula).toBe("SUM(A1:A10)");
    expect(c.firstChild(CellFormula)?.text).toBe("SUM(A1:A10)");
  });

  it("set 同一 cell 两次：覆盖 + 不重复 child", () => {
    const c = new Cell();
    c.formula = "A1+1";
    c.formula = "B1*2";
    expect(c.formula).toBe("B1*2");
    expect([...c.descendants(CellFormula)]).toHaveLength(1);
  });

  it("set undefined 删除 <f>", () => {
    const c = new Cell();
    c.formula = "=A1";
    c.formula = undefined;
    expect(c.formula).toBeUndefined();
    expect(c.firstChild(CellFormula)).toBeUndefined();
  });

  it("setter 标 dirty（用户主动改 → CalcChain 失效）", () => {
    const c = new Cell();
    c.formula = "A1";
    expect(c.isDirty).toBe(true);
  });
});

describe("Cell.cachedValue getter / setter（Epic-25）", () => {
  it("空 Cell 返 undefined", () => {
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
    c.cachedValue = "10";
    c.cachedValue = undefined;
    expect(c.cachedValue).toBeUndefined();
  });

  it("setter 标 dirty", () => {
    const c = new Cell();
    c.cachedValue = "100";
    expect(c.isDirty).toBe(true);
  });
});

describe("Cell.formula + cachedValue 端到端（Epic-25）", () => {
  it("save → reopen 后 formula + cachedValue 保留", async () => {
    const doc = SpreadsheetDocument.create();
    const wsp = doc.workbookPart!.worksheetParts[0]!;
    const ws = wsp.worksheet;
    // 找 sheetData 加一行一格
    const sheetData = [...ws.children].find((c) => c.localName === "sheetData") as {
      appendChild: (e: unknown) => void;
    };
    const row = new (await import("../../src/excel/index.js")).Row();
    const cell = new Cell();
    cell.formula = "1+2";
    cell.cachedValue = "3";
    row.appendChild(cell);
    sheetData.appendChild(row);

    const out = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(out);
    const reWsp = reopened.workbookPart!.worksheetParts[0]!;
    const reCell = [...reWsp.worksheet.descendants(Cell)][0];
    expect(reCell?.formula).toBe("1+2");
    expect(reCell?.cachedValue).toBe("3");
  });
});
