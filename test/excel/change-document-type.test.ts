/**
 * Epic-96：SpreadsheetDocument.changeDocumentType 端到端测试。
 */

import { describe, expect, it } from "vitest";
import { SpreadsheetDocument, SpreadsheetDocumentType } from "../../src/excel/index.js";

describe("SpreadsheetDocument · changeDocumentType", () => {
  it("新建文档默认 documentType 为 Workbook（.xlsx）", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.documentType).toBe(SpreadsheetDocumentType.Workbook);
  });

  it("changeDocumentType(Template) → documentType 变为 Template", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.Template);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.Template);
  });

  it("changeDocumentType(MacroEnabledWorkbook) → documentType 变为 MacroEnabledWorkbook", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.MacroEnabledWorkbook);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.MacroEnabledWorkbook);
  });

  it("changeDocumentType(MacroEnabledTemplate) → documentType 变为 MacroEnabledTemplate", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.MacroEnabledTemplate);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.MacroEnabledTemplate);
  });

  it("changeDocumentType(AddIn) → documentType 变为 AddIn", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.AddIn);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.AddIn);
  });

  it("changeDocumentType 相同类型是 no-op（不抛错，类型不变）", () => {
    const doc = SpreadsheetDocument.create();
    expect(() => doc.changeDocumentType(SpreadsheetDocumentType.Workbook)).not.toThrow();
    expect(doc.documentType).toBe(SpreadsheetDocumentType.Workbook);
  });

  it("Workbook → Template → Workbook 可反复切换", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.Template);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.Template);
    doc.changeDocumentType(SpreadsheetDocumentType.Workbook);
    expect(doc.documentType).toBe(SpreadsheetDocumentType.Workbook);
  });

  it("changeDocumentType → saveAsBytesAsync → reopen → documentType 一致", async () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.Template);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await SpreadsheetDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(SpreadsheetDocumentType.Template);
    await doc2.dispose();
  });

  it("AddIn → 保存再打开 → documentType 持久化", async () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.AddIn);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await SpreadsheetDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(SpreadsheetDocumentType.AddIn);
    await doc2.dispose();
  });

  it("changeDocumentType 不破坏工作簿 Part 的可访问性", () => {
    const doc = SpreadsheetDocument.create();
    doc.changeDocumentType(SpreadsheetDocumentType.Template);
    expect(doc.workbookPart).toBeDefined();
    expect(doc.workbookPart?.workbook).toBeDefined();
  });
});
