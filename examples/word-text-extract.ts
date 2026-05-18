/**
 * 例子：用 Story-11.1 `Paragraph.text` 访问器把一份 docx 的所有段落抽成纯文本。
 *
 * 跑法：
 *   bun run examples/word-text-extract.ts <input.docx>
 */

import { Paragraph, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [inputPath] = process.argv.slice(2);
  if (inputPath === undefined) {
    process.stderr.write("usage: word-text-extract <input.docx>\n");
    process.exit(2);
  }

  const doc = await WordprocessingDocument.openAsync(inputPath);
  const main = doc.mainDocumentPart;
  if (main === undefined) {
    process.stderr.write("no main document part\n");
    process.exit(3);
  }

  let count = 0;
  for (const p of main.document.descendants(Paragraph)) {
    process.stdout.write(`${count.toString().padStart(4, " ")} | ${p.text}\n`);
    count += 1;
  }
  process.stderr.write(`\nextracted ${count} paragraphs\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
