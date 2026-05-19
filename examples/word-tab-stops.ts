/**
 * 例子（Epic-35）：演示 Paragraph.tabStops（左 / 右对齐 + dot leader）。
 *
 * 跑法：
 *   bun run examples/word-tab-stops.ts <output.docx>
 */

import { Paragraph, Run, TabChar, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-tab-stops <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // TOC 风格：标题左对齐，页码右对齐，中间点状前导符
  function tocEntry(title: string, page: string): void {
    const p = new Paragraph();
    p.tabStops = [{ positionDxa: 8640, alignment: "right", leader: "dot" }];
    const tr = new Run();
    const tt = new Text();
    tt.text = title;
    tr.appendChild(tt);
    p.appendChild(tr);
    const tabRun = new Run();
    tabRun.appendChild(new TabChar());
    p.appendChild(tabRun);
    const pr = new Run();
    const pt = new Text();
    pt.text = page;
    pr.appendChild(pt);
    p.appendChild(pr);
    append(p);
  }

  tocEntry("Chapter 1 · Introduction", "1");
  tocEntry("Chapter 2 · Background", "12");
  tocEntry("Chapter 3 · Method", "27");
  tocEntry("Chapter 4 · Results", "44");
  tocEntry("Chapter 5 · Conclusion", "58");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (5 TOC entries with dot-leader tab stops)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
