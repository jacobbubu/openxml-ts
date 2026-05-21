/**
 * 例子（Epic-33）：演示 setColumnWidth + setRowHeight。
 *
 * 跑法：
 *   bun run examples/excel-column-row-sizing.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  Cell,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  setColumnWidth,
  setRowHeight,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-column-row-sizing <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("expected SheetData");

  // 列 1（标题列）宽 30，列 2-3 宽 15，列 4（备注）宽 50
  setColumnWidth(ws, { from: 1, to: 1, widthChars: 30 });
  setColumnWidth(ws, { from: 2, to: 3, widthChars: 15 });
  setColumnWidth(ws, { from: 4, to: 4, widthChars: 50 });

  // 表头行高 40 磅（凸显），数据行高 18 磅
  function addRow(index: number, height: number, values: string[]): void {
    const r = new Row();
    r.rowIndex = UInt32Value.parse(String(index));
    setRowHeight(r, height);
    for (let c = 0; c < values.length; c += 1) {
      const cell = new Cell();
      cell.cellReference = StringValue.parse(
        `${String.fromCharCode("A".charCodeAt(0) + c)}${index}`,
      );
      cell.dataType = StringValue.parse("str");
      const v = new CellValue();
      v.text = values[c]!;
      cell.appendChild(v);
      r.appendChild(cell);
    }
    sheetData.appendChild(r);
  }

  addRow(1, 40, ["商品名称", "数量", "单价", "备注（最长一列）"]);
  for (let i = 2; i <= 5; i += 1) {
    addRow(i, 18, [`商品-${i}`, String(i * 3), String(9.9), `备注行 ${i}：本行较长`]);
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (column widths 30/15/15/50 + heights 40/18×4)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
