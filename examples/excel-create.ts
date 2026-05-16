/**
 * 例子：从零构造一份含 3 行 5 列的 xlsx，写到指定路径。
 *
 * 跑法：
 *   bun run examples/excel-create.ts <output.xlsx>
 */

import { Cell, CellValue, Row, SheetData, SpreadsheetDocument } from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-create <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const sd = doc.workbookPart?.worksheetParts[0]?.worksheet.firstChild(SheetData);
  if (sd === undefined) {
    process.stderr.write("error: create() returned without a SheetData root\n");
    process.exit(1);
  }

  const data: readonly (readonly string[])[] = [
    ["Hello", "from", "openxml-ts", "(.NET", "port)"],
    ["row", "2", "with", "5", "cells"],
    ["row", "3", "more", "demo", "data"],
  ];
  for (const cols of data) {
    const r = new Row();
    for (const text of cols) {
      const c = new Cell();
      const v = new CellValue();
      v.text = text;
      // 默认 dataType=str（在 Excel 中按字符串显示，省去 sharedStringTable 索引绑定）
      c.extendedAttributes.set("t", "str");
      c.appendChild(v);
      r.appendChild(c);
    }
    sd.appendChild(r);
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3 rows × 5 cols)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
