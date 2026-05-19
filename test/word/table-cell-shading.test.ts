/**
 * Epic-36：TableCell.shading 访问器单测。
 */

import { describe, expect, it } from "vitest";
import {
  Paragraph,
  Shading,
  TableCell,
  TableCellProperties,
  WordprocessingDocument,
  createDocumentTable,
} from "../../src/word/index.js";

describe("TableCell.shading", () => {
  it("undefined when tcPr 不存在", () => {
    const tc = new TableCell();
    expect(tc.shading).toBeUndefined();
  });

  it("set fill 自动创建 tcPr+shd", () => {
    const tc = new TableCell();
    tc.shading = { fill: "FFFF00" };
    const tcPr = tc.firstChild(TableCellProperties);
    const shd = tcPr?.firstChild(Shading);
    expect(shd?.fill?.toString()).toBe("FFFF00");
  });

  it("get 读全部字段", () => {
    const tc = new TableCell();
    tc.shading = { fill: "FFFF00", color: "auto", pattern: "clear" };
    expect(tc.shading).toEqual({ fill: "FFFF00", color: "auto", pattern: "clear" });
  });

  it("set merge：partial 写入不清空已有字段", () => {
    const tc = new TableCell();
    tc.shading = { fill: "FFFF00", pattern: "clear" };
    tc.shading = { color: "FF0000" };
    expect(tc.shading).toEqual({ fill: "FFFF00", color: "FF0000", pattern: "clear" });
  });

  it("set undefined 删 shd，保留 tcPr 其它子", () => {
    const tc = new TableCell();
    tc.shading = { fill: "FFFF00" };
    tc.shading = undefined;
    expect(tc.shading).toBeUndefined();
  });

  it("setter 把 tcPr 插到第一个 child", () => {
    const tc = new TableCell();
    const p = new Paragraph();
    tc.appendChild(p);
    tc.shading = { fill: "00FF00" };
    expect(tc.children.at(0)).toBeInstanceOf(TableCellProperties);
    expect(tc.children.at(1)).toBe(p);
  });

  it("多次 set 同一字段覆盖（不残留旧值）", () => {
    const tc = new TableCell();
    tc.shading = { fill: "FFFF00" };
    tc.shading = { fill: "00FF00" };
    expect(tc.shading?.fill).toBe("00FF00");
  });

  it("round-trip：save → reopen 后 shading 完整", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const table = createDocumentTable(1, 2);
    const headerCells = [...table.descendants(TableCell)];
    headerCells[0]!.shading = { fill: "FFFF00", pattern: "clear" };
    headerCells[1]!.shading = { fill: "00FF00", pattern: "clear" };
    (body as { appendChild: (e: unknown) => void }).appendChild(table);

    const bytes = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(bytes);
    const cells = [...reopened.mainDocumentPart!.document.descendants(TableCell)];
    expect(cells[0]?.shading?.fill).toBe("FFFF00");
    expect(cells[1]?.shading?.fill).toBe("00FF00");
  });
});
