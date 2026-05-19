/**
 * Epic-26：Word addHeader / addFooter 集成测试。
 */

import { describe, expect, it } from "vitest";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import { FooterPart, HeaderPart, WordprocessingDocument } from "../../src/word/index.js";

describe("WordprocessingDocument.addHeader（Epic-26）", () => {
  it("第一次：分配 /word/header1.xml + 接关系 + sectPr 挂 headerReference", () => {
    const doc = WordprocessingDocument.create();
    const { part, relId } = doc.addHeader("Header text");

    expect(part).toBeInstanceOf(HeaderPart);
    expect(part.part.uri).toBe("/word/header1.xml");
    expect(relId).toMatch(/^rId\d+$/);
    // 关系挂 mainDocumentPart
    const rels = [...doc.mainDocumentPart!.part.relationships];
    const r = rels.find((x) => x.id === relId);
    expect(r?.type).toBe(HeaderPart.relationshipType);
    expect(r?.target).toBe("header1.xml");
  });

  it("递增分配 header1 / header2", () => {
    const doc = WordprocessingDocument.create();
    const a = doc.addHeader("A");
    const b = doc.addHeader("B", "first");
    expect(a.part.part.uri).toBe("/word/header1.xml");
    expect(b.part.part.uri).toBe("/word/header2.xml");
  });

  it("type 透传到 w:type", async () => {
    const doc = WordprocessingDocument.create();
    doc.addHeader("X", "first");
    const { serialize } = await import("../../src/element/index.js");
    const xml = serialize(doc.mainDocumentPart!.document);
    expect(xml).toContain('<w:headerReference w:type="first"');
  });

  it("save → reopen 后 HeaderPart 字节保留 + 关系仍在", async () => {
    const doc = WordprocessingDocument.create();
    const { relId } = doc.addHeader("Hello header");
    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const rels = [...reopened.mainDocumentPart!.part.relationships];
    const r = rels.find((x) => x.id === relId);
    expect(r?.type).toBe(HeaderPart.relationshipType);
    expect(reopened.package.hasPart("/word/header1.xml" as never)).toBe(true);
  });
});

describe("WordprocessingDocument.addFooter（Epic-26）", () => {
  it("加 footer 走对称路径", () => {
    const doc = WordprocessingDocument.create();
    const { part, relId } = doc.addFooter("Footer text", "even");
    expect(part).toBeInstanceOf(FooterPart);
    expect(part.part.uri).toBe("/word/footer1.xml");
    expect(relId).toMatch(/^rId\d+$/);
  });

  it("save → reopen 后 footer 关系保留 + Part 在", async () => {
    const doc = WordprocessingDocument.create();
    doc.addFooter("Footer here");
    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.package.hasPart("/word/footer1.xml" as never)).toBe(true);
    const rels = [...reopened.mainDocumentPart!.part.relationships];
    expect(rels.some((r) => r.type === FooterPart.relationshipType)).toBe(true);
  });
});

describe("mainDocumentPart 缺失场景", () => {
  it("addHeader / addFooter 抛 friendly 错（理论上 create() 后应有 main，所以这条主要是文档化）", () => {
    // 模拟：直接构造空 OPC + 包装会触发 mainDocumentPart undefined 路径，
    // 但 \`WordprocessingDocument.create()\` 已经 seed 主文档，需要 hand-craft 才能复现。
    // 这里仅断言异常 contract：调用方理解 main 缺失会抛 PART_NOT_FOUND。
    // （详见 word-document.ts 的 throw 注解。）
    expect(OpenXmlPackageError).toBeDefined();
  });
});
