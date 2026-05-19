/**
 * 例子（Epic-28）：构造 xlsx 加几个命名范围。
 *
 * 跑法：
 *   bun run examples/excel-defined-names.ts <output.xlsx>
 */

import { SpreadsheetDocument } from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-defined-names <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  doc.addDefinedName("Revenue", "Sheet1!$A$2:$A$10");
  doc.addDefinedName("Expenses", "Sheet1!$B$2:$B$10");
  doc.addDefinedName("Total", "Revenue-Expenses", { hidden: true });
  doc.addDefinedName("LocalRange", "Sheet1!$C$1", { localSheetId: 0 });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (${doc.listDefinedNames().length} defined names)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
