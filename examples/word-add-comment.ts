/**
 * 例子（Epic-18）：从零构造一份 docx，在段落中间挂一条注释（commentRangeStart /
 * commentRangeEnd 包围目标文字，commentReference Run 放结尾）。
 *
 * 跑法：
 *   bun run examples/word-add-comment.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-comment <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // 加注释 → 拿三个 markup 元素
  const { rangeStart, rangeEnd, reference, commentId } = doc.addComment({
    author: "Alice",
    initials: "AW",
    text: "This is an example comment.",
  });

  // 主文档段：前缀 Run + rangeStart + 目标 Run + rangeEnd + reference Run + 后缀 Run
  const p = new Paragraph();

  const lead = new Run();
  const leadT = new Text();
  leadT.text = "Hello ";
  lead.appendChild(leadT);
  p.appendChild(lead);

  p.appendChild(rangeStart);

  const target = new Run();
  const targetT = new Text();
  targetT.text = "world";
  target.appendChild(targetT);
  p.appendChild(target);

  p.appendChild(rangeEnd);
  p.appendChild(reference);

  const tail = new Run();
  const tailT = new Text();
  tailT.text = " — please review.";
  tail.appendChild(tailT);
  p.appendChild(tail);

  append(p);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (comment id=${commentId} attached to "world")\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
