/**
 * 例子（Epic-12）：从零构造一份 pptx，在第 0 张 Slide 上嵌一张 PNG 图片。
 *
 * 跑法：
 *   bun run examples/ppt-add-image.ts <output.pptx>
 */

import { PresentationDocument, createImagePictureForPpt } from "../src/ppt/index.js";

// 1×1 透明 PNG，~ 70 字节，用作演示。
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
    process.stderr.write("usage: ppt-add-image <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const { relId } = doc.addImagePart(0, TINY_PNG);

  // 1 inch ≈ 914400 EMU；放 2×2 inch 居中（slide 默认 10×7.5 inch）
  const offsetEmu = { xEmu: 914400 * 4, yEmu: 914400 * 2.75 };
  const extentEmu = { cxEmu: 914400 * 2, cyEmu: 914400 * 2 };
  const pic = createImagePictureForPpt(relId, offsetEmu, extentEmu, {
    id: 10,
    name: "Logo",
  });

  // 把 picture 挂到 slide1 的 spTree。slide root 是 Slide composite，descend 找到 spTree（p:spTree）。
  const slide = doc.presentationPart?.slideParts[0]?.slide;
  // slide > cSld > spTree
  const cSld = slide.firstChild()!;
  const spTree = [...cSld.children].find((c) => c.localName === "spTree") as
    | { appendChild: (e: unknown) => void }
    | undefined;
  if (spTree === undefined) {
    throw new Error("slide.cSld.spTree missing");
  }
  spTree.appendChild(pic);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (PNG embedded on slide 1)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
