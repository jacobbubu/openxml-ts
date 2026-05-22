/**
 * Story-21：Word 表格 markup 助手 + cell 文本访问器单元测试。
 */

import { describe, expect, it } from "vitest";
import { serialize } from "../../src/element/index.js";
import {
  Paragraph,
  Table,
  TableCell,
  TableRow,
  WordprocessingDocument,
  createDocumentTable,
  getDocumentTableCellText,
  setDocumentTableCellText,
} from "../../src/word/index.js";

describe("createDocumentTable（Story-21.1）", () => {
  it("3×2 表节点结构：含 tblPr / tblGrid + 2 列 / 3 行 / 6 个 tc + 每格自带 <w:p>", () => {
    const table = createDocumentTable(3, 2);
    expect(table).toBeInstanceOf(Table);
    const rows = [...table.descendants(TableRow)];
    expect(rows).toHaveLength(3);
    const cells = [...table.descendants(TableCell)];
    expect(cells).toHaveLength(6);
    for (const tc of cells) {
      expect([...tc.descendants(Paragraph)]).not.toHaveLength(0);
    }
    const xml = serialize(table);
    // Epic-98: root element 现在包含 xmlns:w 声明，所以不再是裸 <w:tbl>
    expect(xml).toContain("<w:tbl");
    expect(xml).toContain("<w:tblPr>");
    expect((xml.match(/<w:gridCol/g) ?? []).length).toBe(2);
  });

  it("默认 totalWidthDxa=9000，列宽均分", () => {
    const table = createDocumentTable(1, 3);
    const xml = serialize(table);
    expect(xml).toContain('w:w="9000"'); // tblW
    expect((xml.match(/w:w="3000"/g) ?? []).length).toBeGreaterThanOrEqual(3); // gridCol 各 3000
  });

  it("自定义 totalWidthDxa + columnWidthsDxa", () => {
    const table = createDocumentTable(1, 3, {
      totalWidthDxa: 6000,
      columnWidthsDxa: [1000, 2000, 3000],
    });
    const xml = serialize(table);
    expect(xml).toContain('w:w="6000"');
    expect(xml).toContain('w:w="1000"');
    expect(xml).toContain('w:w="2000"');
    expect(xml).toContain('w:w="3000"');
  });

  it("默认带 borders；borders=false 跳过", () => {
    const withBorders = createDocumentTable(2, 2);
    expect(serialize(withBorders)).toContain("<w:tblBorders>");
    const noBorders = createDocumentTable(2, 2, { borders: false });
    expect(serialize(noBorders)).not.toContain("<w:tblBorders>");
  });

  it("rows/cols ≤ 0 抛 friendly 错", () => {
    expect(() => createDocumentTable(0, 1)).toThrow(/positive integers/);
    expect(() => createDocumentTable(1, -1)).toThrow(/positive integers/);
  });

  it("columnWidthsDxa 长度不匹配抛 friendly 错", () => {
    expect(() => createDocumentTable(1, 3, { columnWidthsDxa: [100, 200] })).toThrow(
      /columnWidthsDxa.length=2 != cols=3/,
    );
  });
});

describe("setDocumentTableCellText / getDocumentTableCellText（Story-21.2）", () => {
  it("set 后 get 拿回相同文本", () => {
    const table = createDocumentTable(2, 3);
    setDocumentTableCellText(table, 0, 0, "Header A");
    setDocumentTableCellText(table, 0, 1, "Header B");
    setDocumentTableCellText(table, 1, 2, "Cell (1,2)");
    expect(getDocumentTableCellText(table, 0, 0)).toBe("Header A");
    expect(getDocumentTableCellText(table, 0, 1)).toBe("Header B");
    expect(getDocumentTableCellText(table, 1, 2)).toBe("Cell (1,2)");
    expect(getDocumentTableCellText(table, 1, 0)).toBe("");
  });

  it("set 同一格两次 → 第二次覆盖", () => {
    const table = createDocumentTable(1, 1);
    setDocumentTableCellText(table, 0, 0, "first");
    setDocumentTableCellText(table, 0, 0, "second");
    expect(getDocumentTableCellText(table, 0, 0)).toBe("second");
  });

  it("row 越界抛 friendly 错", () => {
    const table = createDocumentTable(2, 2);
    expect(() => setDocumentTableCellText(table, 5, 0, "x")).toThrow(/row 5 out of range/);
  });

  it("col 越界抛 friendly 错", () => {
    const table = createDocumentTable(2, 2);
    expect(() => setDocumentTableCellText(table, 0, 9, "x")).toThrow(/col 9 out of range/);
  });

  it("前导/尾随空格自动 xml:space=preserve", () => {
    const table = createDocumentTable(1, 1);
    setDocumentTableCellText(table, 0, 0, " padded ");
    expect(serialize(table)).toContain('xml:space="preserve"');
  });
});

describe("端到端 Word 表格 round-trip", () => {
  it("加表 + 填文本 → save → reopen → 单元格文本保留", async () => {
    const doc = WordprocessingDocument.create();
    const body = doc.mainDocumentPart!.document.firstChild()!;
    const table = createDocumentTable(2, 2);
    setDocumentTableCellText(table, 0, 0, "A1");
    setDocumentTableCellText(table, 0, 1, "B1");
    setDocumentTableCellText(table, 1, 0, "A2");
    setDocumentTableCellText(table, 1, 1, "B2");
    (body as { appendChild: (e: unknown) => void }).appendChild(table);

    const out = await doc.saveAsBytesAsync();
    const reopened = await WordprocessingDocument.openAsync(out);
    const reTable = [...reopened.mainDocumentPart!.document.descendants(Table)][0];
    expect(reTable).toBeDefined();
    expect(getDocumentTableCellText(reTable!, 0, 0)).toBe("A1");
    expect(getDocumentTableCellText(reTable!, 1, 1)).toBe("B2");
  });
});
