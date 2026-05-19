/**
 * 例子（Epic-21）：构造 docx 加一张 3×3 Word 表（带 borders），头部 + 2 行数据。
 *
 * 跑法：
 *   bun run examples/word-add-table.ts <output.docx>
 */

import {
  WordprocessingDocument,
  createDocumentTable,
  setDocumentTableCellText,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-table <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;

  const table = createDocumentTable(3, 3, { totalWidthDxa: 9000 });
  setDocumentTableCellText(table, 0, 0, "Product");
  setDocumentTableCellText(table, 0, 1, "Q1");
  setDocumentTableCellText(table, 0, 2, "Q2");
  setDocumentTableCellText(table, 1, 0, "Widgets");
  setDocumentTableCellText(table, 1, 1, "$1,200");
  setDocumentTableCellText(table, 1, 2, "$1,450");
  setDocumentTableCellText(table, 2, 0, "Gadgets");
  setDocumentTableCellText(table, 2, 1, "$800");
  setDocumentTableCellText(table, 2, 2, "$950");

  (body as { appendChild: (e: unknown) => void }).appendChild(table);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3x3 Word table with borders)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
