/**
 * 例子（Epic-32）：演示 setFreezePanes 冻结首行 + 首列。
 *
 * 跑法：
 *   bun run examples/excel-freeze-panes.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  Cell,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  setFreezePanes,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-freeze-panes <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("expected default SheetData");

  function addRow(index: number, values: string[]): void {
    const r = new Row();
    r.rowIndex = UInt32Value.parse(String(index));
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

  addRow(1, ["Header A", "Header B", "Header C", "Header D"]);
  for (let i = 2; i <= 12; i += 1) {
    addRow(i, [`row${i}`, `B${i}`, `C${i}`, `D${i}`]);
  }

  // 冻结首行 + 首列（标题行/列在滚动时常驻）
  setFreezePanes(ws, { rows: 1, columns: 1 });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (12 rows × 4 cols with rows=1 columns=1 freeze)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
