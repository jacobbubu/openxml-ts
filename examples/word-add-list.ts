/**
 * 例子（Epic-22）：构造 docx 加 1 个编号列表 + 1 个项目符号列表。
 *
 * 跑法：
 *   bun run examples/word-add-list.ts <output.docx>
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createListParagraph,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-list <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // 标题
  const head = new Paragraph();
  const headRun = new Run();
  const headText = new Text();
  headText.text = "Task list:";
  headRun.appendChild(headText);
  head.appendChild(headRun);
  append(head);

  // 编号列表
  const decimal = doc.addNumberingDefinition({ type: "decimal" });
  for (const text of ["Draft proposal", "Review with team", "Submit by Friday"]) {
    append(createListParagraph(decimal.numId, 0, text));
  }

  // 项目符号列表
  const bullet = doc.addNumberingDefinition({ type: "bullet" });
  for (const text of ["TypeScript", "OOXML", "Open source"]) {
    append(createListParagraph(bullet.numId, 0, text));
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (1 numbered list + 1 bullet list)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
