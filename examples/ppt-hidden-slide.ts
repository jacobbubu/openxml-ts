/**
 * 例子（Epic-63）：演示 Slide.hidden 隐藏幻灯片访问器。
 *
 * 创建一份含 3 张幻灯片的演示文稿：
 *   - 第一张：可见（默认）
 *   - 第二张：隐藏（放映时跳过）
 *   - 第三张：可见（默认）
 *
 * 跑法：
 *   bun run examples/ppt-hidden-slide.ts <output.pptx>
 *   file /tmp/out.pptx
 *   # → /tmp/out.pptx: Microsoft PowerPoint 2007+
 */

import { PresentationDocument, addSlide } from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-hidden-slide <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();

  // 第一张 slide：可见（默认）
  const slide1 = doc.presentationPart?.slideParts[0]?.slide;
  process.stdout.write(`第一张 slide hidden=${slide1.hidden}（默认可见）\n`);

  // 第二张 slide：新增后隐藏（中间张）
  const slide2Part = addSlide(doc);
  const slide2 = slide2Part.slide;
  slide2.hidden = true;
  process.stdout.write(`第二张 slide hidden=${slide2.hidden}（已设为隐藏）\n`);

  // 第三张 slide：可见（默认）
  const slide3Part = addSlide(doc);
  const slide3 = slide3Part.slide;
  process.stdout.write(`第三张 slide hidden=${slide3.hidden}（默认可见）\n`);

  await doc.saveAsAsync(outputPath);

  const count = doc.presentationPart?.slideParts.length;
  process.stdout.write(`已写入 ${outputPath}（共 ${count} 张幻灯片，第 2 张已隐藏）\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
