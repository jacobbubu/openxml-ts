/**
 * Generates an excel template with {{client}} placeholders for use as input to excel-replace.ts.
 * Usage: bun run make-excel-replace-input.ts <output.xlsx>
 */
import { Cell, CellValue, Row, SheetData, SpreadsheetDocument } from "../../src/excel/index.js";

const [outputPath] = process.argv.slice(2);
if (!outputPath) {
  process.stderr.write("usage: make-excel-replace-input.ts <output.xlsx>\n");
  process.exit(2);
}

const doc = SpreadsheetDocument.create();
const sd = doc.workbookPart?.worksheetParts[0]?.worksheet.firstChild(SheetData);
if (!sd) {
  process.stderr.write("error: no SheetData\n");
  process.exit(1);
}

const rows: Array<[string, string]> = [
  ["A1", "Dear {{client}},"],
  ["A2", "Thank you, {{client}}."],
];

for (let i = 0; i < rows.length; i++) {
  const [ref, value] = rows[i]!;
  const r = new Row();
  r.extendedAttributes.set("r", String(i + 1));
  const c = new Cell();
  c.extendedAttributes.set("r", ref);
  // Use dataType="str" (formula string) so excel-replace.ts CellValue path works
  c.extendedAttributes.set("t", "str");
  const v = new CellValue();
  v.text = value;
  c.appendChild(v);
  r.appendChild(c);
  sd.appendChild(r);
}

await doc.saveAsAsync(outputPath);
process.stdout.write(`Wrote ${outputPath}\n`);
