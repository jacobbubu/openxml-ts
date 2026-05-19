/**
 * 例子（Epic-45）：演示 Cell.value typed 访问器（number / string / boolean / Date）。
 *
 * 跑法：
 *   bun run examples/excel-cell-value.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  BuiltInNumberFormat,
  Cell,
  Row,
  SheetData,
  SpreadsheetDocument,
  setBuiltInNumberFormat,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-cell-value <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("missing SheetData");

  // ── Row 1: header labels ─────────────────────────────────────────────────
  const headerRow = new Row();
  headerRow.rowIndex = UInt32Value.parse("1");
  for (const [col, label] of [
    ["A", "Type"],
    ["B", "Value (set)"],
    ["C", "Value (read back)"],
  ] as const) {
    const cell = new Cell();
    cell.cellReference = StringValue.parse(`${col}1`);
    cell.value = label;
    headerRow.appendChild(cell);
  }
  sheetData.appendChild(headerRow);

  // ── Row 2: number ────────────────────────────────────────────────────────
  const row2 = new Row();
  row2.rowIndex = UInt32Value.parse("2");
  const numCell = new Cell();
  numCell.cellReference = StringValue.parse("A2");
  numCell.value = "number";
  row2.appendChild(numCell);

  const numValCell = new Cell();
  numValCell.cellReference = StringValue.parse("B2");
  numValCell.value = Math.PI;
  row2.appendChild(numValCell);

  const numReadCell = new Cell();
  numReadCell.cellReference = StringValue.parse("C2");
  numReadCell.value = numValCell.value as number; // read back immediately
  row2.appendChild(numReadCell);
  sheetData.appendChild(row2);

  // ── Row 3: string (inlineStr) ─────────────────────────────────────────────
  const row3 = new Row();
  row3.rowIndex = UInt32Value.parse("3");
  const strLabelCell = new Cell();
  strLabelCell.cellReference = StringValue.parse("A3");
  strLabelCell.value = "string";
  row3.appendChild(strLabelCell);

  const strValCell = new Cell();
  strValCell.cellReference = StringValue.parse("B3");
  strValCell.value = "Hello, Excel!";
  row3.appendChild(strValCell);

  const strReadCell = new Cell();
  strReadCell.cellReference = StringValue.parse("C3");
  strReadCell.value = strValCell.value as string;
  row3.appendChild(strReadCell);
  sheetData.appendChild(row3);

  // ── Row 4: boolean true ──────────────────────────────────────────────────
  const row4 = new Row();
  row4.rowIndex = UInt32Value.parse("4");
  const boolLabelCell = new Cell();
  boolLabelCell.cellReference = StringValue.parse("A4");
  boolLabelCell.value = "boolean (true)";
  row4.appendChild(boolLabelCell);

  const boolValCell = new Cell();
  boolValCell.cellReference = StringValue.parse("B4");
  boolValCell.value = true;
  row4.appendChild(boolValCell);

  const boolReadCell = new Cell();
  boolReadCell.cellReference = StringValue.parse("C4");
  boolReadCell.value = String(boolValCell.value); // read back as string for display
  row4.appendChild(boolReadCell);
  sheetData.appendChild(row4);

  // ── Row 5: boolean false ─────────────────────────────────────────────────
  const row5 = new Row();
  row5.rowIndex = UInt32Value.parse("5");
  const bool2LabelCell = new Cell();
  bool2LabelCell.cellReference = StringValue.parse("A5");
  bool2LabelCell.value = "boolean (false)";
  row5.appendChild(bool2LabelCell);

  const bool2ValCell = new Cell();
  bool2ValCell.cellReference = StringValue.parse("B5");
  bool2ValCell.value = false;
  row5.appendChild(bool2ValCell);

  const bool2ReadCell = new Cell();
  bool2ReadCell.cellReference = StringValue.parse("C5");
  bool2ReadCell.value = String(bool2ValCell.value);
  row5.appendChild(bool2ReadCell);
  sheetData.appendChild(row5);

  // ── Row 6: Date ──────────────────────────────────────────────────────────
  const row6 = new Row();
  row6.rowIndex = UInt32Value.parse("6");
  const dateLabelCell = new Cell();
  dateLabelCell.cellReference = StringValue.parse("A6");
  dateLabelCell.value = "Date (2024-06-15)";
  row6.appendChild(dateLabelCell);

  const dateValCell = new Cell();
  dateValCell.cellReference = StringValue.parse("B6");
  dateValCell.value = new Date(Date.UTC(2024, 5, 15)); // 2024-06-15
  // Apply date format so Excel renders it as a date
  setBuiltInNumberFormat(doc, dateValCell, BuiltInNumberFormat.DATE_SHORT);
  row6.appendChild(dateValCell);

  const dateReadCell = new Cell();
  dateReadCell.cellReference = StringValue.parse("C6");
  // Read back the serial number
  dateReadCell.value = `serial=${dateValCell.value}`;
  row6.appendChild(dateReadCell);
  sheetData.appendChild(row6);

  // ── Row 7: undefined (clear) ──────────────────────────────────────────────
  const row7 = new Row();
  row7.rowIndex = UInt32Value.parse("7");
  const clrLabelCell = new Cell();
  clrLabelCell.cellReference = StringValue.parse("A7");
  clrLabelCell.value = "undefined (clear)";
  row7.appendChild(clrLabelCell);

  const clrValCell = new Cell();
  clrValCell.cellReference = StringValue.parse("B7");
  clrValCell.value = 999;
  clrValCell.value = undefined; // clear it
  row7.appendChild(clrValCell);

  const clrReadCell = new Cell();
  clrReadCell.cellReference = StringValue.parse("C7");
  clrReadCell.value = String(clrValCell.value); // should be "undefined"
  row7.appendChild(clrReadCell);
  sheetData.appendChild(row7);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (7 rows demonstrating Cell.value typed accessor)\n`);

  // ── Verify by reopening ──────────────────────────────────────────────────
  process.stdout.write("Verifying by reopening…\n");
  const bytes = await doc.saveAsBytesAsync();
  const reopened = await SpreadsheetDocument.openAsync(bytes);
  // biome-ignore lint/style/noNonNullAssertion: parts are always present in create()
  const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];

  const get = (ref: string) => cells.find((c) => c.cellReference?.toString() === ref)?.value;

  process.stdout.write(`  B2 (number)  : ${get("B2")} (expected 3.14159)\n`);
  process.stdout.write(`  B3 (string)  : ${get("B3")} (expected "Hello, Excel!")\n`);
  process.stdout.write(`  B4 (bool T)  : ${get("B4")} (expected true)\n`);
  process.stdout.write(`  B5 (bool F)  : ${get("B5")} (expected false)\n`);
  process.stdout.write(`  B6 (date ser): ${get("B6")} (expected ~45458)\n`);
  process.stdout.write(`  B7 (cleared) : ${get("B7")} (expected undefined)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
