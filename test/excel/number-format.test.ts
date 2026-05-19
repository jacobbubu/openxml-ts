/**
 * Epic-44：Excel 内建数字格式 helper 单测。
 */

import { describe, expect, it } from "vitest";
import { StringValue, UInt32Value } from "../../src/element/index.js";
import {
  BuiltInNumberFormat,
  Cell,
  CellFormat,
  CellFormats,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  setBuiltInNumberFormat,
} from "../../src/excel/index.js";

function addCell(doc: SpreadsheetDocument, ref: string, raw: string): Cell {
  const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
  let sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) {
    sheetData = new SheetData();
    ws.appendChild(sheetData);
  }
  const row = new Row();
  row.rowIndex = UInt32Value.parse(ref.replace(/^[A-Z]+/, ""));
  const cell = new Cell();
  cell.cellReference = StringValue.parse(ref);
  const v = new CellValue();
  v.text = raw;
  cell.appendChild(v);
  row.appendChild(cell);
  sheetData.appendChild(row);
  return cell;
}

describe("setBuiltInNumberFormat", () => {
  it("set 整数格式 → cell.styleIndex 指向新 xf", () => {
    const doc = SpreadsheetDocument.create();
    const cell = addCell(doc, "A1", "42");
    const idx = setBuiltInNumberFormat(doc, cell, BuiltInNumberFormat.INTEGER);
    expect(cell.styleIndex?.toString()).toBe(String(idx));
    expect(idx).toBeGreaterThan(0); // 默认 xf 在 index 0
  });

  it("两次相同 builtInId → 复用同一 xf", () => {
    const doc = SpreadsheetDocument.create();
    const c1 = addCell(doc, "A1", "1");
    const c2 = addCell(doc, "B1", "2");
    const i1 = setBuiltInNumberFormat(doc, c1, BuiltInNumberFormat.PERCENT_DECIMAL_2);
    const i2 = setBuiltInNumberFormat(doc, c2, BuiltInNumberFormat.PERCENT_DECIMAL_2);
    expect(i1).toBe(i2);
  });

  it("不同 builtInId → 不同 xf index", () => {
    const doc = SpreadsheetDocument.create();
    const c1 = addCell(doc, "A1", "1");
    const c2 = addCell(doc, "B1", "2");
    const i1 = setBuiltInNumberFormat(doc, c1, BuiltInNumberFormat.CURRENCY);
    const i2 = setBuiltInNumberFormat(doc, c2, BuiltInNumberFormat.DATE_SHORT);
    expect(i1).not.toBe(i2);
  });

  it("非法 ID 抛 RangeError", () => {
    const doc = SpreadsheetDocument.create();
    const cell = addCell(doc, "A1", "0");
    expect(() => setBuiltInNumberFormat(doc, cell, -1)).toThrow(RangeError);
    expect(() => setBuiltInNumberFormat(doc, cell, 500)).toThrow(RangeError);
  });

  it("新增 xf 后 CellFormats count attribute 更新", () => {
    const doc = SpreadsheetDocument.create();
    const cell = addCell(doc, "A1", "0");
    setBuiltInNumberFormat(doc, cell, BuiltInNumberFormat.PERCENT_INT);
    const cellFormats = doc.workbookStylesPart!.stylesheet!.firstChild(CellFormats)!;
    let count = 0;
    for (const c of cellFormats.children) if (c instanceof CellFormat) count += 1;
    expect(cellFormats.extendedAttributes.get("count")).toBe(String(count));
  });

  it("round-trip：save → reopen 后 styleIndex / numFmtId 保留", async () => {
    const doc = SpreadsheetDocument.create();
    const cell = addCell(doc, "A1", "0.99");
    setBuiltInNumberFormat(doc, cell, BuiltInNumberFormat.DECIMAL_2);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(bytes);
    const reCell = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)][0];
    expect(reCell?.styleIndex?.toString()).not.toBe("0");

    // 通过 styleIndex 找到对应 xf，应有 numFmtId=2
    const xfIndex = Number.parseInt(reCell!.styleIndex!.toString(), 10);
    const cellFormats = reopened.workbookStylesPart!.stylesheet!.firstChild(CellFormats)!;
    const xfs: CellFormat[] = [];
    for (const c of cellFormats.children) if (c instanceof CellFormat) xfs.push(c);
    expect(xfs[xfIndex]?.numberFormatId?.toString()).toBe("2");
  });
});
