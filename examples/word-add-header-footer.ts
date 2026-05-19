/**
 * 例子（Epic-26）：构造 docx 加默认页眉 + 页脚。
 *
 * 跑法：
 *   bun run examples/word-add-header-footer.ts <output.docx>
 */

import { WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-header-footer <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  doc.addHeader("Document Title — Confidential", "default");
  doc.addFooter("Page footer · 2026 openxml-ts", "default");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (header + footer)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
