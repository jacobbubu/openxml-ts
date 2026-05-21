/**
 * 例子（Epic-23）：演示 Word 表格合并——3×3 表，第一行 3 格合并成「表头」。
 *
 * 跑法：
 *   bun run examples/word-merge-cells.ts <output.docx>
 */

import {
  WordprocessingDocument,
  createDocumentTable,
  mergeDocumentTableCells,
  setDocumentTableCellText,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-merge-cells <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;

  const table = createDocumentTable(3, 3);
  setDocumentTableCellText(table, 0, 0, "Quarter Stats");
  mergeDocumentTableCells(table, 0, 0, 0, 2);
  setDocumentTableCellText(table, 1, 0, "Product");
  setDocumentTableCellText(table, 1, 1, "Q1");
  setDocumentTableCellText(table, 1, 2, "Q2");
  setDocumentTableCellText(table, 2, 0, "Widgets");
  setDocumentTableCellText(table, 2, 1, "$1,200");
  setDocumentTableCellText(table, 2, 2, "$1,450");

  (body as { appendChild: (e: unknown) => void }).appendChild(table);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3x3 with merged header)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
