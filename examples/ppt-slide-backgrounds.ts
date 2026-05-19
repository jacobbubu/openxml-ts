/**
 * 例子（Epic-47）：演示 Slide.backgroundColorHex 访问器。
 *
 * 跑法：
 *   bun run examples/ppt-slide-backgrounds.ts <output.pptx>
 */

import { PresentationDocument } from "../src/ppt/index.js";

const COLORS: Array<[string, string]> = [
  ["FF0000", "红色背景"],
  ["00FF00", "绿色背景"],
  ["0000FF", "蓝色背景"],
  ["FFFF00", "黄色背景"],
  ["FF00FF", "品红背景"],
];

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-slide-backgrounds <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart!.slideParts[0]!.slide;

  // 展示多种颜色（在同一张 slide 上依次设置，最终保留最后一种）
  for (const [hex, label] of COLORS) {
    slide.backgroundColorHex = hex;
    process.stdout.write(`设置背景色 ${hex}（${label}）→ 读取：${slide.backgroundColorHex}\n`);
  }

  // 最终设为黄色
  slide.backgroundColorHex = "FFFF00";
  process.stdout.write(`最终背景色：${slide.backgroundColorHex}\n`);

  // 演示清除
  const tempDoc = PresentationDocument.create();
  const tempSlide = tempDoc.presentationPart!.slideParts[0]!.slide;
  tempSlide.backgroundColorHex = "AABBCC";
  process.stdout.write(`清除前：${tempSlide.backgroundColorHex}\n`);
  tempSlide.backgroundColorHex = undefined;
  process.stdout.write(`清除后：${tempSlide.backgroundColorHex ?? "(undefined)"}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`已写入 ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
