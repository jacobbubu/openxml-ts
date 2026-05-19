/**
 * 例子（Epic-40）：演示 Paragraph.styleId（pStyle 引用样式表条目）。
 *
 * 跑法：
 *   bun run examples/word-paragraph-style.ts <output.docx>
 *
 * 注：用到的 styleId 需要先在 styles part 已定义；Word 打开时若引用未定义的
 * styleId 会回退到默认样式。
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-paragraph-style <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addStyled(styleId: string | undefined, text: string): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    if (styleId !== undefined) p.styleId = styleId;
    append(p);
  }

  addStyled("Heading1", "Section 1 (Heading1 style)");
  addStyled(undefined, "Plain body text.");
  addStyled("Heading2", "Subsection (Heading2 style)");
  addStyled("Quote", "An inspirational quote (Quote style).");
  addStyled(undefined, "Another body paragraph.");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (5 paragraphs with style refs)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
