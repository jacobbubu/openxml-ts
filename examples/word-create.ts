/**
 * 例子：从零构造一份最小可用 docx，写到指定路径。
 *
 * 跑法：
 *   bun run examples/word-create.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-create <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!; // Body
  for (const line of ["Hello", "from", "openxml-ts"]) {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = line;
    r.appendChild(t);
    p.appendChild(r);
    (body as { appendChild: (e: unknown) => void }).appendChild(p);
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
