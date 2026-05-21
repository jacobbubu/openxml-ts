/**
 * Epic-82 集成测试：MC 协商接入文档打开路径。
 *
 * 验证：
 *  - 带 markupCompatibilityProcessSettings 选项打开文档，MC 内容被正确处理；
 *  - 不带选项打开同一文档，MC 内容保留（默认行为不变）；
 *  - Word / Excel / PPT 三种文档类型均覆盖；
 *  - targetFileFormatVersions 影响 mc:Ignorable 处理。
 */

import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { OpenXmlCompositeElement } from "../../src/element/index.js";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import {
  FileFormatVersions,
  type MarkupCompatibilityProcessSettings,
} from "../../src/markup-compat/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));
const FIXTURES = join(HERE, "../fixtures/upstream-smoke");

const MC_NS = "http://schemas.openxmlformats.org/markup-compatibility/2006";

// ── 辅助 ─────────────────────────────────────────────────────────────────────

/** 判断元素树中是否存在指定 mc:localName 元素（如 AlternateContent）。 */
function hasMcElement(root: OpenXmlCompositeElement, localName: string): boolean {
  for (const el of root.descendants()) {
    if (el.namespaceUri === MC_NS && el.localName === localName) return true;
  }
  return false;
}

/** 判断元素（含树）中是否存在带有 mc:Ignorable 属性的节点（已由 MC 处理器移除）。 */
function hasMcIgnorableAttr(root: OpenXmlCompositeElement): boolean {
  if (root.extendedAttributes.has("mc:Ignorable")) return true;
  for (const el of root.descendants()) {
    if (el.extendedAttributes.has("mc:Ignorable")) return true;
  }
  return false;
}

/** 判断元素树中是否存在带有 mc:PreserveAttributes 属性的节点。 */
function hasMcPreserveAttr(root: OpenXmlCompositeElement): boolean {
  if (root.extendedAttributes.has("mc:PreserveAttributes")) return true;
  for (const el of root.descendants()) {
    if (el.extendedAttributes.has("mc:PreserveAttributes")) return true;
  }
  return false;
}

const SETTINGS_2007: MarkupCompatibilityProcessSettings = {
  processMode: "ProcessAllParts",
  targetFileFormatVersions: FileFormatVersions.Office2007,
};

const SETTINGS_2010: MarkupCompatibilityProcessSettings = {
  processMode: "ProcessAllParts",
  targetFileFormatVersions: FileFormatVersions.Office2010,
};

// ── Word 测试 ─────────────────────────────────────────────────────────────────

describe("WordprocessingDocument · MC 接入（mcdoc.docx）", () => {
  async function loadMcDoc(settings?: MarkupCompatibilityProcessSettings) {
    const bytes = new Uint8Array(await readFile(join(FIXTURES, "mcdoc.docx")));
    return WordprocessingDocument.openAsync(
      bytes,
      settings ? { markupCompatibilityProcessSettings: settings } : {},
    );
  }

  it("不带 MC 设置（默认）：mc:AlternateContent 保留在文档树中", async () => {
    const doc = await loadMcDoc();
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // mc:AlternateContent 节点应存在
    expect(hasMcElement(root, "AlternateContent")).toBe(true);
  });

  it("不带 MC 设置（默认）：mc:Ignorable 属性保留在根元素上", async () => {
    const doc = await loadMcDoc();
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // mc:Ignorable="w14 wp14" 应存在于根元素
    expect(root.extendedAttributes.has("mc:Ignorable")).toBe(true);
    const ignorableVal = root.extendedAttributes.get("mc:Ignorable");
    expect(ignorableVal).toContain("w14");
  });

  it("带 ProcessAllParts + Office2007：mc:AlternateContent 被解析消除", async () => {
    const doc = await loadMcDoc(SETTINGS_2007);
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // AlternateContent 应被展开（Fallback 替换 AlternateContent 节点）
    expect(hasMcElement(root, "AlternateContent")).toBe(false);
  });

  it("带 ProcessAllParts + Office2007：mc:Ignorable 属性被移除（MC 处理后清理）", async () => {
    const doc = await loadMcDoc(SETTINGS_2007);
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // 处理完成后，mc:Ignorable 等 MC 属性应被移除
    expect(hasMcIgnorableAttr(root)).toBe(false);
  });

  it("带 ProcessAllParts + Office2007：mc:PreserveAttributes 属性被移除", async () => {
    const doc = await loadMcDoc(SETTINGS_2007);
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // mc:PreserveAttributes 在处理后被清理
    expect(hasMcPreserveAttr(root)).toBe(false);
  });

  it("带 ProcessAllParts + Office2010：mc:AlternateContent 仍被解析（wps Choice 仍不满足）", async () => {
    const doc = await loadMcDoc(SETTINGS_2010);
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // wps 命名空间不在版本映射中，Choice 不满足 → AlternateContent 仍被消解为 Fallback
    expect(hasMcElement(root, "AlternateContent")).toBe(false);
  });

  it("processMode=NoProcess：不执行任何 MC 处理，MC 内容完整保留", async () => {
    const doc = await loadMcDoc({
      processMode: "NoProcess",
      targetFileFormatVersions: FileFormatVersions.Office2007,
    });
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    // NoProcess → MC 内容不变
    expect(hasMcElement(root, "AlternateContent")).toBe(true);
    expect(root.extendedAttributes.has("mc:Ignorable")).toBe(true);
  });

  it("processMode=ProcessLoadedPartsOnly：行为与 ProcessAllParts 相同（懒加载自然等价）", async () => {
    const doc = await loadMcDoc({
      processMode: "ProcessLoadedPartsOnly",
      targetFileFormatVersions: FileFormatVersions.Office2007,
    });
    const root = doc.mainDocumentPart!.document as OpenXmlCompositeElement;
    expect(hasMcElement(root, "AlternateContent")).toBe(false);
    expect(hasMcIgnorableAttr(root)).toBe(false);
  });
});

// ── Excel 测试 ────────────────────────────────────────────────────────────────

describe("SpreadsheetDocument · MC 接入（excel14.xlsx）", () => {
  async function loadExcel14(settings?: MarkupCompatibilityProcessSettings) {
    const bytes = new Uint8Array(await readFile(join(FIXTURES, "excel14.xlsx")));
    return SpreadsheetDocument.openAsync(
      bytes,
      settings ? { markupCompatibilityProcessSettings: settings } : {},
    );
  }

  it("不带 MC 设置（默认）：worksheet 根元素 mc:Ignorable 属性保留", async () => {
    const doc = await loadExcel14();
    const wp = doc.workbookPart!;
    const wsps = wp.worksheetParts;
    expect(wsps.length).toBeGreaterThan(0);
    const root = wsps[0]!.worksheet as OpenXmlCompositeElement;
    // mc:Ignorable="x14ac" 声明应存在
    const ignorable = root.extendedAttributes.get("mc:Ignorable");
    expect(ignorable).toBeDefined();
    expect(ignorable).toContain("x14ac");
  });

  it("带 ProcessAllParts + Office2007：worksheet 根元素 mc:Ignorable 属性被移除", async () => {
    const doc = await loadExcel14(SETTINGS_2007);
    const wp = doc.workbookPart!;
    const wsps = wp.worksheetParts;
    expect(wsps.length).toBeGreaterThan(0);
    const root = wsps[0]!.worksheet as OpenXmlCompositeElement;
    // MC 处理后，mc:Ignorable 属性本身被移除
    expect(root.extendedAttributes.has("mc:Ignorable")).toBe(false);
  });
});

// ── PPT 测试 ──────────────────────────────────────────────────────────────────

describe("PresentationDocument · MC 接入（Of16-01.pptx）", () => {
  // Of16-01.pptx 的 slide1.xml 含 mc:AlternateContent：
  // Choice requires cx1（2015 chartex，Office2007 不理解）→ Fallback 应被选中

  async function loadOf16Ppt(settings?: MarkupCompatibilityProcessSettings) {
    const bytes = new Uint8Array(await readFile(join(FIXTURES, "Of16-01.pptx")));
    return PresentationDocument.openAsync(
      bytes,
      settings ? { markupCompatibilityProcessSettings: settings } : {},
    );
  }

  it("不带 MC 设置：slide1 中 mc:AlternateContent 保留", async () => {
    const doc = await loadOf16Ppt();
    const pp = doc.presentationPart;
    expect(pp).toBeDefined();
    const slideParts = pp!.slideParts;
    expect(slideParts.length).toBeGreaterThan(0);
    const slide = slideParts[0]!.slide as OpenXmlCompositeElement;
    // mc:AlternateContent 应保留
    expect(hasMcElement(slide, "AlternateContent")).toBe(true);
  });

  it("带 ProcessAllParts + Office2007：slide1 中 mc:AlternateContent 被消解", async () => {
    const doc = await loadOf16Ppt(SETTINGS_2007);
    const pp = doc.presentationPart;
    expect(pp).toBeDefined();
    const slideParts = pp!.slideParts;
    expect(slideParts.length).toBeGreaterThan(0);
    const slide = slideParts[0]!.slide as OpenXmlCompositeElement;
    // AlternateContent 应被展开（cx1 不被 2007 理解 → Fallback p:pic 选中）
    expect(hasMcElement(slide, "AlternateContent")).toBe(false);
  });
});
