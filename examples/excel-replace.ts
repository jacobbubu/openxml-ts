/**
 * 例子：打开 xlsx，把每个含 `{{client}}` 的 Cell 文本替换为指定值，写回新文件。
 *
 * 仅替换 `dataType="str"` / `"inlineStr"` / 默认无 dataType（即不走 sharedString）的
 * cellValue.text；走 sharedString 的 cell 需要更复杂的 intern + 索引更新——本例
 * 不覆盖该路径。
 *
 * 跑法：
 *   bun run examples/excel-replace.ts <input.xlsx> <output.xlsx> [<client-name>]
 */

import { Cell, CellValue, SpreadsheetDocument } from "../src/excel/index.js";

async function main(): Promise<void> {
  const [inputPath, outputPath, client = "Acme Corp"] = process.argv.slice(2);
  if (inputPath === undefined || outputPath === undefined) {
    process.stderr.write("usage: excel-replace <input.xlsx> <output.xlsx> [<client-name>]\n");
    process.exit(2);
  }

  const doc = await SpreadsheetDocument.openAsync(inputPath);
  const wp = doc.workbookPart;
  if (wp === undefined) {
    process.stderr.write("error: input is not a valid xlsx (no workbook part)\n");
    process.exit(1);
  }

  let replaced = 0;
  for (const wsp of wp.worksheetParts) {
    for (const c of wsp.worksheet.descendants(Cell)) {
      const v = c.firstChild(CellValue);
      if (v?.text?.includes("{{client}}") === true) {
        v.text = v.text.replaceAll("{{client}}", client);
        replaced += 1;
      }
    }
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Replaced ${replaced} occurrence(s); wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
