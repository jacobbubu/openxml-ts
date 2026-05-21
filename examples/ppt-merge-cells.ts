/**
 * 例子（Epic-20）：演示 PPT 表格合并单元格——构造 3×3 表，
 * 第一行 3 格合并成「表头」，主格写 "Quarter Stats"。
 *
 * 跑法：
 *   bun run examples/ppt-merge-cells.ts <output.pptx>
 */

import {
  PresentationDocument,
  createSlideTable,
  mergeSlideTableCells,
  setSlideTableCellText,
} from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-merge-cells <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart?.slideParts[0]?.slide;
  const cSld = slide.firstChild()!;
  const spTree = [...cSld.children].find((c) => c.localName === "spTree") as {
    appendChild: (e: unknown) => void;
  };

  const table = createSlideTable(3, 3, {
    offset: { xEmu: 914400 * 2, yEmu: 914400 * 2 },
    extent: { cxEmu: 914400 * 6, cyEmu: 914400 * 1.5 },
    name: "Quarter",
  });

  // 第一行全合并 → 表头
  setSlideTableCellText(table, 0, 0, "Quarter Stats");
  mergeSlideTableCells(table, 0, 0, 0, 2);

  // 第二、三行普通填数
  setSlideTableCellText(table, 1, 0, "Product");
  setSlideTableCellText(table, 1, 1, "Q1");
  setSlideTableCellText(table, 1, 2, "Q2");
  setSlideTableCellText(table, 2, 0, "Widgets");
  setSlideTableCellText(table, 2, 1, "$1,200");
  setSlideTableCellText(table, 2, 2, "$1,450");

  spTree.appendChild(table);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3x3 with merged header)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
