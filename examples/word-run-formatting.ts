/**
 * 例子（Epic-38）：演示 Run 格式访问器（bold/italic/underline/fontSize/color）。
 *
 * 跑法：
 *   bun run examples/word-run-formatting.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-run-formatting <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function makeStyledRun(
    text: string,
    opts: {
      bold?: boolean;
      italic?: boolean;
      underline?: string;
      fontSizeHalfPoints?: number;
      colorHex?: string;
    } = {},
  ): Run {
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    if (opts.bold !== undefined) r.bold = opts.bold;
    if (opts.italic !== undefined) r.italic = opts.italic;
    if (opts.underline !== undefined) r.underline = opts.underline;
    if (opts.fontSizeHalfPoints !== undefined) r.fontSizeHalfPoints = opts.fontSizeHalfPoints;
    if (opts.colorHex !== undefined) r.colorHex = opts.colorHex;
    return r;
  }

  function addLine(...runs: Run[]): void {
    const p = new Paragraph();
    for (const r of runs) p.appendChild(r);
    append(p);
  }

  addLine(makeStyledRun("Plain text. "), makeStyledRun("Bold.", { bold: true }));
  addLine(makeStyledRun("Italic.", { italic: true }));
  addLine(makeStyledRun("Underlined single.", { underline: "single" }));
  addLine(makeStyledRun("Underlined double.", { underline: "double" }));
  addLine(makeStyledRun("Big red.", { fontSizeHalfPoints: 48, colorHex: "FF0000", bold: true }));
  addLine(
    makeStyledRun("Combo: bold italic underlined 14pt blue.", {
      bold: true,
      italic: true,
      underline: "single",
      fontSizeHalfPoints: 28,
      colorHex: "0000FF",
    }),
  );

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (run format showcase)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
