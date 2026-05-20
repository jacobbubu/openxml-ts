/**
 * 例子（Epic-60）：演示 Shape rotationDegrees / flipHorizontal / flipVertical 访问器。
 *
 * 跑法：
 *   bun run examples/ppt-shape-rotation.ts <output.pptx>
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
    process.stderr.write("usage: ppt-shape-rotation <output.pptx>\n");
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

  /** 构建一个最简 Shape 并设置位置和尺寸。 */
  function makeShape(
    tree: OpenXmlCompositeElement,
    id: string,
    name: string,
    x: number,
    y: number,
  ): Shape {
    const sp = new Shape();
    const nvSpPr = new NonVisualShapeProperties();
    const cNvPr = new NonVisualDrawingProperties();
    cNvPr.applyAttribute("id", id);
    cNvPr.applyAttribute("name", name);
    nvSpPr.appendChild(cNvPr);
    sp.appendChild(nvSpPr);
    tree.appendChild(sp);
    sp.position = { xEmu: x, yEmu: y };
    sp.size = { widthEmu: INCH, heightEmu: Math.round(INCH * 0.5) };
    return sp;
  }

  // Shape 1：旋转 90 度
  const sp1 = makeShape(spTree, "2", "Rotated90", INCH, INCH);
  sp1.rotationDegrees = 90;
  process.stdout.write(`Shape1 rotationDegrees: ${sp1.rotationDegrees}\n`);

  // Shape 2：旋转 45 度
  const sp2 = makeShape(spTree, "3", "Rotated45", INCH * 3, INCH);
  sp2.rotationDegrees = 45;
  process.stdout.write(`Shape2 rotationDegrees: ${sp2.rotationDegrees}\n`);

  // Shape 3：水平翻转
  const sp3 = makeShape(spTree, "4", "FlipH", INCH, INCH * 2);
  sp3.flipHorizontal = true;
  process.stdout.write(`Shape3 flipHorizontal: ${sp3.flipHorizontal}\n`);

  // Shape 4：垂直翻转
  const sp4 = makeShape(spTree, "5", "FlipV", INCH * 3, INCH * 2);
  sp4.flipVertical = true;
  process.stdout.write(`Shape4 flipVertical: ${sp4.flipVertical}\n`);

  // Shape 5：180 度旋转 + 水平翻转组合
  const sp5 = makeShape(spTree, "6", "Rot180FlipH", INCH * 5, INCH);
  sp5.rotationDegrees = 180;
  sp5.flipHorizontal = true;
  process.stdout.write(
    `Shape5 rotationDegrees: ${sp5.rotationDegrees}, flipH: ${sp5.flipHorizontal}\n`,
  );

  // 演示清除 rotation
  sp1.rotationDegrees = undefined;
  process.stdout.write(
    `Shape1 rotationDegrees after clear: ${sp1.rotationDegrees ?? "(undefined)"}\n`,
  );

  // 演示清除 flipH
  sp3.flipHorizontal = undefined;
  process.stdout.write(
    `Shape3 flipHorizontal after clear: ${sp3.flipHorizontal ?? "(undefined)"}\n`,
  );

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
