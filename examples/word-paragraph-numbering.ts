/**
 * 例子（Epic-54）：使用 `Paragraph.numbering` 访问器构造带编号列表的 docx。
 *
 * 跑法：
 *   bun run examples/word-paragraph-numbering.ts <output.docx>
 *
 * 通过 `doc.addNumberingDefinition` 获取 numId，然后用 `p.numbering = { id, level }`
 * 直接控制每个段落的编号引用，验证低级别访问器与高级别 createListParagraph 互补。
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

function makeTextParagraph(text: string): Paragraph {
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = text;
  r.appendChild(t);
  p.appendChild(r);
  return p;
}

function makeListItem(text: string, numId: number, level: number): Paragraph {
  const p = makeTextParagraph(text);
  p.numbering = { id: numId, level };
  return p;
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-paragraph-numbering <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  // 标题段落
  append(makeTextParagraph("Epic-54 示例：Paragraph.numbering 访问器"));

  // 十进制编号列表（两级）
  const decimal = doc.addNumberingDefinition({ type: "decimal" });
  append(makeListItem("第一项", decimal.numId, 0));
  append(makeListItem("第一项子项 A", decimal.numId, 1));
  append(makeListItem("第一项子项 B", decimal.numId, 1));
  append(makeListItem("第二项", decimal.numId, 0));
  append(makeListItem("第三项", decimal.numId, 0));

  // 项目符号列表
  const bullet = doc.addNumberingDefinition({ type: "bullet" });
  append(makeListItem("TypeScript", bullet.numId, 0));
  append(makeListItem("OOXML", bullet.numId, 0));
  append(makeListItem("Open source", bullet.numId, 0));

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (decimal list + bullet list via p.numbering)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
