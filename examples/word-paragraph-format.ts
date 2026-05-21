/**
 * 例子（Epic-30）：演示 Paragraph.alignment + Paragraph.indent。
 *
 * 跑法：
 *   bun run examples/word-paragraph-format.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-paragraph-format <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addPara(
    text: string,
    align?: "left" | "center" | "right",
    indent?: { leftDxa?: number; firstLineDxa?: number },
  ): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    if (align !== undefined) p.alignment = align;
    if (indent !== undefined) p.indent = indent;
    append(p);
  }

  addPara("Default left aligned.");
  addPara("This is centered.", "center");
  addPara("This is right aligned.", "right");
  addPara("Indented left 720 dxa (≈ 0.5 inch).", undefined, { leftDxa: 720 });
  addPara("First line indent 480 dxa.", undefined, { firstLineDxa: 480 });
  addPara("Hanging indent 360 dxa with left base 720 dxa.", undefined, {
    leftDxa: 720,
    hangingDxa: 360,
  });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (6 paragraphs with various format)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
