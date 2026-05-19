/**
 * 例子（Epic-46）：演示 createParagraphStyle / createCharacterStyle 创建自定义样式，
 * 并通过 Paragraph.styleId / Run.styleId 引用。
 *
 * 跑法：
 *   bun run examples/word-styled-doc.ts /tmp/out.docx
 *   file /tmp/out.docx   # → Microsoft Word 2007+
 */

import {
  Paragraph,
  Run,
  Text,
  WordprocessingDocument,
  createCharacterStyle,
  createParagraphStyle,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-styled-doc <output.docx>\n");
    process.exit(2);
  }

  const doc = WordprocessingDocument.create();

  // ─── 创建样式 ─────────────────────────────────────────────────────────────
  const sp = doc.getOrCreateStylesPart();

  // 段落样式：Heading1 — 粗体 16pt 居中，下一段回到 Body
  createParagraphStyle(sp, {
    styleId: "Heading1",
    name: "heading 1",
    next: "Body",
    formatting: {
      bold: true,
      fontSizeHalfPoints: 32, // 32 half-points = 16pt
      alignment: "center",
    },
  });

  // 段落样式：Body — 普通正文
  createParagraphStyle(sp, {
    styleId: "Body",
    name: "body text",
    formatting: {
      fontSizeHalfPoints: 24, // 24 half-points = 12pt
    },
  });

  // 字符样式：Emphasis — 斜体红色
  createCharacterStyle(sp, {
    styleId: "Emphasis",
    name: "emphasis",
    formatting: {
      italic: true,
      colorHex: "C00000",
    },
  });

  // ─── 构建文档内容 ─────────────────────────────────────────────────────────
  const body = doc.mainDocumentPart!.document.firstChild()!;
  const append = (e: unknown): void =>
    (body as { appendChild: (e: unknown) => void }).appendChild(e);

  function addStyledParagraph(styleId: string, text: string): void {
    const p = new Paragraph();
    const r = new Run();
    const t = new Text();
    t.text = text;
    r.appendChild(t);
    p.appendChild(r);
    p.styleId = styleId;
    append(p);
  }

  function addMixedParagraph(
    plainText: string,
    emphasizedText: string,
    trailingText: string,
  ): void {
    const p = new Paragraph();
    p.styleId = "Body";

    const r1 = new Run();
    const t1 = new Text();
    t1.text = plainText;
    r1.appendChild(t1);
    p.appendChild(r1);

    const r2 = new Run();
    const t2 = new Text();
    t2.text = emphasizedText;
    r2.appendChild(t2);
    r2.styleId = "Emphasis";
    p.appendChild(r2);

    const r3 = new Run();
    const t3 = new Text();
    t3.text = trailingText;
    r3.appendChild(t3);
    p.appendChild(r3);

    append(p);
  }

  addStyledParagraph("Heading1", "Chapter 1: Custom Styles");
  addStyledParagraph("Body", "This paragraph uses the Body style (12pt).");
  addMixedParagraph("Normal text with ", "emphasized red italic", " inline character style.");
  addStyledParagraph("Heading1", "Chapter 2: More Content");
  addStyledParagraph("Body", "Another body paragraph under the second heading.");

  // ─── 保存 ─────────────────────────────────────────────────────────────────
  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (custom Heading1/Body/Emphasis styles)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
