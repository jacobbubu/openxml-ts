/**
 * 例子（Epic-50）：演示 Run 字体访问器（fontFamily / fontFamilyDetail）。
 *
 * 跑法：
 *   bun run examples/word-run-fonts.ts <output.docx>
 */

import { Paragraph, Run, Text, WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-run-fonts <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function makeRun(text: string): Run {
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    return r;
  }

  function addLine(...runs: Run[]): void {
    const p = new Paragraph();
    for (const r of runs) p.appendChild(r);
    append(p);
  }

  // 快捷方式：同时设置 ascii/eastAsia/hAnsi/cs
  const r1 = makeRun("Calibri 字体（fontFamily 快捷写入，所有四个字段）");
  r1.fontFamily = "Calibri";
  addLine(r1);

  // 不同字体
  const r2 = makeRun("Arial 字体");
  r2.fontFamily = "Arial";
  addLine(r2);

  // 细粒度控制：西文 Calibri，东亚宋体
  const r3 = makeRun("细粒度：西文 Calibri，东亚宋体，复杂脚本 Arial");
  r3.fontFamilyDetail = { ascii: "Calibri", eastAsia: "宋体", hAnsi: "Calibri", cs: "Arial" };
  addLine(r3);

  // 与加粗共存
  const r4 = makeRun("Times New Roman 加粗");
  r4.fontFamily = "Times New Roman";
  r4.bold = true;
  addLine(r4);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (run fonts showcase)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
