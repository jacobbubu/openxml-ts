/**
 * 例子（Epic-44）：演示 setBuiltInNumberFormat（货币 / 百分比 / 日期 内建格式）。
 *
 * 跑法：
 *   bun run examples/excel-number-format.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  BuiltInNumberFormat,
  Cell,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  setBuiltInNumberFormat,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-number-format <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart!.worksheetParts[0]!.worksheet;
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("missing SheetData");

  function addRow(idx: number, fmt: number | undefined, raw: string, label: string): void {
    const row = new Row();
    row.rowIndex = UInt32Value.parse(String(idx));
    const labelCell = new Cell();
    labelCell.cellReference = StringValue.parse(`A${idx}`);
    labelCell.dataType = StringValue.parse("str");
    const lv = new CellValue();
    lv.text = label;
    labelCell.appendChild(lv);
    row.appendChild(labelCell);

    const valueCell = new Cell();
    valueCell.cellReference = StringValue.parse(`B${idx}`);
    const v = new CellValue();
    v.text = raw;
    valueCell.appendChild(v);
    if (fmt !== undefined) setBuiltInNumberFormat(doc, valueCell, fmt);
    row.appendChild(valueCell);
    sheetData.appendChild(row);
  }

  addRow(1, BuiltInNumberFormat.INTEGER, "1234", "Integer:");
  addRow(2, BuiltInNumberFormat.DECIMAL_2, "1234.5", "2 decimals:");
  addRow(3, BuiltInNumberFormat.THOUSANDS_DECIMAL_2, "1234567.89", "Thousands+2:");
  addRow(4, BuiltInNumberFormat.PERCENT_DECIMAL_2, "0.1234", "Percent:");
  addRow(5, BuiltInNumberFormat.CURRENCY, "1234.5", "Currency:");
  addRow(6, BuiltInNumberFormat.DATE_SHORT, "45431", "Date (serial):");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (6 rows of built-in number formats)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
