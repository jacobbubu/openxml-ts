/**
 * Epic-23：Word 表格 mergeDocumentTableCells 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  TableCell,
  TableRow,
  WordprocessingDocument,
  createDocumentTable,
  getDocumentTableCellText,
  mergeDocumentTableCells,
  setDocumentTableCellText,
} from "../../src/word/index.js";

describe("mergeDocumentTableCells（Epic-23）", () => {
  it("水平合并 2 格：主格写 gridSpan=2，第二格被删除（行只剩 1 个 cell）", () => {
    const table = createDocumentTable(2, 3);
    mergeDocumentTableCells(table, 0, 0, 0, 1);
    // 第一行只剩 2 个 cell（[0,0] 合并 [0,1]，剩主格 + [0,2]）
    const firstRow = [...table.children].find((c) => c instanceof TableRow) as TableRow;
    expect([...firstRow.children].filter((c) => c instanceof TableCell)).toHaveLength(2);
    const xml = serialize(table);
    expect(xml).toContain('<w:gridSpan w:val="2"');
  });

  it("垂直合并 2 格：主格 vMerge=restart，第二格 vMerge 无 val（continue）", () => {
    const table = createDocumentTable(3, 2);
    mergeDocumentTableCells(table, 0, 0, 1, 0);
    const xml = serialize(table);
    expect(xml).toContain('<w:vMerge w:val="restart"');
    expect(xml).toMatch(/<w:vMerge\/>/);
  });

  it("2×2 矩形合并：主格 gridSpan=2 + vMerge=restart；后续行主列 gridSpan=2 + vMerge（continue）；非主列 cell 删除", () => {
    const table = createDocumentTable(3, 3);
    mergeDocumentTableCells(table, 0, 0, 1, 1);
    // 第 0 行：3 列 - 1 个被删 = 2 个 cell
    const rows = [...table.children].filter((c) => c instanceof TableRow) as TableRow[];
    expect([...rows[0].children].filter((c) => c instanceof TableCell)).toHaveLength(2);
    // 第 1 行：3 列 - 1 个被删 = 2 个 cell
    expect([...rows[1].children].filter((c) => c instanceof TableCell)).toHaveLength(2);
    // 第 2 行：3 个 cell 保持
    expect([...rows[2].children].filter((c) => c instanceof TableCell)).toHaveLength(3);

    const xml = serialize(table);
    expect((xml.match(/<w:gridSpan w:val="2"/g) ?? []).length).toBe(2);
    expect(xml).toContain('<w:vMerge w:val="restart"');
    expect(xml).toMatch(/<w:vMerge\/>/);
  });

  it("主格保留文本", () => {
    const table = createDocumentTable(2, 3);
    setDocumentTableCellText(table, 0, 0, "Header (spans 3)");
    mergeDocumentTableCells(table, 0, 0, 0, 2);
    expect(getDocumentTableCellText(table, 0, 0)).toBe("Header (spans 3)");
  });

  it("1×1 合并是 no-op", () => {
    const table = createDocumentTable(2, 2);
    const before = serialize(table);
    mergeDocumentTableCells(table, 0, 0, 0, 0);
    const after = serialize(table);
    expect(after).toBe(before);
  });

  it("范围反向抛 friendly 错", () => {
    const table = createDocumentTable(3, 3);
    expect(() => mergeDocumentTableCells(table, 1, 1, 0, 0)).toThrow(OpenXmlPackageError);
    expect(() => mergeDocumentTableCells(table, 1, 1, 0, 0)).toThrow(/range reversed/);
  });

  it("行越界抛 friendly 错", () => {
    const table = createDocumentTable(2, 2);
    expect(() => mergeDocumentTableCells(table, 0, 0, 5, 1)).toThrow(/out of range/);
  });

  it("负数下标抛 friendly 错", () => {
    const table = createDocumentTable(2, 2);
    expect(() => mergeDocumentTableCells(table, -1, 0, 0, 0)).toThrow(/row\/col must be ≥ 0/);
  });
});

describe("端到端：合并 + save + reopen 保留合并信息", () => {
  it("水平合并 + save → reopen 后 gridSpan 仍在 + 被删 cell 不回归", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const table = createDocumentTable(2, 3);
    setDocumentTableCellText(table, 0, 0, "Header (spans 3)");
    mergeDocumentTableCells(table, 0, 0, 0, 2);
    (body as { appendChild: (e: unknown) => void }).appendChild(table);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const xml = serialize(reopened.mainDocumentPart!.document);
    expect(xml).toContain('<w:gridSpan w:val="3"');
    expect(xml).toContain("Header (spans 3)");
  });
});
