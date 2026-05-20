/**
 * 例子（Epic-61）：设置文档页面为 A4 横向，并配置自定义页边距。
 *
 * 跑法：
 *   bun run examples/word-page-setup.ts /tmp/out.docx
 */

import { Body, Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";
import { ensureDefaultSection, setPageMargin, setPageSize } from "../src/word/page-setup-markup.js";

// A4 尺寸（DXA：1 英寸 = 1440 DXA）
const A4_W = 11906; // 210 mm
const A4_H = 16838; // 297 mm

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-page-setup <output.docx>\n");
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
      t.text = "本文档使用 A4 横向纸张，上下边距各 20 mm，左右边距各 25 mm。";
      r.appendChild(t);
      p.appendChild(r);
      body.appendChild(p);
    }
  }

  // 获取（或创建）默认节，设置页面为 A4 横向
  // 横向时宽高互换
  const section = ensureDefaultSection(doc);
  setPageSize(section, { widthDxa: A4_H, heightDxa: A4_W, orientation: "landscape" });

  // 设置页边距：上下 20 mm（1134 DXA），左右 25 mm（1417 DXA），页眉页脚 10 mm（567 DXA）
  setPageMargin(section, {
    topDxa: 1134,
    bottomDxa: 1134,
    leftDxa: 1417,
    rightDxa: 1417,
    headerDxa: 567,
    footerDxa: 567,
    gutterDxa: 0,
  });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (A4 landscape, custom margins)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
