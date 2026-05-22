/**
 * Epic-96：PresentationDocument.changeDocumentType 端到端测试。
 */

import { describe, expect, it } from "vitest";
import { PresentationDocument, PresentationDocumentType } from "../../src/ppt/index.js";

describe("PresentationDocument · changeDocumentType", () => {
  it("新建文档默认 documentType 为 Presentation（.pptx）", () => {
    const doc = PresentationDocument.create();
    expect(doc.documentType).toBe(PresentationDocumentType.Presentation);
  });

  it("changeDocumentType(Template) → documentType 变为 Template", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Template);
    expect(doc.documentType).toBe(PresentationDocumentType.Template);
  });

  it("changeDocumentType(Slideshow) → documentType 变为 Slideshow", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Slideshow);
    expect(doc.documentType).toBe(PresentationDocumentType.Slideshow);
  });

  it("changeDocumentType(MacroEnabledPresentation) → documentType 变为 MacroEnabledPresentation", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.MacroEnabledPresentation);
    expect(doc.documentType).toBe(PresentationDocumentType.MacroEnabledPresentation);
  });

  it("changeDocumentType(MacroEnabledTemplate) → documentType 变为 MacroEnabledTemplate", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.MacroEnabledTemplate);
    expect(doc.documentType).toBe(PresentationDocumentType.MacroEnabledTemplate);
  });

  it("changeDocumentType(MacroEnabledSlideshow) → documentType 变为 MacroEnabledSlideshow", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.MacroEnabledSlideshow);
    expect(doc.documentType).toBe(PresentationDocumentType.MacroEnabledSlideshow);
  });

  it("changeDocumentType(AddIn) → documentType 变为 AddIn", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.AddIn);
    expect(doc.documentType).toBe(PresentationDocumentType.AddIn);
  });

  it("changeDocumentType 相同类型是 no-op（不抛错，类型不变）", () => {
    const doc = PresentationDocument.create();
    expect(() => doc.changeDocumentType(PresentationDocumentType.Presentation)).not.toThrow();
    expect(doc.documentType).toBe(PresentationDocumentType.Presentation);
  });

  it("Presentation → Template → Presentation 可反复切换", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Template);
    expect(doc.documentType).toBe(PresentationDocumentType.Template);
    doc.changeDocumentType(PresentationDocumentType.Presentation);
    expect(doc.documentType).toBe(PresentationDocumentType.Presentation);
  });

  it("changeDocumentType → saveAsBytesAsync → reopen → documentType 一致", async () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Template);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await PresentationDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(PresentationDocumentType.Template);
    await doc2.dispose();
  });

  it("Slideshow → 保存再打开 → documentType 持久化", async () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Slideshow);
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await PresentationDocument.openAsync(bytes);
    expect(doc2.documentType).toBe(PresentationDocumentType.Slideshow);
    await doc2.dispose();
  });

  it("changeDocumentType 不破坏演示 Part 的可访问性", () => {
    const doc = PresentationDocument.create();
    doc.changeDocumentType(PresentationDocumentType.Template);
    expect(doc.presentationPart).toBeDefined();
    expect(doc.presentationPart?.presentation).toBeDefined();
  });
});
