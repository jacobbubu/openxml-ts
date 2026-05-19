/**
 * 例子（Epic-53）：演示 mergeCells 合并单元格。
 *
 * 跑法：
 *   bun run examples/excel-merge-cells.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  Cell,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  getMergedRanges,
  mergeCells,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-merge-cells <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  if (ws === undefined) throw new Error("expected default worksheet");
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("expected default SheetData");

  // 添加标题行（A1:D1 合并为大标题）
  const titleRow = new Row();
  titleRow.rowIndex = UInt32Value.parse("1");
  const titleCell = new Cell();
  titleCell.cellReference = StringValue.parse("A1");
  titleCell.dataType = StringValue.parse("str");
  const titleVal = new CellValue();
  titleVal.text = "2024 年度销售报告";
  titleCell.appendChild(titleVal);
  titleRow.appendChild(titleCell);
  sheetData.appendChild(titleRow);

  // 添加分组标题行（A2:B2 为"一季度"，C2:D2 为"二季度"）
  const groupRow = new Row();
  groupRow.rowIndex = UInt32Value.parse("2");
  for (const [ref, text] of [
    ["A2", "一季度"],
    ["C2", "二季度"],
  ] as const) {
    const cell = new Cell();
    cell.cellReference = StringValue.parse(ref);
    cell.dataType = StringValue.parse("str");
    const v = new CellValue();
    v.text = text;
    cell.appendChild(v);
    groupRow.appendChild(cell);
  }
  sheetData.appendChild(groupRow);

  // 添加列标题行
  const headerRow = new Row();
  headerRow.rowIndex = UInt32Value.parse("3");
  for (const [ref, text] of [
    ["A3", "产品"],
    ["B3", "销量"],
    ["C3", "产品"],
    ["D3", "销量"],
  ] as const) {
    const cell = new Cell();
    cell.cellReference = StringValue.parse(ref);
    cell.dataType = StringValue.parse("str");
    const v = new CellValue();
    v.text = text;
    cell.appendChild(v);
    headerRow.appendChild(cell);
  }
  sheetData.appendChild(headerRow);

  // 添加数据行
  const data = [
    ["手机", "1200", "平板", "800"],
    ["笔记本", "560", "显示器", "340"],
    ["耳机", "2100", "键盘", "970"],
  ];
  for (let i = 0; i < data.length; i += 1) {
    const row = new Row();
    const rowIdx = i + 4;
    row.rowIndex = UInt32Value.parse(String(rowIdx));
    const cols = ["A", "B", "C", "D"];
    const rowData = data[i] ?? [];
    for (let c = 0; c < rowData.length; c += 1) {
      const cell = new Cell();
      cell.cellReference = StringValue.parse(`${cols[c]}${rowIdx}`);
      cell.dataType = StringValue.parse("str");
      const v = new CellValue();
      v.text = rowData[c] ?? "";
      cell.appendChild(v);
      row.appendChild(cell);
    }
    sheetData.appendChild(row);
  }

  // 合并单元格：标题行跨 A1:D1，两个季度分组各跨两列
  mergeCells(ws, ["A1:D1", "A2:B2", "C2:D2"]);

  const ranges = getMergedRanges(ws);
  process.stdout.write(`Merged ranges: ${ranges.join(", ")}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3 merged regions)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
