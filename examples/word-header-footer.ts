/**
 * 例子（Epic-57）：用一行代码设置文档页眉 + 页脚。
 *
 * 跑法：
 *   bun run examples/word-header-footer.ts <output.docx>
 */

import { setDocumentFooter, setDocumentHeader } from "../src/word/header-footer-markup.js";
import { Body, Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-header-footer <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();

  // 添加正文段落
  const mainPart = doc.mainDocumentPart;
  if (mainPart !== undefined) {
    const body = mainPart.document.firstChild(Body);
    if (body !== undefined) {
      const p = new Paragraph();
      const r = new Run();
      const t = new Text();
      t.text = "本文档包含页眉「公司机密」和页脚页码字段。";
      r.appendChild(t);
      p.appendChild(r);
      body.appendChild(p);
    }
  }

  // 一行设置默认页眉
  setDocumentHeader(doc, "公司机密");

  // 一行设置默认页脚（含页码占位文本）
  setDocumentFooter(doc, "第 X 页");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (header: 公司机密 / footer: 第 X 页)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
