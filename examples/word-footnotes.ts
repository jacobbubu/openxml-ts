/**
 * 例子（Epic-64）：从零构造一份 docx，在段落中插入 2-3 条脚注引用，
 * 并在 FootnotesPart 里注册对应脚注内容。
 *
 * 跑法：
 *   bun run examples/word-footnotes.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument, addFootnote } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-footnotes <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild();
  if (body === undefined) throw new Error("body missing");
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // ── 段落 1：含两处脚注引用 ──────────────────────────────────────────────────
  const { reference: ref1, footnoteId: id1 } = addFootnote(doc, {
    text: "Oxford English Dictionary, 3rd ed., 2010.",
  });
  const { reference: ref2, footnoteId: id2 } = addFootnote(doc, {
    text: "See also ISO/IEC 29500-1:2016 section 17.11.",
  });

  const p1 = new Paragraph();

  const t1 = new Text();
  t1.text = 'The term "document"';
  const r1 = new Run();
  r1.appendChild(t1);
  p1.appendChild(r1);

  p1.appendChild(ref1); // 脚注引用标记上标

  const t2 = new Text();
  t2.text = " is defined in the OOXML specification";
  t2.extendedAttributes.set("xml:space", "preserve");
  const r2 = new Run();
  r2.appendChild(t2);
  p1.appendChild(r2);

  p1.appendChild(ref2); // 第二个脚注引用

  const t3 = new Text();
  t3.text = " as a collection of parts.";
  t3.extendedAttributes.set("xml:space", "preserve");
  const r3 = new Run();
  r3.appendChild(t3);
  p1.appendChild(r3);

  append(p1);

  // ── 段落 2：含第三处脚注引用 ────────────────────────────────────────────────
  const { reference: ref3, footnoteId: id3 } = addFootnote(doc, {
    text: "Footnote auto-id assignment starts at 1 per .NET SDK convention.",
  });

  const p2 = new Paragraph();

  const t4 = new Text();
  t4.text = "Footnote ids are assigned automatically";
  const r4 = new Run();
  r4.appendChild(t4);
  p2.appendChild(r4);

  p2.appendChild(ref3);

  const t5 = new Text();
  t5.text = ", starting at 1.";
  t5.extendedAttributes.set("xml:space", "preserve");
  const r5 = new Run();
  r5.appendChild(t5);
  p2.appendChild(r5);

  append(p2);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} with footnotes: id=${id1}, id=${id2}, id=${id3}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
