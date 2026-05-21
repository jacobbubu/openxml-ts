/**
 * Epic-77：generated Part 类 smoke test。
 *
 * 验证：
 * - 各 Part 类的 `relationshipType` / `contentType` / `extension` 静态常量正确；
 * - TypedXmlPart 子类可以用 IPackagePart + registry 构造；
 * - BinaryPart 子类可以用 IPackagePart 构造；
 * - 两次 codegen 产物结构稳定（常量值不变）。
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry } from "../../src/element/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";

import { ChartsheetPart } from "../../src/parts/generated/chartsheet-part.js";
import { DiagramColorsPart } from "../../src/parts/generated/diagram-colors-part.js";
import { DocumentSettingsPart } from "../../src/parts/generated/document-settings-part.js";
import { EndnotesPart } from "../../src/parts/generated/endnotes-part.js";
import { HandoutMasterPart } from "../../src/parts/generated/handout-master-part.js";
import { PresentationPropertiesPart } from "../../src/parts/generated/presentation-properties-part.js";
import { TableDefinitionPart } from "../../src/parts/generated/table-definition-part.js";
// TypedXmlPart subclasses
import { ThemeOverridePart } from "../../src/parts/generated/theme-override-part.js";

import { AlternativeFormatImportPart } from "../../src/parts/generated/alternative-format-import-part.js";
import { EmbeddedObjectPart } from "../../src/parts/generated/embedded-object-part.js";
import { FontPart } from "../../src/parts/generated/font-part.js";
import { Model3DReferenceRelationshipPart } from "../../src/parts/generated/model3-d-reference-relationship-part.js";
import { ThumbnailPart } from "../../src/parts/generated/thumbnail-part.js";
// BinaryPart subclasses
import { VbaProjectPart } from "../../src/parts/generated/vba-project-part.js";
import { WordprocessingPrinterSettingsPart } from "../../src/parts/generated/wordprocessing-printer-settings-part.js";

// barrel re-export
import { ThemeOverridePart as ThemeOverridePartBarrel } from "../../src/parts/generated/index.js";

describe("generated Part 静态常量 — TypedXmlPart 子类（Epic-77）", () => {
  it("ThemeOverridePart — relationshipType / contentType", () => {
    expect(ThemeOverridePart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/themeOverride",
    );
    expect(ThemeOverridePart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.themeOverride+xml",
    );
  });

  it("HandoutMasterPart — relationshipType / contentType", () => {
    expect(HandoutMasterPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/handoutMaster",
    );
    expect(HandoutMasterPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.handoutMaster+xml",
    );
  });

  it("PresentationPropertiesPart — relationshipType / contentType", () => {
    expect(PresentationPropertiesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps",
    );
    expect(PresentationPropertiesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.presentationml.presProps+xml",
    );
  });

  it("DocumentSettingsPart — relationshipType / contentType", () => {
    expect(DocumentSettingsPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/settings",
    );
    expect(DocumentSettingsPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml",
    );
  });

  it("EndnotesPart — relationshipType / contentType", () => {
    expect(EndnotesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/endnotes",
    );
    expect(EndnotesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml",
    );
  });

  it("DiagramColorsPart — relationshipType / contentType", () => {
    expect(DiagramColorsPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramColors",
    );
    expect(DiagramColorsPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml",
    );
  });

  it("ChartsheetPart — relationshipType / contentType", () => {
    expect(ChartsheetPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chartsheet",
    );
    expect(ChartsheetPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml",
    );
  });

  it("TableDefinitionPart — relationshipType / contentType", () => {
    expect(TableDefinitionPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/table",
    );
    expect(TableDefinitionPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml",
    );
  });
});

describe("generated Part 静态常量 — BinaryPart 子类（Epic-77）", () => {
  it("VbaProjectPart — relationshipType / contentType / extension", () => {
    expect(VbaProjectPart.relationshipType).toBe(
      "http://schemas.microsoft.com/office/2006/relationships/vbaProject",
    );
    expect(VbaProjectPart.contentType).toBe("application/vnd.ms-office.vbaProject");
    expect(VbaProjectPart.extension).toBe(".bin");
  });

  it("AlternativeFormatImportPart — relationshipType / extension (no contentType)", () => {
    expect(AlternativeFormatImportPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk",
    );
    expect(AlternativeFormatImportPart.extension).toBe(".dat");
    expect((AlternativeFormatImportPart as { contentType?: string }).contentType).toBeUndefined();
  });

  it("ThumbnailPart — relationshipType / extension", () => {
    expect(ThumbnailPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail",
    );
    expect(ThumbnailPart.extension).toBe(".bin");
  });

  it("EmbeddedObjectPart — relationshipType / extension", () => {
    expect(EmbeddedObjectPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/oleObject",
    );
    expect(EmbeddedObjectPart.extension).toBe(".bin");
  });

  it("FontPart — relationshipType / extension", () => {
    expect(FontPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/font",
    );
    expect(FontPart.extension).toBe(".dat");
  });

  it("WordprocessingPrinterSettingsPart — contentType / extension", () => {
    expect(WordprocessingPrinterSettingsPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.printerSettings",
    );
    expect(WordprocessingPrinterSettingsPart.extension).toBe(".bin");
  });

  it("Model3DReferenceRelationshipPart — contentType / extension", () => {
    expect(Model3DReferenceRelationshipPart.contentType).toBe("model/gltf-binary");
    expect(Model3DReferenceRelationshipPart.extension).toBe(".glb");
  });
});

describe("generated Part 构造 — 可 new（Epic-77）", () => {
  it("TypedXmlPart 子类用 IPackagePart + registry 构造", () => {
    const pkg = createInMemory();
    const rawPart = pkg.createPart(
      "/ppt/theme/theme1.xml" as PartUri,
      ThemeOverridePart.contentType,
    );
    const registry = new ElementRegistry();
    const part = new ThemeOverridePart(rawPart, registry);
    expect(part.part).toBe(rawPart);
    // root is lazy-constructed placeholder
    const root = part.root;
    expect(root.localName).toBe("root");
  });

  it("BinaryPart 子类用 IPackagePart 构造", () => {
    const pkg = createInMemory();
    const rawPart = pkg.createPart("/word/vbaProject.bin" as PartUri, VbaProjectPart.contentType);
    const part = new VbaProjectPart(rawPart);
    expect(part.part).toBe(rawPart);
    expect(part.uri).toBe("/word/vbaProject.bin");
  });

  it("BinaryPart 子类（无 contentType）可构造", () => {
    const pkg = createInMemory();
    const rawPart = pkg.createPart("/word/afchunk.dat" as PartUri, "application/octet-stream");
    const part = new AlternativeFormatImportPart(rawPart);
    expect(part.part).toBe(rawPart);
  });
});

describe("generated barrel index.ts（Epic-77）", () => {
  it("barrel 导出与直接导入是同一个类", () => {
    expect(ThemeOverridePartBarrel).toBe(ThemeOverridePart);
  });
});
