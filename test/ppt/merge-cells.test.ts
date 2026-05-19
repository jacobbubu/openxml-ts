/**
 * Story-20：PPT 表格 mergeSlideTableCells 单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  PresentationDocument,
  createSlideTable,
  getSlideTableCellText,
  mergeSlideTableCells,
  setSlideTableCellText,
} from "../../src/ppt/index.js";

describe("mergeSlideTableCells（Story-20）", () => {
  it("水平合并 2 格：主格 gridSpan=2，第二格 hMerge=1", () => {
    const table = createSlideTable(2, 3);
    mergeSlideTableCells(table, 0, 0, 0, 1);
    const xml = serialize(table);
    // 主格 tc gridSpan="2"
    expect(xml).toMatch(/<a:tc gridSpan="2">/);
    // 被合并 cell hMerge="1"
    expect(xml).toMatch(/<a:tc hMerge="1">/);
  });

  it("垂直合并 2 格：主格 rowSpan=2，第二格 vMerge=1", () => {
    const table = createSlideTable(3, 2);
    mergeSlideTableCells(table, 0, 0, 1, 0);
    const xml = serialize(table);
    expect(xml).toMatch(/<a:tc rowSpan="2">/);
    expect(xml).toMatch(/<a:tc vMerge="1">/);
  });

  it("2×2 矩形合并：主格 gridSpan=2 + rowSpan=2；3 个其它格 hMerge/vMerge 叠加", () => {
    const table = createSlideTable(3, 3);
    mergeSlideTableCells(table, 0, 0, 1, 1);
    const xml = serialize(table);
    // 主格
    expect(xml).toMatch(/<a:tc gridSpan="2" rowSpan="2">/);
    // 同行右侧 cell：hMerge="1"
    expect(xml).toMatch(/<a:tc hMerge="1">/);
    // 同列下方 cell：vMerge="1"
    expect(xml).toMatch(/<a:tc vMerge="1">/);
    // 对角 cell：hMerge + vMerge 同时
    expect(xml).toMatch(/<a:tc hMerge="1" vMerge="1">/);
  });

  it("主格保留文本，被合并 cell 文本仍可独立读（写入序保留）", () => {
    const table = createSlideTable(2, 2);
    setSlideTableCellText(table, 0, 0, "main");
    setSlideTableCellText(table, 0, 1, "ghost");
    mergeSlideTableCells(table, 0, 0, 0, 1);
    expect(getSlideTableCellText(table, 0, 0)).toBe("main");
    expect(getSlideTableCellText(table, 0, 1)).toBe("ghost"); // 助手不删除文本
  });

  it("范围反向抛 friendly 错", () => {
    const table = createSlideTable(3, 3);
    expect(() => mergeSlideTableCells(table, 1, 1, 0, 0)).toThrow(OpenXmlPackageError);
    expect(() => mergeSlideTableCells(table, 1, 1, 0, 0)).toThrow(/range reversed/);
  });

  it("行/列越界抛 friendly 错（findCell 路径）", () => {
    const table = createSlideTable(2, 2);
    expect(() => mergeSlideTableCells(table, 0, 0, 5, 1)).toThrow(/out of range/);
  });

  it("负数下标抛 friendly 错", () => {
    const table = createSlideTable(2, 2);
    expect(() => mergeSlideTableCells(table, -1, 0, 0, 0)).toThrow(/row\/col must be ≥ 0/);
  });

  it("1×1 合并是 no-op（gridSpan/rowSpan 都 = 1，不写属性）", () => {
    const table = createSlideTable(2, 2);
    mergeSlideTableCells(table, 0, 0, 0, 0);
    const xml = serialize(table);
    expect(xml).not.toContain('gridSpan="1"');
    expect(xml).not.toContain('rowSpan="1"');
  });
});

describe("端到端：merge → save → reopen 后 merge 属性保留", () => {
  it("水平合并 + save + reopen 后 gridSpan / hMerge 仍在", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    const cSld = slide.firstChild()!;
    const spTree = [...cSld.children].find((c) => c.localName === "spTree") as {
      appendChild: (e: unknown) => void;
    };
    const table = createSlideTable(2, 3);
    setSlideTableCellText(table, 0, 0, "Header (spans 3)");
    mergeSlideTableCells(table, 0, 0, 0, 2);
    spTree.appendChild(table);

    const out = await doc.saveAsBytesAsync();
    const reopened = await PresentationDocument.openAsync(out);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    const reCSld = reSlide.firstChild()!;
    const reSpTree = [...reCSld.children].find((c) => c.localName === "spTree")!;
    const reTable = [...reSpTree.children].find((c) => c.localName === "graphicFrame")!;
    expect(getSlideTableCellText(reTable, 0, 0)).toBe("Header (spans 3)");
    const reXml = serialize(reTable);
    expect(reXml).toContain("gridSpan");
    expect(reXml).toContain("hMerge");
  });
});
