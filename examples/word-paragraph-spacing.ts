/**
 * 例子（Epic-31）：演示 Paragraph.spacing（段前 / 段后 / 行距）。
 *
 * 跑法：
 *   bun run examples/word-paragraph-spacing.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-paragraph-spacing <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addPara(
    text: string,
    spacing?: {
      beforeDxa?: number;
      afterDxa?: number;
      lineDxa?: number;
      lineRule?: "auto" | "atLeast" | "exact";
    },
  ): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    if (spacing !== undefined) p.spacing = spacing;
    append(p);
  }

  addPara("Default spacing.");
  addPara("Extra space before (240 dxa).", { beforeDxa: 240 });
  addPara("Extra space after (480 dxa).", { afterDxa: 480 });
  addPara("Double line spacing (lineDxa=480, auto rule).", {
    lineDxa: 480,
    lineRule: "auto",
  });
  addPara("Tight line (lineDxa=200, exact rule).", {
    lineDxa: 200,
    lineRule: "exact",
  });
  addPara("Everything combined: before=120 after=120 line=360 auto.", {
    beforeDxa: 120,
    afterDxa: 120,
    lineDxa: 360,
    lineRule: "auto",
  });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (6 paragraphs demonstrating spacing)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
