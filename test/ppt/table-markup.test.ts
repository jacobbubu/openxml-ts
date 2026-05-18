/**
 * Story-17.1 / 17.2：PPT 表格 markup 助手单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import { OpenXmlPackageError } from "../../src/packaging/errors.js";
import {
  PresentationDocument,
  createSlideTable,
  getSlideTableCellText,
  setSlideTableCellText,
} from "../../src/ppt/index.js";

describe("createSlideTable（Story-17.1）", () => {
  it("3×2 表节点结构：含 nvGraphicFramePr / xfrm / a:tbl / 2 列 / 3 行 / 6 个 tc", () => {
    const table = createSlideTable(3, 2);
    const xml = serialize(table);

    expect(xml).toContain("<p:graphicFrame");
    expect(xml).toContain('uri="http://schemas.openxmlformats.org/drawingml/2006/table"');
    expect(xml).toContain('<a:tblPr firstRow="1" bandRow="1"');
    expect((xml.match(/<a:gridCol/g) ?? []).length).toBe(2);
    expect((xml.match(/<a:tr /g) ?? []).length).toBe(3);
    expect((xml.match(/<a:tc>/g) ?? []).length).toBe(6);
  });

  it("默认 offset / extent，列宽 / 行高均分", () => {
    const table = createSlideTable(2, 4);
    const xml = serialize(table);
    expect(xml).toContain('<a:off x="914400" y="914400"'); // 1 inch
    expect(xml).toContain('<a:ext cx="5486400"'); // 6 inch
    // 4 列均分 5486400 / 4 = 1371600
    expect(xml).toContain('w="1371600"');
  });

  it("自定义 offset / extent / columnWidthsEmu / rowHeightsEmu", () => {
    const table = createSlideTable(2, 3, {
      offset: { xEmu: 500000, yEmu: 600000 },
      extent: { cxEmu: 3000000, cyEmu: 700000 },
      columnWidthsEmu: [1000000, 1000000, 1000000],
      rowHeightsEmu: [300000, 400000],
      id: 42,
      name: "Sales",
    });
    const xml = serialize(table);
    expect(xml).toContain('<a:off x="500000" y="600000"');
    expect(xml).toContain('<a:ext cx="3000000" cy="700000"');
    expect((xml.match(/w="1000000"/g) ?? []).length).toBe(3);
    expect(xml).toContain('h="300000"');
    expect(xml).toContain('h="400000"');
    expect(xml).toContain('id="42"');
    expect(xml).toContain('name="Sales"');
  });

  it("rows/cols ≤ 0 抛 friendly 错", () => {
    expect(() => createSlideTable(0, 1)).toThrow(OpenXmlPackageError);
    expect(() => createSlideTable(1, -2)).toThrow(/positive integers/);
  });

  it("columnWidthsEmu 长度不匹配抛 friendly 错", () => {
    expect(() => createSlideTable(2, 3, { columnWidthsEmu: [1, 2] })).toThrow(
      /columnWidthsEmu.length=2 != cols=3/,
    );
  });
});

describe("setSlideTableCellText / getSlideTableCellText（Story-17.2）", () => {
  it("set 后 get 拿回相同文本", () => {
    const table = createSlideTable(2, 3);
    setSlideTableCellText(table, 0, 0, "Header A");
    setSlideTableCellText(table, 0, 1, "Header B");
    setSlideTableCellText(table, 1, 2, "Cell (1,2)");

    expect(getSlideTableCellText(table, 0, 0)).toBe("Header A");
    expect(getSlideTableCellText(table, 0, 1)).toBe("Header B");
    expect(getSlideTableCellText(table, 1, 2)).toBe("Cell (1,2)");
    expect(getSlideTableCellText(table, 1, 0)).toBe(""); // 没设过的格
  });

  it("set 同一格两次 → 第二次覆盖", () => {
    const table = createSlideTable(1, 1);
    setSlideTableCellText(table, 0, 0, "first");
    setSlideTableCellText(table, 0, 0, "second");
    expect(getSlideTableCellText(table, 0, 0)).toBe("second");
  });

  it("row 越界抛 friendly 错", () => {
    const table = createSlideTable(2, 2);
    expect(() => setSlideTableCellText(table, 5, 0, "x")).toThrow(/row 5 out of range/);
  });

  it("col 越界抛 friendly 错", () => {
    const table = createSlideTable(2, 2);
    expect(() => setSlideTableCellText(table, 0, 9, "x")).toThrow(/col 9 out of range/);
  });
});

describe("端到端 PPT 表格 round-trip", () => {
  it("加表 + 填文本 → save → reopen → 单元格文本保留", async () => {
    const doc = PresentationDocument.create();
    const slide = doc.presentationPart!.slideParts[0]!.slide;
    const cSld = slide.firstChild()!;
    const spTree = [...cSld.children].find((c) => c.localName === "spTree") as {
      appendChild: (e: unknown) => void;
    };

    const table = createSlideTable(2, 2);
    setSlideTableCellText(table, 0, 0, "A1");
    setSlideTableCellText(table, 0, 1, "B1");
    setSlideTableCellText(table, 1, 0, "A2");
    setSlideTableCellText(table, 1, 1, "B2");
    spTree.appendChild(table);

    const out = await doc.saveAsBytesAsync();
    expect(out.byteLength).toBeGreaterThan(0);

    const reopened = await PresentationDocument.openAsync(out);
    const reSlide = reopened.presentationPart!.slideParts[0]!.slide;
    const reCSld = reSlide.firstChild()!;
    const reSpTree = [...reCSld.children].find((c) => c.localName === "spTree")!;
    const reTable = [...reSpTree.children].find((c) => c.localName === "graphicFrame")!;
    expect(getSlideTableCellText(reTable, 0, 0)).toBe("A1");
    expect(getSlideTableCellText(reTable, 1, 1)).toBe("B2");
  });
});
