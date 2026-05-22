/**
 * 例子：用 Story-11.2 `resolveEffective*Properties` 查每段 Run 的实际生效字体加粗
 * 状态。
 *
 * 跑法：
 *   bun run examples/word-style-inspect.ts <input.docx>
 */

import {
  Bold,
  Color,
  Italic,
  Paragraph,
  ParagraphProperties,
  ParagraphStyleId,
  Run,
  WordprocessingDocument,
  resolveEffectiveRunProperties,
} from "../src/word/index.js";

async function main(): Promise<void> {
  const [inputPath] = process.argv.slice(2);
  if (inputPath === undefined) {
    process.stderr.write("usage: word-style-inspect <input.docx>\n");
    process.exit(2);
  }

  const doc = await WordprocessingDocument.openAsync(inputPath);
  const main = doc.mainDocumentPart;
  if (main === undefined) {
    process.stderr.write("no main document part\n");
    process.exit(3);
  }
  const styles = doc.stylesPart?.styles;

  let pIdx = 0;
  for (const p of main.document.descendants(Paragraph)) {
    const pStyleId = p
      .firstChild(ParagraphProperties)
      ?.firstChild(ParagraphStyleId)
      ?.val?.toString();

    for (const r of p.descendants(Run)) {
      const eff = resolveEffectiveRunProperties(r, styles);
      const bold = eff.has(Bold) ? "B" : "-";
      const italic = eff.has(Italic) ? "I" : "-";
      const color = eff.get(Color)?.val?.toString() ?? "auto";
      const text = r.text;
      if (text.length === 0) continue;
      process.stdout.write(
        `${pIdx.toString().padStart(4, " ")} ${(pStyleId ?? "—").padEnd(16)} ` +
          `[${bold}${italic} ${color.padEnd(6)}] ${text}\n`,
      );
    }
    pIdx += 1;
  }
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
