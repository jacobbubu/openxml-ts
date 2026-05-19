/**
 * Epic-29：跨子系统 CoreProperties 单元 + 集成测试。
 */

import { describe, expect, it } from "vitest";
import { SpreadsheetDocument } from "../../src/excel/index.js";
import { PresentationDocument } from "../../src/ppt/index.js";
import { WordprocessingDocument } from "../../src/word/index.js";

describe("WordprocessingDocument.coreProperties（Epic-29）", () => {
  it("懒 bootstrap：首次访问创建 CorePropertiesPart", () => {
    const doc = WordprocessingDocument.create();
    expect(doc.package.hasPart("/docProps/core.xml" as never)).toBe(false);
    doc.coreProperties.title = "Q4 Report";
    expect(doc.package.hasPart("/docProps/core.xml" as never)).toBe(true);
  });

  it("title / creator / lastModifiedBy / keywords 等访问器双向", () => {
    const doc = WordprocessingDocument.create();
    const cp = doc.coreProperties;
    cp.title = "T";
    cp.creator = "Alice";
    cp.lastModifiedBy = "Bob";
    cp.keywords = "a,b,c";
    cp.subject = "S";
    cp.description = "D";
    cp.language = "zh-CN";
    cp.revision = "3";
    cp.category = "Cat";
    cp.contentStatus = "Draft";

    expect(cp.title).toBe("T");
    expect(cp.creator).toBe("Alice");
    expect(cp.lastModifiedBy).toBe("Bob");
    expect(cp.keywords).toBe("a,b,c");
    expect(cp.subject).toBe("S");
    expect(cp.description).toBe("D");
    expect(cp.language).toBe("zh-CN");
    expect(cp.revision).toBe("3");
    expect(cp.category).toBe("Cat");
    expect(cp.contentStatus).toBe("Draft");
  });

  it("created / modified Date 双向（自动 ISO）", () => {
    const doc = WordprocessingDocument.create();
    const d1 = new Date("2026-05-19T08:00:00Z");
    const d2 = new Date("2026-05-19T09:00:00Z");
    doc.coreProperties.created = d1;
    doc.coreProperties.modified = d2;
    expect(doc.coreProperties.created?.toISOString()).toBe(d1.toISOString());
    expect(doc.coreProperties.modified?.toISOString()).toBe(d2.toISOString());
  });

  it("setter 传 undefined 删除", () => {
    const doc = WordprocessingDocument.create();
    doc.coreProperties.title = "X";
    doc.coreProperties.title = undefined;
    expect(doc.coreProperties.title).toBeUndefined();
  });

  it("save → reopen 后所有字段保留 + 关系仍在", async () => {
    const doc = WordprocessingDocument.create();
    doc.coreProperties.title = "Persisted";
    doc.coreProperties.creator = "Alice";
    doc.coreProperties.created = new Date("2026-05-19T08:00:00.000Z");

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    expect(reopened.coreProperties.title).toBe("Persisted");
    expect(reopened.coreProperties.creator).toBe("Alice");
    expect(reopened.coreProperties.created?.toISOString()).toBe("2026-05-19T08:00:00.000Z");
  });

  it("list() 列出所有已设置字段", () => {
    const doc = WordprocessingDocument.create();
    doc.coreProperties.title = "T";
    doc.coreProperties.creator = "A";
    const list = doc.coreProperties.list();
    expect(list).toEqual({ title: "T", creator: "A" });
  });
});

describe("SpreadsheetDocument.coreProperties（Epic-29）", () => {
  it("Excel 路径同样支持", async () => {
    const doc = SpreadsheetDocument.create();
    doc.coreProperties.title = "Excel doc";
    const out = await doc.saveAsBytesAsync();
    const reopened = await SpreadsheetDocument.openAsync(out);
    expect(reopened.coreProperties.title).toBe("Excel doc");
  });
});

describe("PresentationDocument.coreProperties（Epic-29）", () => {
  it("PPT 路径同样支持", async () => {
    const doc = PresentationDocument.create();
    doc.coreProperties.title = "PPT deck";
    doc.coreProperties.creator = "Charlie";
    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    expect(reopened.coreProperties.title).toBe("PPT deck");
    expect(reopened.coreProperties.creator).toBe("Charlie");
  });
});
