/**
 * Story-3.2 验证：WorkbookPart + WorksheetPart typed Parts。
 *
 * 不依赖 SpreadsheetDocument 门面（Story-3.5 才落地）。直接把 typed Part
 * 接到 MemoryOpenXmlPackage 上验证：
 * - typed root 懒加载 + 缓存语义
 * - WorkbookPart.worksheetParts 按 part-level 关系顺序解析
 * - flushAsync 写回字节
 */

import { describe, expect, it } from "vitest";
import { registerSpreadsheetElements } from "../../src/excel/generated/_registry.js";
import { WorkbookPart, WorksheetPart } from "../../src/excel/parts/index.js";
import { ElementRegistry } from "../../src/index.js";
import { createInMemory } from "../../src/packaging/index.js";
import type { PartUri } from "../../src/packaging/interfaces/types.js";

const XNS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main";

function makeRegistry(): ElementRegistry {
  const r = new ElementRegistry();
  registerSpreadsheetElements(r);
  return r;
}

describe("WorkbookPart · 核心契约", () => {
  it("static contentType / relationshipType 与 OPC 规范一致", () => {
    expect(WorkbookPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml",
    );
    expect(WorkbookPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument",
    );
  });

  it("get workbook 懒加载真实 workbook.xml → typed Workbook 根；多次访问同实例", async () => {
    const pkg = createInMemory();
    const wbUri = "/xl/workbook.xml" as PartUri;
    const part = pkg.createPart(wbUri, WorkbookPart.contentType);
    await part.writeAsync(
      `<x:workbook xmlns:x="${XNS}"><x:sheets><x:sheet name="Sheet1" sheetId="1" r:id="rId1" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"/></x:sheets></x:workbook>`,
    );

    const wp = new WorkbookPart(part, makeRegistry(), pkg);
    const wb1 = wp.workbook;
    const wb2 = wp.workbook;
    expect(wb1).toBe(wb2);
    expect(wb1.localName).toBe("workbook");
    expect(wb1.namespaceUri).toBe(XNS);
    expect(wp.isLoaded).toBe(true);
  });

  it("set workbook 替换 typed root；flushAsync 把新树写回 part 字节", async () => {
    const pkg = createInMemory();
    const wbUri = "/xl/workbook.xml" as PartUri;
    const part = pkg.createPart(wbUri, WorkbookPart.contentType);
    await part.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    const wp = new WorkbookPart(part, makeRegistry(), pkg);
    const fresh = wp.workbook; // load empty
    expect(fresh.localName).toBe("workbook");
    wp.workbook = fresh; // 复用同一引用 + 标 loaded
    await wp.flushAsync();

    const bytes = (part as { snapshot(): Uint8Array }).snapshot();
    expect(new TextDecoder().decode(bytes)).toContain("workbook");
  });
});

describe("WorkbookPart.worksheetParts · 按关系顺序", () => {
  it("零 worksheet 关系 → 空数组", async () => {
    const pkg = createInMemory();
    const part = pkg.createPart("/xl/workbook.xml" as PartUri, WorkbookPart.contentType);
    await part.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    const wp = new WorkbookPart(part, makeRegistry(), pkg);
    expect(wp.worksheetParts).toHaveLength(0);
  });

  it("两个 worksheet 关系 → 按 part-level 关系顺序返回 WorksheetPart 数组；多次访问同数组同实例", async () => {
    const pkg = createInMemory();
    const wbUri = "/xl/workbook.xml" as PartUri;
    const part = pkg.createPart(wbUri, WorkbookPart.contentType);
    await part.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    const ws1Uri = "/xl/worksheets/sheet1.xml" as PartUri;
    const ws2Uri = "/xl/worksheets/sheet2.xml" as PartUri;
    pkg.createPart(ws1Uri, WorksheetPart.contentType);
    pkg.createPart(ws2Uri, WorksheetPart.contentType);

    part.relationships.create({
      type: WorksheetPart.relationshipType,
      target: "worksheets/sheet1.xml",
      targetMode: "internal",
    });
    part.relationships.create({
      type: WorksheetPart.relationshipType,
      target: "worksheets/sheet2.xml",
      targetMode: "internal",
    });

    const wp = new WorkbookPart(part, makeRegistry(), pkg);
    const ws = wp.worksheetParts;
    expect(ws).toHaveLength(2);
    expect(ws[0]).toBeInstanceOf(WorksheetPart);
    expect(ws[1]).toBeInstanceOf(WorksheetPart);
    expect(ws[0]?.part.uri).toBe(ws1Uri);
    expect(ws[1]?.part.uri).toBe(ws2Uri);
    // 缓存：多次访问返回同一数组引用
    expect(wp.worksheetParts).toBe(ws);
  });

  it("过滤无关 relationship 类型；过滤指向不存在 Part 的关系", async () => {
    const pkg = createInMemory();
    const wbUri = "/xl/workbook.xml" as PartUri;
    const part = pkg.createPart(wbUri, WorkbookPart.contentType);
    await part.writeAsync(`<x:workbook xmlns:x="${XNS}"/>`);

    pkg.createPart("/xl/worksheets/sheet1.xml" as PartUri, WorksheetPart.contentType);
    part.relationships.create({
      type: WorksheetPart.relationshipType,
      target: "worksheets/sheet1.xml",
      targetMode: "internal",
    });
    // 干扰：theme 关系不应被算作 worksheet
    part.relationships.create({
      type: "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme",
      target: "theme/theme1.xml",
      targetMode: "internal",
    });
    // 干扰：指向不存在的 worksheet（Part 没创建）
    part.relationships.create({
      type: WorksheetPart.relationshipType,
      target: "worksheets/sheet99.xml",
      targetMode: "internal",
    });

    const wp = new WorkbookPart(part, makeRegistry(), pkg);
    expect(wp.worksheetParts).toHaveLength(1);
    expect(wp.worksheetParts[0]?.part.uri).toBe("/xl/worksheets/sheet1.xml");
  });
});

describe("WorksheetPart · 核心契约", () => {
  it("static contentType / relationshipType 与 OPC 规范一致", () => {
    expect(WorksheetPart.contentType).toBe(
      "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml",
    );
    expect(WorksheetPart.relationshipType).toBe(
      "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet",
    );
  });

  it("get worksheet 懒加载 → typed Worksheet 根；set worksheet 替换；flushAsync 写回", async () => {
    const pkg = createInMemory();
    const wsUri = "/xl/worksheets/sheet1.xml" as PartUri;
    const part = pkg.createPart(wsUri, WorksheetPart.contentType);
    await part.writeAsync(
      `<x:worksheet xmlns:x="${XNS}"><x:sheetData><x:row r="1"><x:c r="A1"><x:v>42</x:v></x:c></x:row></x:sheetData></x:worksheet>`,
    );

    const wp = new WorksheetPart(part, makeRegistry());
    const ws = wp.worksheet;
    expect(ws.localName).toBe("worksheet");
    expect(ws.namespaceUri).toBe(XNS);

    wp.worksheet = ws;
    await wp.flushAsync();

    const reread = new WorksheetPart(part, makeRegistry());
    expect(reread.worksheet.localName).toBe("worksheet");
  });
});
