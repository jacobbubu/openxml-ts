/**
 * 例子（Epic-27）：构造 pptx 给第 0 张 slide 加演讲者注释。
 *
 * 跑法：
 *   bun run examples/ppt-add-notes.ts <output.pptx>
 */

import { PresentationDocument } from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-add-notes <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  doc.setSlideNotes(0, "Welcome the audience. Mention agenda items: intro, demo, Q&A.");

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (with speaker notes on slide 1)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
