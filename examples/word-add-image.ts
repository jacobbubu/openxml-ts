/**
 * 例子（Epic-12）：从零构造一份 docx，在段落里嵌一张 PNG 图片，写到指定路径。
 *
 * 跑法：
 *   bun run examples/word-add-image.ts <output.docx>
 */

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Paragraph, WordprocessingDocument, createImageRunForWord } from "../src/word/index.js";

const HERE = dirname(fileURLToPath(import.meta.url));

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: word-add-image <output.docx>\n");
    process.exit(2);
  }

  // 用项目自带的 fixture PNG（任何 PNG 都行）。
  const pngPath = join(HERE, "..", "test", "fixtures", "tiny.png");
  let png: Uint8Array;
  try {
    png = new Uint8Array(readFileSync(pngPath));
  } catch {
    // fallback：内联一份最小 PNG（1×1 透明像素）
    png = new Uint8Array([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44,
      0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f,
      0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00,
      0x01, 0x00, 0x00, 0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
    ]);
  }

  const doc = WordprocessingDocument.create();
  const { relId } = doc.addImagePart(png);

  // 1 inch ≈ 914400 EMU；这里放 1×1 inch
  const imageRun = createImageRunForWord(relId, 914400, 914400, {
    name: "Logo",
    descr: "openxml-ts demo logo",
  });

  // 找到 Body（mainDocumentPart > Document > Body），加一段含图片的 Paragraph
  const body = doc.mainDocumentPart?.document.firstChild()!;
  const para = new Paragraph();
  para.appendChild(imageRun);
  (body as { appendChild: (e: unknown) => void }).appendChild(para);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (${png.byteLength}-byte PNG embedded)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
