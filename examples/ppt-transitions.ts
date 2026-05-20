/**
 * 例子（Epic-59）：演示 Slide.transition 切换效果访问器。
 *
 * 跑法：
 *   bun run examples/ppt-transitions.ts <output.pptx>
 */

import type { TransitionEffect } from "../src/ppt/extensions/slide-transition.js";
import { PresentationDocument } from "../src/ppt/index.js";

const EFFECTS: Array<{ effect: TransitionEffect; label: string }> = [
  { effect: "fade", label: "淡入淡出" },
  { effect: "push", label: "推入" },
  { effect: "wipe", label: "擦除" },
  { effect: "dissolve", label: "溶解" },
];

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-transitions <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slideParts = doc.presentationPart!.slideParts;

  // 第一张 slide 已存在，后续 3 张需要从第一张 clone（简化：直接操作已有 slide）
  // 演示：对已有唯一 slide 依次设置各种效果，展示 getter 读取
  const slide = slideParts[0]!.slide;

  for (const { effect, label } of EFFECTS) {
    slide.transition = { effect, speed: "med", advanceOnClick: true };
    const t = slide.transition;
    process.stdout.write(`效果 ${effect}（${label}）→ 读取：${JSON.stringify(t)}\n`);
  }

  // 演示 advanceAfterTimeMs
  slide.transition = { effect: "fade", speed: "slow", advanceAfterTimeMs: 3000 };
  process.stdout.write(`带自动推进（3s）：${JSON.stringify(slide.transition)}\n`);

  // 演示清除
  slide.transition = undefined;
  process.stdout.write(`清除后：${slide.transition ?? "(undefined)"}\n`);

  // 最终写入 push 效果
  slide.transition = { effect: "push", speed: "fast", advanceOnClick: true };
  process.stdout.write(`最终效果：${JSON.stringify(slide.transition)}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`已写入 ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
