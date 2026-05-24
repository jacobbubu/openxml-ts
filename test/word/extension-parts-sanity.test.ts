/**
 * Epic-120-follow sanity smoke：MainDocumentPart 5 个扩展 typed Part getter。
 *
 * 验证契约：
 * - Single getter：part 不存在时返回 undefined（不抛）；二次访问同 undefined（缓存 null）
 * - Collection getter：part 不存在时返回空数组（不抛）
 * - static contentType / relationshipType 可访问且非空
 */

import { describe, expect, it } from "vitest";
import { ElementRegistry } from "../../src/element/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";
import {
  DocumentTasksPart,
  MainDocumentPart,
  StylesWithEffectsPart,
  WordCommentsExtensiblePart,
  WordprocessingCommentsIdsPart,
  WordprocessingPrinterSettingsPart,
} from "../../src/word/parts/index.js";

const WNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

function makeRegistry(): ElementRegistry {
  return new ElementRegistry();
}

/** 构造最小空文档 pkg + MainDocumentPart（无任何扩展关系）。 */
async function makeEmptyDocPart(): Promise<MainDocumentPart> {
  const pkg = createInMemory();
  const part = pkg.createPart("/word/document.xml" as PartUri, MainDocumentPart.contentType);
  await part.writeAsync(`<w:document xmlns:w="${WNS}"><w:body/></w:document>`);
  return new MainDocumentPart(part, makeRegistry(), pkg);
}

// ──────────────────────────────────────────────────────────────────────────────
// static 常量可访问性
// ──────────────────────────────────────────────────────────────────────────────

describe("Epic-120 Word 扩展 Part 静态常量", () => {
  it("WordprocessingCommentsIdsPart contentType / relationshipType 非空", () => {
    expect(WordprocessingCommentsIdsPart.contentType).toBeTruthy();
    expect(WordprocessingCommentsIdsPart.relationshipType).toBeTruthy();
  });

  it("WordCommentsExtensiblePart contentType / relationshipType 非空", () => {
    expect(WordCommentsExtensiblePart.contentType).toBeTruthy();
    expect(WordCommentsExtensiblePart.relationshipType).toBeTruthy();
  });

  it("DocumentTasksPart contentType / relationshipType 非空", () => {
    expect(DocumentTasksPart.contentType).toBeTruthy();
    expect(DocumentTasksPart.relationshipType).toBeTruthy();
  });

  it("StylesWithEffectsPart contentType / relationshipType 非空", () => {
    expect(StylesWithEffectsPart.contentType).toBeTruthy();
    expect(StylesWithEffectsPart.relationshipType).toBeTruthy();
  });

  it("WordprocessingPrinterSettingsPart contentType / relationshipType 非空", () => {
    expect(WordprocessingPrinterSettingsPart.contentType).toBeTruthy();
    expect(WordprocessingPrinterSettingsPart.relationshipType).toBeTruthy();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Single getter：缺 Part → undefined（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("MainDocumentPart single getter 缺 Part → undefined", () => {
  it("wordprocessingCommentsIdsPart 无关系 → undefined；二访同样", async () => {
    const mdp = await makeEmptyDocPart();
    expect(mdp.wordprocessingCommentsIdsPart).toBeUndefined();
    expect(mdp.wordprocessingCommentsIdsPart).toBeUndefined();
  });

  it("wordCommentsExtensiblePart 无关系 → undefined；二访同样", async () => {
    const mdp = await makeEmptyDocPart();
    expect(mdp.wordCommentsExtensiblePart).toBeUndefined();
    expect(mdp.wordCommentsExtensiblePart).toBeUndefined();
  });

  it("documentTasksPart 无关系 → undefined；二访同样", async () => {
    const mdp = await makeEmptyDocPart();
    expect(mdp.documentTasksPart).toBeUndefined();
    expect(mdp.documentTasksPart).toBeUndefined();
  });

  it("stylesWithEffectsPart 无关系 → undefined；二访同样", async () => {
    const mdp = await makeEmptyDocPart();
    expect(mdp.stylesWithEffectsPart).toBeUndefined();
    expect(mdp.stylesWithEffectsPart).toBeUndefined();
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// Collection getter：缺 Part → 空数组（不抛）
// ──────────────────────────────────────────────────────────────────────────────

describe("MainDocumentPart collection getter 缺 Part → 空数组", () => {
  it("wordprocessingPrinterSettingsParts 无关系 → 空数组", async () => {
    const mdp = await makeEmptyDocPart();
    const parts = mdp.wordprocessingPrinterSettingsParts;
    expect(Array.isArray(parts)).toBe(true);
    expect(parts.length).toBe(0);
  });
});

// ──────────────────────────────────────────────────────────────────────────────
// 端到端：有真实关系时能解出实例
// ──────────────────────────────────────────────────────────────────────────────

describe("MainDocumentPart single getter 有关系 → 返回实例", () => {
  it("wordprocessingCommentsIdsPart 有关系 → 实例；二访同实例", async () => {
    const pkg = createInMemory();
    const docPart = pkg.createPart("/word/document.xml" as PartUri, MainDocumentPart.contentType);
    await docPart.writeAsync(`<w:document xmlns:w="${WNS}"><w:body/></w:document>`);

    const extPart = pkg.createPart(
      "/word/commentsIds.xml" as PartUri,
      WordprocessingCommentsIdsPart.contentType,
    );
    await extPart.writeAsync("<root/>");
    docPart.relationships.create({
      type: WordprocessingCommentsIdsPart.relationshipType,
      target: "commentsIds.xml",
      targetMode: "internal",
    });

    const mdp = new MainDocumentPart(docPart, makeRegistry(), pkg);
    const resolved = mdp.wordprocessingCommentsIdsPart;
    expect(resolved).toBeInstanceOf(WordprocessingCommentsIdsPart);
    // 缓存：二访同实例
    expect(mdp.wordprocessingCommentsIdsPart).toBe(resolved);
  });

  it("wordprocessingPrinterSettingsParts 有关系 → 含 1 个实例", async () => {
    const pkg = createInMemory();
    const docPart = pkg.createPart("/word/document.xml" as PartUri, MainDocumentPart.contentType);
    await docPart.writeAsync(`<w:document xmlns:w="${WNS}"><w:body/></w:document>`);

    pkg.createPart(
      "/word/settings/printerSettings1.bin" as PartUri,
      WordprocessingPrinterSettingsPart.contentType,
    );
    docPart.relationships.create({
      type: WordprocessingPrinterSettingsPart.relationshipType,
      target: "settings/printerSettings1.bin",
      targetMode: "internal",
    });

    const mdp = new MainDocumentPart(docPart, makeRegistry(), pkg);
    const parts = mdp.wordprocessingPrinterSettingsParts;
    expect(parts.length).toBe(1);
    expect(parts[0]).toBeInstanceOf(WordprocessingPrinterSettingsPart);
  });
});
