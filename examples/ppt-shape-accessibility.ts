/**
 * 例子（Epic-48）：演示 Shape 无障碍属性访问器。
 *
 * 跑法：
 *   bun run examples/ppt-shape-accessibility.ts <output.pptx>
 */

import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../src/element/index.js";
import { ApplicationNonVisualDrawingProperties } from "../src/ppt/generated/application-non-visual-drawing-properties.js";
import { NonVisualDrawingProperties } from "../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeDrawingProperties } from "../src/ppt/generated/non-visual-shape-drawing-properties.js";
import { NonVisualShapeProperties } from "../src/ppt/generated/non-visual-shape-properties.js";
import { Shape } from "../src/ppt/generated/shape.js";
import { PresentationDocument } from "../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-shape-accessibility <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart?.slideParts[0]?.slide;

  // 找到 spTree
  let spTree: OpenXmlCompositeElement | undefined;
  for (const d of slide.descendants()) {
    if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
      spTree = d;
      break;
    }
  }
  if (spTree === undefined) throw new Error("slide missing spTree");

  // 构建带无障碍属性的 Shape（nvSpPr 必须包含 cNvPr + cNvSpPr + nvPr 三个子元素）
  const sp = new Shape();
  const nvSpPr = new NonVisualShapeProperties();
  const cNvPr = new NonVisualDrawingProperties();
  cNvPr.applyAttribute("id", "2");
  cNvPr.applyAttribute("name", "AccessibleShape");
  nvSpPr.appendChild(cNvPr);
  nvSpPr.appendChild(new NonVisualShapeDrawingProperties());
  nvSpPr.appendChild(new ApplicationNonVisualDrawingProperties());
  sp.appendChild(nvSpPr);

  // 添加最简 spPr（offset/ext 可选）
  sp.appendChild(u("p", "spPr", NS_P));

  // 添加 txBody
  const txBody = u("p", "txBody", NS_P);
  txBody.appendChild(u("a", "bodyPr", NS_A));
  txBody.appendChild(u("a", "lstStyle", NS_A));
  const p = u("a", "p", NS_A);
  const r = u("a", "r", NS_A);
  const t = u("a", "t", NS_A);
  t.text = "Accessible shape content";
  r.appendChild(t);
  p.appendChild(r);
  txBody.appendChild(p);
  sp.appendChild(txBody);

  spTree.appendChild(sp);

  // 设置无障碍属性
  sp.altTitle = "Main Slide Shape";
  sp.altDescription = "A rectangle containing the key message of this slide.";

  process.stdout.write(`name:           ${sp.name}\n`);
  process.stdout.write(`altTitle:       ${sp.altTitle}\n`);
  process.stdout.write(`altDescription: ${sp.altDescription}\n`);

  // 清除 altTitle 演示 setter undefined
  sp.altTitle = undefined;
  process.stdout.write(`altTitle after clear: ${sp.altTitle ?? "(undefined)"}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
