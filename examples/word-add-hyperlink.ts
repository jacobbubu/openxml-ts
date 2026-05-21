/**
 * 例子（Epic-15）：从零构造一份 docx，加两段含超链接的段落（外链 + 内链），写到指定路径。
 *
 * 跑法：
 *   bun run examples/word-add-hyperlink.ts <output.docx>
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createHyperlinkRun,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-hyperlink <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // 1) 外链：addHyperlinkRelationship → 拿 relId → 塞到 createHyperlinkRun
  const { relId } = doc.addHyperlinkRelationship("https://github.com/jacobbubu/openxml-ts");
  const p1 = new Paragraph();
  const leadText = new Text();
  leadText.text = "Check out ";
  const leadRun = new Run();
  leadRun.appendChild(leadText);
  p1.appendChild(leadRun);
  p1.appendChild(
    createHyperlinkRun({ relId, text: "openxml-ts on GitHub", tooltip: "Source repo" }),
  );
  append(p1);

  // 2) 内链：指向同文档的书签（这里只给 anchor name；真实书签需要 <w:bookmarkStart/> 配套，
  //    Epic-15 暂不做书签助手，留作 follow-up）
  const p2 = new Paragraph();
  const lead2 = new Text();
  lead2.text = "Jump to: ";
  const lead2Run = new Run();
  lead2Run.appendChild(lead2);
  p2.appendChild(lead2Run);
  p2.appendChild(createHyperlinkRun({ anchor: "section1", text: "Section 1" }));
  append(p2);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (2 hyperlinks embedded)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
