/**
 * 例子（Epic-43）：演示 Paragraph 分页控制（keepNext / keepLines / pageBreakBefore）。
 *
 * 跑法：
 *   bun run examples/word-paragraph-flow.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-paragraph-flow <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addPara(
    text: string,
    opts: { keepNext?: boolean; keepLines?: boolean; pageBreakBefore?: boolean } = {},
  ): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    if (opts.keepNext !== undefined) p.keepNext = opts.keepNext;
    if (opts.keepLines !== undefined) p.keepLines = opts.keepLines;
    if (opts.pageBreakBefore !== undefined) p.pageBreakBefore = opts.pageBreakBefore;
    append(p);
  }

  addPara("Chapter 1 (heading)", { keepNext: true, keepLines: true });
  addPara("First paragraph of chapter 1 body...");
  addPara("Chapter 2 (page-break-before)", {
    pageBreakBefore: true,
    keepNext: true,
    keepLines: true,
  });
  addPara("First paragraph of chapter 2 body...");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (heading + body w/ flow controls)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
