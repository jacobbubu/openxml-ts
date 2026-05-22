/**
 * Epic-99：WordprocessingDocument 创建的 [Content_Types].xml 必须包含 Default 声明。
 *
 * OPC §10.1 要求每个合规包声明 Default content-type；缺失 <Default Extension="rels">
 * 会导致 .rels 文件没有 content-type，OpenXmlValidator 报 Pkg_RequiredPartDoNotExist。
 */

import { describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { ContentTypeManifest } from "../../src/packaging/content-types/manifest.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

describe("WordprocessingDocument · [Content_Types].xml Default 声明", () => {
  it('create() 后 contentTypes 包含 <Default Extension="rels">', async () => {
    const doc = WordprocessingDocument.create();
    await doc.saveAsBytesAsync();
    await doc.dispose();

    // 从字节里解析 [Content_Types].xml 来验证
    const manifest = doc.package.contentTypes;
    expect(manifest.hasDefault("rels")).toBe(true);
  });

  it('create() 后 contentTypes 包含 <Default Extension="xml">', async () => {
    const doc = WordprocessingDocument.create();
    expect(doc.package.contentTypes.hasDefault("xml")).toBe(true);
    await doc.dispose();
  });

  it("rels Default 的 ContentType 为 relationships+xml", () => {
    const doc = WordprocessingDocument.create();
    // 序列化后验证 XML 文本
    const xml = doc.package.contentTypes.serialize();
    expect(xml).toContain(
      'Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"',
    );
  });

  it("xml Default 的 ContentType 为 application/xml", () => {
    const doc = WordprocessingDocument.create();
    const xml = doc.package.contentTypes.serialize();
    expect(xml).toContain('Extension="xml" ContentType="application/xml"');
  });

  it("create() 后 Override /word/document.xml 存在", () => {
    const doc = WordprocessingDocument.create();
    const xml = doc.package.contentTypes.serialize();
    expect(xml).toContain('PartName="/word/document.xml"');
    expect(xml).toContain(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml",
    );
  });

  it("序列化后 Default 在 Override 之前", () => {
    const doc = WordprocessingDocument.create();
    const xml = doc.package.contentTypes.serialize();
    const defaultIdx = xml.indexOf("<Default");
    const overrideIdx = xml.indexOf("<Override");
    expect(defaultIdx).toBeGreaterThan(-1);
    expect(overrideIdx).toBeGreaterThan(-1);
    expect(defaultIdx).toBeLessThan(overrideIdx);
  });

  it("保存再打开后 Default 声明被保留", async () => {
    const doc = WordprocessingDocument.create();
    const bytes = await doc.saveAsBytesAsync();
    await doc.dispose();

    const doc2 = await WordprocessingDocument.openAsync(bytes);
    expect(doc2.package.contentTypes.hasDefault("rels")).toBe(true);
    expect(doc2.package.contentTypes.hasDefault("xml")).toBe(true);
    await doc2.dispose();
  });

  it("保存后 [Content_Types].xml 的完整 XML 可被重新解析", async () => {
    const doc = WordprocessingDocument.create();
    const xml = doc.package.contentTypes.serialize();
    await doc.dispose();

    // 验证 XML 可被 ContentTypeManifest.parse 正确解析
    const manifest = ContentTypeManifest.parse(xml);
    expect(manifest.hasDefault("rels")).toBe(true);
    expect(manifest.hasDefault("xml")).toBe(true);
  });
});

describe("回归验证：Excel 和 PPT create() 仍包含 Default 声明", () => {
  it("SpreadsheetDocument.create() 包含 rels Default", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.package.contentTypes.hasDefault("rels")).toBe(true);
  });

  it("SpreadsheetDocument.create() 包含 xml Default", () => {
    const doc = SpreadsheetDocument.create();
    expect(doc.package.contentTypes.hasDefault("xml")).toBe(true);
  });

  it("PresentationDocument.create() 包含 rels Default", () => {
    const doc = PresentationDocument.create();
    expect(doc.package.contentTypes.hasDefault("rels")).toBe(true);
  });

  it("PresentationDocument.create() 包含 xml Default", () => {
    const doc = PresentationDocument.create();
    expect(doc.package.contentTypes.hasDefault("xml")).toBe(true);
  });
});
