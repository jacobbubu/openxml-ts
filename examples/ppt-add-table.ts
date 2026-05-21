/**
 * 例子（Epic-17）：从零构造一份 pptx，在 slide 0 上加一张 3×3 表，填头部 + 数据。
 *
 * 跑法：
 *   bun run examples/ppt-add-table.ts <output.pptx>
 */

import { PresentationDocument, createSlideTable, setSlideTableCellText } from "../src/ppt/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-add-table <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart?.slideParts[0]?.slide;
  const cSld = slide.firstChild()!;
  const spTree = [...cSld.children].find((c) => c.localName === "spTree") as
    | { appendChild: (e: unknown) => void }
    | undefined;
  if (spTree === undefined) {
    throw new Error("slide.cSld.spTree missing");
  }

  // 3×3 表：表头 + 2 行数据
  const table = createSlideTable(3, 3, {
    offset: { xEmu: 914400 * 2, yEmu: 914400 * 2 },
    extent: { cxEmu: 914400 * 6, cyEmu: 914400 * 1.5 },
    name: "Sales",
  });

  // 头
  setSlideTableCellText(table, 0, 0, "Product");
  setSlideTableCellText(table, 0, 1, "Q1");
  setSlideTableCellText(table, 0, 2, "Q2");
  // 数据
  setSlideTableCellText(table, 1, 0, "Widgets");
  setSlideTableCellText(table, 1, 1, "$1,200");
  setSlideTableCellText(table, 1, 2, "$1,450");
  setSlideTableCellText(table, 2, 0, "Gadgets");
  setSlideTableCellText(table, 2, 1, "$800");
  setSlideTableCellText(table, 2, 2, "$950");

  spTree.appendChild(table);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (3x3 table embedded on slide 1)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
