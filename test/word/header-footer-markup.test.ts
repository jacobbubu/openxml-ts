/**
 * Epic-57：Word 页眉 / 页脚文本简化访问器测试。
 */

import { describe, expect, it } from "vitest";
import {
  clearDocumentFooter,
  clearDocumentHeader,
  getDocumentFooter,
  getDocumentHeader,
  setDocumentFooter,
  setDocumentHeader,
} from "../../src/word/header-footer-markup.js";
import { FooterPart, HeaderPart, WordprocessingDocument } from "../../src/word/index.js";

describe("setDocumentHeader（Epic-57）", () => {
  it("首次设置：返回 HeaderPart，分配 /word/header1.xml", () => {
    const doc = WordprocessingDocument.create();
    const hp = setDocumentHeader(doc, "公司机密");

    expect(hp).toBeInstanceOf(HeaderPart);
    expect(hp.part.uri).toBe("/word/header1.xml");
  });

  it("首次设置：sectPr 里有 headerReference，w:type='default'", async () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "页眉文本");

    const { serialize } = await import("../../src/element/index.js");
    const xml = doc.mainDocumentPart !== undefined ? serialize(doc.mainDocumentPart.document) : "";
    expect(xml).toContain("<w:headerReference");
    expect(xml).toContain('w:type="default"');
  });

  it("set 幂等：重复设置同 type，文件数量不变，文本被更新", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "旧文本");
    setDocumentHeader(doc, "新文本");

    // 只应有一个 header Part
    expect(doc.package.hasPart("/word/header1.xml" as never)).toBe(true);
    expect(doc.package.hasPart("/word/header2.xml" as never)).toBe(false);

    const text = getDocumentHeader(doc, "default");
    expect(text).toBe("新文本");
  });

  it("不同 type 各自独立：default + first 各建一个 Part", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "默认页眉", "default");
    setDocumentHeader(doc, "首页页眉", "first");

    expect(doc.package.hasPart("/word/header1.xml" as never)).toBe(true);
    expect(doc.package.hasPart("/word/header2.xml" as never)).toBe(true);
  });
});

describe("setDocumentFooter（Epic-57）", () => {
  it("首次设置：返回 FooterPart，分配 /word/footer1.xml", () => {
    const doc = WordprocessingDocument.create();
    const fp = setDocumentFooter(doc, "第 X 页");

    expect(fp).toBeInstanceOf(FooterPart);
    expect(fp.part.uri).toBe("/word/footer1.xml");
  });

  it("set 幂等：重复设置同 type，文件数量不变，文本被更新", () => {
    const doc = WordprocessingDocument.create();
    setDocumentFooter(doc, "旧页脚");
    setDocumentFooter(doc, "新页脚");

    expect(doc.package.hasPart("/word/footer1.xml" as never)).toBe(true);
    expect(doc.package.hasPart("/word/footer2.xml" as never)).toBe(false);

    const text = getDocumentFooter(doc, "default");
    expect(text).toBe("新页脚");
  });
});

describe("getDocumentHeader / getDocumentFooter（Epic-57）", () => {
  it("get 返回正确文本", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "机密文件");
    expect(getDocumentHeader(doc)).toBe("机密文件");
  });

  it("get 不存在的 type 返 undefined", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "默认页眉", "default");
    expect(getDocumentHeader(doc, "even")).toBeUndefined();
  });

  it("get 无任何页眉时返 undefined", () => {
    const doc = WordprocessingDocument.create();
    expect(getDocumentHeader(doc)).toBeUndefined();
  });

  it("get footer 返回正确文本", () => {
    const doc = WordprocessingDocument.create();
    setDocumentFooter(doc, "第 1 页");
    expect(getDocumentFooter(doc)).toBe("第 1 页");
  });

  it("同时 set header 和 footer，各自读取正确", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "页眉内容");
    setDocumentFooter(doc, "页脚内容");

    expect(getDocumentHeader(doc)).toBe("页眉内容");
    expect(getDocumentFooter(doc)).toBe("页脚内容");
  });
});

describe("clearDocumentHeader / clearDocumentFooter（Epic-57）", () => {
  it("clear 后 get 返 undefined", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "将被清除");
    clearDocumentHeader(doc);
    expect(getDocumentHeader(doc)).toBeUndefined();
  });

  it("clear 只删对应 type 的引用，其他 type 不受影响", () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "默认页眉", "default");
    setDocumentHeader(doc, "首页页眉", "first");

    clearDocumentHeader(doc, "default");

    expect(getDocumentHeader(doc, "default")).toBeUndefined();
    expect(getDocumentHeader(doc, "first")).toBe("首页页眉");
  });

  it("clear footer 后 get 返 undefined", () => {
    const doc = WordprocessingDocument.create();
    setDocumentFooter(doc, "将被清除的页脚");
    clearDocumentFooter(doc);
    expect(getDocumentFooter(doc)).toBeUndefined();
  });

  it("clear 无页眉时静默不报错", () => {
    const doc = WordprocessingDocument.create();
    expect(() => clearDocumentHeader(doc)).not.toThrow();
  });
});

describe("round-trip：save → reopen（Epic-57）", () => {
  it("保存后重开，页眉文本仍然正确", async () => {
    const doc = WordprocessingDocument.create();
    setDocumentHeader(doc, "公司机密文件");

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);

    expect(getDocumentHeader(reopened)).toBe("公司机密文件");
  });

  it("保存后重开，页脚文本仍然正确", async () => {
    const doc = WordprocessingDocument.create();
    setDocumentFooter(doc, "第 1 页 / 共 N 页");

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);

    expect(getDocumentFooter(reopened)).toBe("第 1 页 / 共 N 页");
  });
});
