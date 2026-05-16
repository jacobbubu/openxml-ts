/**
 * 例子：打开 xlsx，把每个含 `{{client}}` 的 Cell 文本替换为指定值，写回新文件。
 *
 * 覆盖三类路径：
 * - `dataType="inlineStr"`：cell 含 `<is><t>...</t></is>`，遍历每个 `<t>` 改 text；
 * - `dataType="str"` / `"n"` / 无：cell 含 `<v>text</v>`，直接改 `cellValue.text`；
 * - **不覆盖** `dataType="s"`（sharedString）：那条路径要 intern + 改索引，
 *   留给生产代码自己实现。
 *
 * 跑法：
 *   bun run examples/excel-replace.ts <input.xlsx> <output.xlsx> [<client-name>]
 */

import { Cell, CellValue, SpreadsheetDocument, Text } from "../src/excel/index.js";

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
      // 直接值 `<v>`（dataType="str" / "n" / 无）
      const v = c.firstChild(CellValue);
      if (v?.text?.includes("{{client}}") === true) {
        v.text = v.text.replaceAll("{{client}}", client);
        replaced += 1;
      }
      // 内联富文本 `<is><t>...`（dataType="inlineStr"）：遍历每个 `<t>` 子段
      for (const t of c.descendants(Text)) {
        if (t.text?.includes("{{client}}") === true) {
          t.text = t.text.replaceAll("{{client}}", client);
          replaced += 1;
        }
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
