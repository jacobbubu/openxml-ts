/**
 * 例子：从零构造一份含 3 行 5 列的 xlsx，写到指定路径。
 *
 * 跑法：
 *   bun run examples/excel-create.ts <output.xlsx>
 */

import {
  Cell,
  InlineString,
  Row,
  SheetData,
  SpreadsheetDocument,
  Text,
} from "../src/excel/index.js";

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
  for (let rowIdx = 0; rowIdx < data.length; rowIdx += 1) {
    const cols = data[rowIdx] as readonly string[];
    const r = new Row();
    // Excel Desktop 用 `<row r="N">` 推断行号；缺这个属性会弹「Repaired」。
    r.extendedAttributes.set("r", String(rowIdx + 1));
    for (let colIdx = 0; colIdx < cols.length; colIdx += 1) {
      const text = cols[colIdx] as string;
      const c = new Cell();
      // 同上，`r="A1"` / `r="B1"` 给 Excel 单元格引用；缺会让 Excel strip 内容。
      c.extendedAttributes.set("r", `${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`);
      // dataType="inlineStr" + `<is><t>text</t></is>`：在 cell 里直接放字符串字面值，
      // 不走 sharedStringTable。`t="str"` 是形式上为「formula 返回的字符串」，没
      // <f> 时 Excel Desktop 会弹「Repaired」警告，因此不要用。
      c.extendedAttributes.set("t", "inlineStr");
      const is = new InlineString();
      const t = new Text();
      t.text = text;
      is.appendChild(t);
      c.appendChild(is);
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
