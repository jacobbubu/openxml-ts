/**
 * 例子：打开一份含 `{{date}}` 占位的 pptx，把全部占位替换为指定字符串，写出。
 *
 * 跑法：
 *   bun run examples/ppt-replace.ts <input.pptx> <output.pptx> <replacement>
 */

import { Text } from "../src/drawing/index.js";
import { PresentationDocument } from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [inputPath, outputPath, replacement] = process.argv.slice(2);
  if (inputPath === undefined || outputPath === undefined || replacement === undefined) {
    process.stderr.write("usage: ppt-replace <input.pptx> <output.pptx> <replacement>\n");
    process.exit(2);
  }

  const doc = await PresentationDocument.openAsync(inputPath);
  const pp = doc.presentationPart;
  if (pp === undefined) {
    process.stderr.write("error: input has no presentation part\n");
    process.exit(1);
  }

  let replacedCount = 0;
  for (const sp of pp.slideParts) {
    for (const t of sp.slide.descendants(Text)) {
      if (t.text?.includes("{{date}}")) {
        t.text = t.text.replaceAll("{{date}}", replacement);
        replacedCount += 1;
      }
    }
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Replaced ${replacedCount} occurrence(s); wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
