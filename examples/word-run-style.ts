/**
 * 例子（Epic-41）：演示 Run.styleId（rStyle 引用 Character Style）。
 *
 * 跑法：
 *   bun run examples/word-run-style.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-run-style <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function makeRun(styleId: string | undefined, text: string): Run {
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    if (styleId !== undefined) r.styleId = styleId;
    return r;
  }

  function addLine(...runs: Run[]): void {
    const p = new Paragraph();
    for (const r of runs) p.appendChild(r);
    append(p);
  }

  addLine(
    makeRun(undefined, "Body text with a "),
    makeRun("Strong", "Strong word"),
    makeRun(undefined, " and an "),
    makeRun("Emphasis", "emphasized phrase"),
    makeRun(undefined, "."),
  );
  addLine(makeRun("Hyperlink", "Hyperlink-styled run."));
  addLine(makeRun("Subtitle", "Subtitle style."));

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (mixed Character Style refs)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
