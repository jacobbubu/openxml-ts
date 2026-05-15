/**
 * 例子：打开 docx，把每个 `{{client}}` 占位文本替换为指定值，写回新文件。
 *
 * 跑法：
 *   bun run examples/word-replace.ts <input.docx> <output.docx> [<client-name>]
 */

import { Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [inputPath, outputPath, client = "Acme Corp"] = process.argv.slice(2);
  if (inputPath === undefined || outputPath === undefined) {
    process.stderr.write("usage: word-replace <input.docx> <output.docx> [<client-name>]\n");
    process.exit(2);
  }

  const doc = await WordprocessingDocument.openAsync(inputPath);
  const body = doc.mainDocumentPart?.document;
  if (body === undefined) {
    process.stderr.write("error: input is not a valid docx (no main document part)\n");
    process.exit(1);
  }

  let replaced = 0;
  for (const t of body.descendants(Text)) {
    if (t.text?.includes("{{client}}")) {
      t.text = t.text.replaceAll("{{client}}", client);
      replaced += 1;
    }
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Replaced ${replaced} occurrence(s); wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
