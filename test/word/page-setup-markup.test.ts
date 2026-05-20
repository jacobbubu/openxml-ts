/**
 * Epic-61：Word Section 页面设置访问器测试。
 */

import { describe, expect, it } from "vitest";
import {
  PageMargin,
  PageSize,
  SectionProperties,
  WordprocessingDocument,
} from "../../src/word/index.js";
import {
  ensureDefaultSection,
  getDefaultSection,
  getPageMargin,
  getPageSize,
  setPageMargin,
  setPageSize,
} from "../../src/word/page-setup-markup.js";

// A4 尺寸（DXA）
const A4_W = 11906;
const A4_H = 16838;

describe("setPageSize / getPageSize（Epic-61）", () => {
  it("首次设置：sectPr 内创建 <w:pgSz>，读回尺寸一致", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageSize(section, { widthDxa: A4_W, heightDxa: A4_H });

    const result = getPageSize(section);
    expect(result).toBeDefined();
    expect(result?.widthDxa).toBe(A4_W);
    expect(result?.heightDxa).toBe(A4_H);
    expect(result?.orientation).toBeUndefined();
  });

  it("设置横向：orientation='landscape' 正确写入并读回", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageSize(section, { widthDxa: A4_H, heightDxa: A4_W, orientation: "landscape" });

    const result = getPageSize(section);
    expect(result?.orientation).toBe("landscape");
    expect(result?.widthDxa).toBe(A4_H);
    expect(result?.heightDxa).toBe(A4_W);
  });

  it("setPageSize 幂等：重复调用只有一个 <w:pgSz>", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageSize(section, { widthDxa: A4_W, heightDxa: A4_H });
    setPageSize(section, { widthDxa: 12240, heightDxa: 15840 }); // Letter

    let count = 0;
    for (const child of section.children) {
      if (child instanceof PageSize) count += 1;
    }
    expect(count).toBe(1);

    const result = getPageSize(section);
    expect(result?.widthDxa).toBe(12240);
  });

  it("orientation 从 landscape 改为 portrait：orient 属性清除", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageSize(section, { widthDxa: A4_H, heightDxa: A4_W, orientation: "landscape" });
    setPageSize(section, { widthDxa: A4_W, heightDxa: A4_H }); // 不传 orientation

    const result = getPageSize(section);
    expect(result?.orientation).toBeUndefined();
  });

  it("无 <w:pgSz> 时 getPageSize 返 undefined", () => {
    const section = new SectionProperties();
    expect(getPageSize(section)).toBeUndefined();
  });
});

describe("setPageMargin / getPageMargin（Epic-61）", () => {
  it("首次设置所有字段：读回值一致", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageMargin(section, {
      topDxa: 1440,
      rightDxa: 1800,
      bottomDxa: 1440,
      leftDxa: 1800,
      headerDxa: 720,
      footerDxa: 720,
      gutterDxa: 0,
    });

    const result = getPageMargin(section);
    expect(result).toBeDefined();
    expect(result?.topDxa).toBe(1440);
    expect(result?.rightDxa).toBe(1800);
    expect(result?.bottomDxa).toBe(1440);
    expect(result?.leftDxa).toBe(1800);
    expect(result?.headerDxa).toBe(720);
    expect(result?.footerDxa).toBe(720);
    expect(result?.gutterDxa).toBe(0);
  });

  it("部分更新：只更新 topDxa，其余字段保留", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageMargin(section, { topDxa: 1440, bottomDxa: 1440, leftDxa: 1800, rightDxa: 1800 });
    setPageMargin(section, { topDxa: 2880 }); // 只改 top

    const result = getPageMargin(section);
    expect(result?.topDxa).toBe(2880);
    expect(result?.bottomDxa).toBe(1440);
    expect(result?.leftDxa).toBe(1800);
    expect(result?.rightDxa).toBe(1800);
  });

  it("setPageMargin 幂等：重复调用只有一个 <w:pgMar>", () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);

    setPageMargin(section, { topDxa: 720 });
    setPageMargin(section, { topDxa: 1440 });

    let count = 0;
    for (const child of section.children) {
      if (child instanceof PageMargin) count += 1;
    }
    expect(count).toBe(1);
  });

  it("无 <w:pgMar> 时 getPageMargin 返 undefined", () => {
    const section = new SectionProperties();
    expect(getPageMargin(section)).toBeUndefined();
  });
});

describe("getDefaultSection / ensureDefaultSection（Epic-61）", () => {
  it("ensureDefaultSection 后 getDefaultSection 找到 body 末尾的 sectPr", () => {
    const doc = WordprocessingDocument.create();
    // 先 ensure 创建，再 get
    ensureDefaultSection(doc);
    const section = getDefaultSection(doc);
    expect(section).toBeInstanceOf(SectionProperties);
  });

  it("ensureDefaultSection：不存在时创建，再次调用返同一实例", () => {
    const doc = WordprocessingDocument.create();
    const s1 = ensureDefaultSection(doc);
    const s2 = ensureDefaultSection(doc);
    expect(s1).toBe(s2);
  });

  it("mainDocumentPart 不存在时 getDefaultSection 返 undefined", () => {
    // 构造一个没有 mainDocumentPart 的 doc 场景——直接调 getDefaultSection with dummy
    // 用内部工具：传入一个虚假 doc，mainDocumentPart === undefined
    const fakeDoc = { mainDocumentPart: undefined } as unknown as WordprocessingDocument;
    expect(getDefaultSection(fakeDoc)).toBeUndefined();
  });
});

describe("round-trip：save → reopen（Epic-61）", () => {
  it("保存后重开，页面尺寸仍然正确", async () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);
    setPageSize(section, { widthDxa: A4_W, heightDxa: A4_H, orientation: "portrait" });

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const s2 = getDefaultSection(reopened);
    expect(s2).toBeDefined();

    const result = getPageSize(s2!);
    expect(result?.widthDxa).toBe(A4_W);
    expect(result?.heightDxa).toBe(A4_H);
    expect(result?.orientation).toBe("portrait");
  });

  it("保存后重开，页边距仍然正确", async () => {
    const doc = WordprocessingDocument.create();
    const section = ensureDefaultSection(doc);
    setPageMargin(section, { topDxa: 1440, bottomDxa: 1440, leftDxa: 1800, rightDxa: 1800 });

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const s2 = getDefaultSection(reopened);
    expect(s2).toBeDefined();

    const result = getPageMargin(s2!);
    expect(result?.topDxa).toBe(1440);
    expect(result?.leftDxa).toBe(1800);
  });
});
