/**
 * Epic-73：CustomXmlPart + CustomXmlPropertiesPart 单元 + 集成测试。
 */

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DataStoreItem } from "../../src/custom-xml/generated/data-store-item.js";
import {
  CustomXmlPart,
  CustomXmlPropertiesPart,
  WordprocessingDocument,
} from "../../src/word/index.js";

const FIXTURE_DIR = join(import.meta.dirname ?? __dirname, "../fixtures/upstream-smoke");

describe("CustomXmlPart 静态元数据（Epic-73）", () => {
  it("relationshipType 正确", () => {
    expect(CustomXmlPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXml",
    );
  });

  it("contentType 正确", () => {
    expect(CustomXmlPart.contentType).toBe("application/xml");
  });
});

describe("CustomXmlPropertiesPart 静态元数据（Epic-73）", () => {
  it("relationshipType 正确", () => {
    expect(CustomXmlPropertiesPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/customXmlProps",
    );
  });

  it("contentType 正确", () => {
    expect(CustomXmlPropertiesPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.customXmlProperties+xml",
    );
  });
});

describe("从 fixture 加载 customXmlParts（Epic-73）", () => {
  it("Document.docx 包含 1 个 customXmlPart", async () => {
    const bytes = await readFile(join(FIXTURE_DIR, "Document.docx"));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const parts = doc.customXmlParts;
    expect(parts.length).toBeGreaterThanOrEqual(1);
  });

  it("customXmlPart 的 customXmlPropertiesPart 存在", async () => {
    const bytes = await readFile(join(FIXTURE_DIR, "Document.docx"));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const parts = doc.customXmlParts;
    expect(parts.length).toBeGreaterThanOrEqual(1);
    const propsPart = parts[0]!.customXmlPropertiesPart;
    expect(propsPart).toBeDefined();
  });

  it("customXmlPropertiesPart 根元素是 ds:datastoreItem（类型化）", async () => {
    const bytes = await readFile(join(FIXTURE_DIR, "Document.docx"));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const parts = doc.customXmlParts;
    const propsPart = parts[0]!.customXmlPropertiesPart;
    expect(propsPart).toBeDefined();
    const root = propsPart!.datastoreItem;
    expect(root).toBeInstanceOf(DataStoreItem);
    expect(root.localName).toBe("datastoreItem");
    expect(root.namespaceUri).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/customXml",
    );
  });

  it("datastoreItem 的 ds:itemID 属性被正确反序列化", async () => {
    const bytes = await readFile(join(FIXTURE_DIR, "Document.docx"));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const parts = doc.customXmlParts;
    const propsPart = parts[0]!.customXmlPropertiesPart;
    const root = propsPart!.datastoreItem as DataStoreItem;
    // Document.docx fixture 的 itemID = {55AF091B-3C7A-41E3-B477-F2FDAA23CFDA}
    expect(root.itemId?.toString()).toMatch(/^\{[0-9A-Fa-f-]{36}\}$/);
  });

  it("customXmlPart 的任意 XML 根（item1.xml）被透传 round-trip", async () => {
    const bytes = await readFile(join(FIXTURE_DIR, "Document.docx"));
    const doc = await WordprocessingDocument.openAsync(bytes);
    const parts = doc.customXmlParts;
    expect(parts.length).toBeGreaterThanOrEqual(1);
    // item1.xml 含任意 CoverPageProperties XML — root 应可访问（Unknown 透传）
    const root = parts[0]!.customXml;
    expect(root).toBeDefined();
  });
});

describe("空文档 customXmlParts 返空数组（Epic-73）", () => {
  it("新建 Word 文档时 customXmlParts 为空数组", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.customXmlParts).toHaveLength(0);
  });
});
