/**
 * 例子（Epic-36）：演示 TableCell.shading（表头黄 + 隔行浅灰）。
 *
 * 跑法：
 *   bun run examples/word-table-shading.ts <output.docx>
 */

import {
  Paragraph,
  Run,
  TableCell,
  Text,
  WordprocessingDocument,
  createDocumentTable,
  setDocumentTableCellText,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-table-shading <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  const table = createDocumentTable(5, 3);
  const cells = [...table.descendants(TableCell)];
  const headers = ["Name", "Amount", "Status"];
  for (let c = 0; c < headers.length; c += 1) {
    setDocumentTableCellText(table, 0, c, headers[c]!);
    cells[c]!.shading = { fill: "FFFF00", pattern: "clear" };
  }
  for (let r = 1; r < 5; r += 1) {
    const fill = r % 2 === 1 ? "EEEEEE" : undefined;
    for (let c = 0; c < 3; c += 1) {
      const idx = r * 3 + c;
      setDocumentTableCellText(table, r, c, `R${r}C${c + 1}`);
      if (fill !== undefined) {
        cells[idx]!.shading = { fill, pattern: "clear" };
      }
    }
  }
  append(table);

  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = "Table with shaded header and zebra rows.";
  r.appendChild(t);
  p.appendChild(r);
  append(p);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (5x3 table with header + zebra shading)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
