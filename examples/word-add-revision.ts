/**
 * 例子（Epic-19）：构造一份 docx，原段 "Hello old world"，把 "old " 标记为删除、
 * "kind " 标记为插入，演示 Word 修订追踪。
 *
 * 跑法：
 *   bun run examples/word-add-revision.ts <output.docx>
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createDeletedRun,
  createInsertedRun,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-revision <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  const p = new Paragraph();

  // 前置纯文本
  const lead = new Run();
  const leadT = new Text();
  leadT.text = "Hello ";
  lead.appendChild(leadT);
  p.appendChild(lead);

  // 删除 "old " + 插入 "kind "（Alice 改的）
  const author = "Alice";
  const date = new Date().toISOString();
  p.appendChild(createDeletedRun({ author, id: doc.nextRevisionId(), date, text: "old " }));
  p.appendChild(createInsertedRun({ author, id: doc.nextRevisionId(), date, text: "kind " }));

  // 尾部纯文本
  const tail = new Run();
  const tailT = new Text();
  tailT.text = "world";
  tail.appendChild(tailT);
  p.appendChild(tail);

  append(p);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (1 del + 1 ins by Alice)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
