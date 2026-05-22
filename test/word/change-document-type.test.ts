/**
 * Epic-96：WordprocessingDocument.changeDocumentType 端到端测试。
 */

import { describe, expect, it } from "vitest";
import { WordprocessingDocument, WordprocessingDocumentType } from "../../src/word/index.js";

describe("WordprocessingDocument · changeDocumentType", () => {
  it("新建文档默认 documentType 为 Document（.docx）", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.documentType).toBe(WordprocessingDocumentType.Document);
  });

  it("changeDocumentType(Template) → documentType 变为 Template", () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.Template);
    expect(doc.documentType).toBe(WordprocessingDocumentType.Template);
  });

  it("changeDocumentType(MacroEnabledDocument) → documentType 变为 MacroEnabledDocument", () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.MacroEnabledDocument);
    expect(doc.documentType).toBe(WordprocessingDocumentType.MacroEnabledDocument);
  });

  it("changeDocumentType(MacroEnabledTemplate) → documentType 变为 MacroEnabledTemplate", () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.MacroEnabledTemplate);
    expect(doc.documentType).toBe(WordprocessingDocumentType.MacroEnabledTemplate);
  });

  it("changeDocumentType 相同类型是 no-op（不抛错，类型不变）", () => {
    const doc = WordprocessingDocument.create();
    expect(() => doc.changeDocumentType(WordprocessingDocumentType.Document)).not.toThrow();
    expect(doc.documentType).toBe(WordprocessingDocumentType.Document);
  });

  it("Document → Template → Document 可反复切换", () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.Template);
    expect(doc.documentType).toBe(WordprocessingDocumentType.Template);
    doc.changeDocumentType(WordprocessingDocumentType.Document);
    expect(doc.documentType).toBe(WordprocessingDocumentType.Document);
  });

  it("changeDocumentType → saveAsBytesAsync → reopen → documentType 一致", async () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.Template);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await WordprocessingDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(WordprocessingDocumentType.Template);
    await doc2.dispose();
  });

  it("MacroEnabledDocument → 保存再打开 → documentType 持久化", async () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.MacroEnabledDocument);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await WordprocessingDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(WordprocessingDocumentType.MacroEnabledDocument);
    await doc2.dispose();
  });

  it("changeDocumentType 不破坏主文档 Part 的可访问性", () => {
    const doc = WordprocessingDocument.create();
    doc.changeDocumentType(WordprocessingDocumentType.Template);
    expect(doc.mainDocumentPart).toBeDefined();
    expect(doc.mainDocumentPart?.document).toBeDefined();
  });

  it("changeDocumentType 不破坏包级关系数量", () => {
    const doc = WordprocessingDocument.create();
    const relsBefore = [...doc.package.relationships].length;
    doc.changeDocumentType(WordprocessingDocumentType.Template);
    const relsAfter = [...doc.package.relationships].length;
    expect(relsAfter).toBe(relsBefore);
  });
});
