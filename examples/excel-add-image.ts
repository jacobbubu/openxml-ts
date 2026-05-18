/**
 * 例子（Epic-13）：从零构造一份 xlsx，在第 0 张 sheet 的 (B2, F10) 范围嵌一张 PNG。
 *
 * 跑法：
 *   bun run examples/excel-add-image.ts <output.xlsx>
 */

import { SpreadsheetDocument, createImageTwoCellAnchorForExcel } from "../src/excel/index.js";

// 1×1 透明 PNG。
const TINY_PNG = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82,
]);

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-add-image <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const { relId, drawingPart } = doc.addImagePart(0, TINY_PNG);

  // (col 1, row 1) = B2；(col 5, row 9) = F10。0-based 索引。
  const anchor = createImageTwoCellAnchorForExcel(
    relId,
    { col: 1, row: 1 },
    { col: 5, row: 9 },
    { id: 1, name: "Logo" },
  );
  drawingPart.wsDr.appendChild(anchor);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (PNG embedded on sheet1, B2:F10)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
