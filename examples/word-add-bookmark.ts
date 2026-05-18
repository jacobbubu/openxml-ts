/**
 * 例子（Epic-16）：从零构造一份 docx，挂一个 bookmark + 一个跳转到该 bookmark 的
 * 内部超链接——验证 Epic-15 内链 `{ anchor }` 路径端到端可用。
 *
 * 跑法：
 *   bun run examples/word-add-bookmark.ts <output.docx>
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createBookmarkPair,
  createHyperlinkRun,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-bookmark <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // 1) Section 1 段——挂 bookmark "section1" 环绕标题文本
  const id = doc.nextBookmarkId();
  const { start, end } = createBookmarkPair("section1", id);
  const titleP = new Paragraph();
  titleP.appendChild(start);
  const titleRun = new Run();
  const titleText = new Text();
  titleText.text = "Section 1 — Introduction";
  titleRun.appendChild(titleText);
  titleP.appendChild(titleRun);
  titleP.appendChild(end);
  append(titleP);

  // 2) 内链段——指向上面的 bookmark
  const linkP = new Paragraph();
  const leadRun = new Run();
  const leadText = new Text();
  leadText.text = "Jump to ";
  leadRun.appendChild(leadText);
  linkP.appendChild(leadRun);
  linkP.appendChild(createHyperlinkRun({ anchor: "section1", text: "Section 1" }));
  append(linkP);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (bookmark id=${id} + internal hyperlink)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
