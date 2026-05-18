/**
 * Story-3.6 验证：CalcChain 自动失效 + Cell dirty tracking。
 *
 * 覆盖（per Architecture §0 / ADR-019）：
 * - Cell.appendChild(CellValue) → isDirty = true
 * - Cell.appendChild(CellFormula) → isDirty = true
 * - Cell.appendChild(其它无关 child) → isDirty 保持 false
 * - Cell.remove(CellValue) → isDirty = true
 * - 含 CalcChain 的 xlsx 修改 Cell 后 saveAsBytes → reopen 后无 CalcChainPart
 * - 含 CalcChain 的 xlsx 仅访问不改 → reopen 后 CalcChainPart 仍存在
 */

import { describe, expect, it } from "vitest";
import { clearCellDirty } from "../../src/excel/extensions/cell-extensions.js";
import {
  CalculationChainPart,
  Cell,
  CellFormula,
  CellValue,
  InlineString,
  Row,
  SheetData,
  SpreadsheetDocument,
} from "../../src/excel/index.js";
import type { IPackage } from "../../src/packaging/index.js";

const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

function hasCalcChain(pkg: IPackage): boolean {
  for (const part of pkg.parts()) {
    if (part.contentType === CalculationChainPart.contentType) return true;
  }
  return false;
}

/**
 * Seed 一份含 CalcChainPart 的 xlsx：拿 SpreadsheetDocument.create() 作底，
 * 加 1 行 1 cell（同时 clearCellDirty 复位 seed 阶段 appendChild 副作用），
 * 再通过 OPC 接口塞一份 calcChain.xml + workbook part-level 关系。
 */
async function makeXlsxWithCalcChain(): Promise<Uint8Array> {
  const seed = SpreadsheetDocument.create();
  const wsp = seed.workbookPart?.worksheetParts[0]!;
  const sd = wsp.worksheet.firstChild(SheetData)!;
  const r = new Row();
  const c = new Cell();
  const v = new CellValue();
  v.text = "1";
  c.appendChild(v);
  clearCellDirty(c); // seed 阶段 appendChild 副作用复位
  r.appendChild(c);
  sd.appendChild(r);

  const pkg = seed.package;
  const calcChainUri = "/xl/calcChain.xml" as never;
  const ccPart = pkg.createPart(calcChainUri, CalculationChainPart.contentType);
  await ccPart.writeAsync(`<x:calcChain xmlns:x="${XNS}"><x:c r="A1" i="1"/></x:calcChain>`);
  const wbPart = seed.workbookPart?.part;
  wbPart.relationships.create({
    type: CalculationChainPart.relationshipType,
    target: "calcChain.xml",
    targetMode: "internal",
  });

  return seed.saveAsBytesAsync();
}

describe("Cell · dirty tracking", () => {
  it("新 Cell 默认 isDirty=false", () => {
    expect(new Cell().isDirty).toBe(false);
  });

  it("appendChild(CellValue) → isDirty=true", () => {
    const c = new Cell();
    c.appendChild(new CellValue());
    expect(c.isDirty).toBe(true);
  });

  it("appendChild(CellFormula) → isDirty=true", () => {
    const c = new Cell();
    c.appendChild(new CellFormula());
    expect(c.isDirty).toBe(true);
  });

  it("appendChild(无关 child) 不影响 dirty", () => {
    const c = new Cell();
    // InlineString 不是 CellValue/CellFormula，但作为 cell 子也合法
    c.appendChild(new InlineString());
    expect(c.isDirty).toBe(false);
  });

  it("remove(CellValue) → isDirty=true", () => {
    const c = new Cell();
    const v = new CellValue();
    c.appendChild(v);
    // appendChild 已置 dirty；先复位再验证 remove 自身效果
    clearCellDirty(c);
    expect(c.isDirty).toBe(false);
    c.remove(v);
    expect(c.isDirty).toBe(true);
  });
});

describe("SpreadsheetDocument · CalcChain 自动失效", () => {
  it("修改 Cell.cellValue → save → reopen → CalcChainPart 消失", async () => {
    const xlsxBytes = await makeXlsxWithCalcChain();
    // 先确认 seed 出来确实含 CalcChain
    {
      const probe = await SpreadsheetDocument.openAsync(xlsxBytes);
      expect(hasCalcChain(probe.package)).toBe(true);
    }

    // 真正流程：open → 改 cell → save → reopen → 不应再有 CalcChainPart
    const doc = await SpreadsheetDocument.openAsync(xlsxBytes);
    const cell = doc.workbookPart?.worksheetParts[0]?.worksheet
      .firstChild(SheetData)
      ?.firstChild(Row)
      ?.firstChild(Cell)!;
    cell.appendChild(new CellValue()); // 触发 dirty
    const out = await doc.saveAsBytesAsync();

    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(hasCalcChain(reopened.package)).toBe(false);
    expect(reopened.calculationChainPart).toBeUndefined();
  });

  it("仅访问不修改 → save → reopen → CalcChainPart 仍存在", async () => {
    const xlsxBytes = await makeXlsxWithCalcChain();
    const doc = await SpreadsheetDocument.openAsync(xlsxBytes);

    // 仅读取，不修改任何 Cell
    const cell = doc.workbookPart?.worksheetParts[0]?.worksheet
      .firstChild(SheetData)
      ?.firstChild(Row)
      ?.firstChild(Cell)!;
    void cell.firstChild(CellValue)?.text;

    const out = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(hasCalcChain(reopened.package)).toBe(true);
  });

  it("flush 后 dirty 标志被复位", async () => {
    const xlsxBytes = await makeXlsxWithCalcChain();
    const doc = await SpreadsheetDocument.openAsync(xlsxBytes);
    const cell = doc.workbookPart?.worksheetParts[0]?.worksheet
      .firstChild(SheetData)
      ?.firstChild(Row)
      ?.firstChild(Cell)!;
    cell.appendChild(new CellValue());
    expect(cell.isDirty).toBe(true);
    await doc.saveAsBytesAsync();
    expect(cell.isDirty).toBe(false);
  });
});
