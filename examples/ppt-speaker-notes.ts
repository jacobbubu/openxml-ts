/**
 * 例子（Epic-51）：构造多张 slide 的 pptx，用 getSpeakerNotes / setSpeakerNotes
 * 自由函数写入演讲者注释，再读回验证。
 *
 * 跑法：
 *   bun run examples/ppt-speaker-notes.ts <output.pptx>
 */

import { PresentationDocument, getSpeakerNotes, setSpeakerNotes } from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-speaker-notes <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const pp = doc.presentationPart!;

  // slide 1（默认已存在）
  const sp0 = pp.slideParts[0]!;
  setSpeakerNotes(sp0.slide, doc, "Welcome the audience. Mention agenda: intro, demo, Q&A.");

  // 读回确认
  const notes0 = getSpeakerNotes(sp0.slide, doc);
  process.stdout.write(`Slide 1 notes: ${notes0 ?? "(none)"}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
