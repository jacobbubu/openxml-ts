/**
 * 例子（Epic-52）：演示 Shape position / size 访问器。
 *
 * 跑法：
 *   bun run examples/ppt-shape-xfrm.ts <output.pptx>
 */

import { OpenXmlCompositeElement } from "../src/element/index.js";
import { NonVisualDrawingProperties } from "../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeProperties } from "../src/ppt/generated/non-visual-shape-properties.js";
import { Shape } from "../src/ppt/generated/shape.js";
import { PresentationDocument } from "../src/ppt/index.js";

// 1 英寸 = 914400 EMU
const INCH = 914400;

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-shape-xfrm <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slidePart = doc.presentationPart?.slideParts[0];
  if (slidePart === undefined) throw new Error("no slide part");
  const slide = slidePart.slide;

  // 找到 spTree
  let spTree: OpenXmlCompositeElement | undefined;
  for (const d of slide.descendants()) {
    if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
      spTree = d;
      break;
    }
  }
  if (spTree === undefined) throw new Error("slide missing spTree");

  /** 构建一个最简 Shape。 */
  function makeShape(id: string, name: string): Shape {
    const sp = new Shape();
    const nvSpPr = new NonVisualShapeProperties();
    const cNvPr = new NonVisualDrawingProperties();
    cNvPr.applyAttribute("id", id);
    cNvPr.applyAttribute("name", name);
    nvSpPr.appendChild(cNvPr);
    sp.appendChild(nvSpPr);
    return sp;
  }

  // Shape 1：左上角，1×0.75 英寸
  const sp1 = makeShape("2", "TopLeft");
  spTree.appendChild(sp1);
  sp1.position = { xEmu: INCH, yEmu: INCH };
  sp1.size = { widthEmu: INCH, heightEmu: Math.round(INCH * 0.75) };

  process.stdout.write(`Shape1 position: x=${sp1.position?.xEmu} y=${sp1.position?.yEmu}\n`);
  process.stdout.write(`Shape1 size:     w=${sp1.size?.widthEmu} h=${sp1.size?.heightEmu}\n`);

  // Shape 2：右侧，2×1 英寸
  const sp2 = makeShape("3", "RightSide");
  spTree.appendChild(sp2);
  sp2.position = { xEmu: INCH * 3, yEmu: INCH };
  sp2.size = { widthEmu: INCH * 2, heightEmu: INCH };

  process.stdout.write(`Shape2 position: x=${sp2.position?.xEmu} y=${sp2.position?.yEmu}\n`);
  process.stdout.write(`Shape2 size:     w=${sp2.size?.widthEmu} h=${sp2.size?.heightEmu}\n`);

  // 演示清除 position（setter undefined）
  sp1.position = undefined;
  process.stdout.write(`Shape1 position after clear: ${sp1.position ?? "(undefined)"}\n`);

  // 演示清除 size
  sp1.size = undefined;
  process.stdout.write(`Shape1 size after clear: ${sp1.size ?? "(undefined)"}\n`);

  // 重新设置
  sp1.position = { xEmu: Math.round(INCH * 0.5), yEmu: Math.round(INCH * 0.5) };
  sp1.size = { widthEmu: Math.round(INCH * 1.5), heightEmu: Math.round(INCH * 0.5) };
  process.stdout.write(`Shape1 repositioned: x=${sp1.position?.xEmu} y=${sp1.position?.yEmu}\n`);
  process.stdout.write(`Shape1 resized:      w=${sp1.size?.widthEmu} h=${sp1.size?.heightEmu}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
