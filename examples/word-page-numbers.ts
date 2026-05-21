/**
 * 例子（Epic-34）：演示在正文里插入 PAGE / NUMPAGES 字段。
 *
 * 跑法：
 *   bun run examples/word-page-numbers.ts <output.docx>
 *
 * 注：完整页脚 wiring 需要 FooterPart + sectPr 关联，本例仅在正文段落里展示
 * 字段；Word 打开时会自动算出当前页码与总页数。
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createPageNumberRun,
  createTotalPagesRun,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-page-numbers <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addPlain(text: string): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    append(p);
  }

  addPlain("This document demonstrates PAGE and NUMPAGES fields.");
  addPlain("Open in Word and the next paragraph should show the live values.");

  const p = new Paragraph();
  const lead = new Run();
  const lt = new Text();
  lt.text = "第 ";
  lead.appendChild(lt);
  p.appendChild(lead);

  p.appendChild(createPageNumberRun());

  const mid = new Run();
  const mt = new Text();
  mt.text = " 页 / 共 ";
  mid.appendChild(mt);
  p.appendChild(mid);

  p.appendChild(createTotalPagesRun());

  const trail = new Run();
  const tt = new Text();
  tt.text = " 页";
  trail.appendChild(tt);
  p.appendChild(trail);

  append(p);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (PAGE + NUMPAGES fields)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
