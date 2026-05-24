/**
 * Epic-123：CreateFromTemplate (.dotx/.xltx/.potx) 模板创建
 *
 * 端口来源：
 *   /Users/rongshen/github/Open-XML-SDK/test/DocumentFormat.OpenXml.Tests/CreateFromTemplateTests.cs
 *
 * .NET 测试：
 *   - CanCreateWordprocessingDocumentFromTemplate
 *   - CanCreateSpreadsheetFromTemplate
 *   - CanCreatePresentationFromTemplate
 *
 * TS 适配：
 *   - path-based API → Uint8Array bytes-based API
 *   - Clone() → saveAsBytesAsync() (openxml-ts 无 Clone API)
 *   - 额外断言：创建后 documentType 是 document-type 而非 template-type
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { SpreadsheetDocument, SpreadsheetDocumentType } from "../../src/excel/index.js";
import { PresentationDocument, PresentationDocumentType } from "../../src/ppt/index.js";
import { WordprocessingDocument, WordprocessingDocumentType } from "../../src/word/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(__dirname, "../fixtures/templates");

describe("CreateFromTemplate", () => {
  // ─── CanCreateWordprocessingDocumentFromTemplate ────────────────────────────

  it("CanCreateWordprocessingDocumentFromTemplate: creates document from .dotx template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Document.dotx"));
    await using doc = await WordprocessingDocument.createFromTemplate(
      new Uint8Array(templateBytes),
    );

    // Access main document part and document root (mirrors .NET part + root access)
    const part = doc.mainDocumentPart;
    expect(part).toBeDefined();
    const _root = part!.document;

    // We are fine if we have not run into an exception.
    // (mirrors .NET: Assert.True(true))
    expect(true).toBe(true);
  });

  it("createFromTemplate word: document type is Document, not Template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Document.dotx"));
    await using doc = await WordprocessingDocument.createFromTemplate(
      new Uint8Array(templateBytes),
    );

    expect(doc.documentType).toBe(WordprocessingDocumentType.Document);
  });

  it("createFromTemplate word: can be serialized as valid docx bytes", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Document.dotx"));
    await using doc = await WordprocessingDocument.createFromTemplate(
      new Uint8Array(templateBytes),
    );

    const bytes = await doc.saveAsBytesAsync();
    // Re-open and verify it's a valid Word document with Document type
    await using reopened = await WordprocessingDocument.openAsync(bytes);
    expect(reopened.documentType).toBe(WordprocessingDocumentType.Document);
    expect(reopened.mainDocumentPart).toBeDefined();
  });

  // ─── CanCreateSpreadsheetFromTemplate ───────────────────────────────────────

  it("CanCreateSpreadsheetFromTemplate: creates workbook from .xltx template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Spreadsheet.xltx"));
    await using doc = await SpreadsheetDocument.createFromTemplate(new Uint8Array(templateBytes));

    // Access workbook part and workbook root (mirrors .NET part + root access)
    const part = doc.workbookPart;
    expect(part).toBeDefined();
    const _root = part!.workbook;

    // We are fine if we have not run into an exception.
    expect(true).toBe(true);
  });

  it("createFromTemplate excel: document type is Workbook, not Template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Spreadsheet.xltx"));
    await using doc = await SpreadsheetDocument.createFromTemplate(new Uint8Array(templateBytes));

    expect(doc.documentType).toBe(SpreadsheetDocumentType.Workbook);
  });

  it("createFromTemplate excel: can be serialized as valid xlsx bytes", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Spreadsheet.xltx"));
    await using doc = await SpreadsheetDocument.createFromTemplate(new Uint8Array(templateBytes));

    const bytes = await doc.saveAsBytesAsync();
    // Re-open and verify it's a valid Excel workbook with Workbook type
    await using reopened = await SpreadsheetDocument.openAsync(bytes);
    expect(reopened.documentType).toBe(SpreadsheetDocumentType.Workbook);
    expect(reopened.workbookPart).toBeDefined();
  });

  // ─── CanCreatePresentationFromTemplate ─────────────────────────────────────

  it("CanCreatePresentationFromTemplate: creates presentation from .potx template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Presentation.potx"));
    await using doc = await PresentationDocument.createFromTemplate(new Uint8Array(templateBytes));

    // Access presentation part and presentation root (mirrors .NET part + root access)
    const part = doc.presentationPart;
    expect(part).toBeDefined();
    const _root = part!.presentation;

    // We are fine if we have not run into an exception.
    expect(true).toBe(true);
  });

  it("createFromTemplate ppt: document type is Presentation, not Template", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Presentation.potx"));
    await using doc = await PresentationDocument.createFromTemplate(new Uint8Array(templateBytes));

    expect(doc.documentType).toBe(PresentationDocumentType.Presentation);
  });

  it("createFromTemplate ppt: can be serialized as valid pptx bytes", async () => {
    const templateBytes = await readFile(join(FIXTURES, "Presentation.potx"));
    await using doc = await PresentationDocument.createFromTemplate(new Uint8Array(templateBytes));

    const bytes = await doc.saveAsBytesAsync();
    // Re-open and verify it's a valid Presentation with Presentation type
    await using reopened = await PresentationDocument.openAsync(bytes);
    expect(reopened.documentType).toBe(PresentationDocumentType.Presentation);
    expect(reopened.presentationPart).toBeDefined();
  });
});
