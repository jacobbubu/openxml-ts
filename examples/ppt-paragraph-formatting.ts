/**
 * 例子（Epic-42）：演示 PPT/DrawingML Paragraph 段落格式（alignment/leftMargin/indent）。
 *
 * 跑法：
 *   bun run examples/ppt-paragraph-formatting.ts <output.pptx>
 */

import { Paragraph } from "../src/drawing/generated/paragraph.js";
import { Run } from "../src/drawing/generated/run.js";
import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../src/element/index.js";
import { ApplicationNonVisualDrawingProperties } from "../src/ppt/generated/application-non-visual-drawing-properties.js";
import { NonVisualDrawingProperties } from "../src/ppt/generated/non-visual-drawing-properties.js";
import { NonVisualShapeDrawingProperties } from "../src/ppt/generated/non-visual-shape-drawing-properties.js";
import { NonVisualShapeProperties } from "../src/ppt/generated/non-visual-shape-properties.js";
import { PresentationDocument } from "../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-paragraph-formatting <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart?.slideParts[0]?.slide;
  let spTree: OpenXmlCompositeElement | undefined;
  for (const d of slide.descendants()) {
    if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
      spTree = d;
      break;
    }
  }
  if (spTree === undefined) throw new Error("spTree missing");

  let shapeId = 1;

  function addShape(opts: {
    alignment?: "l" | "ctr" | "r" | "just" | "dist";
    leftMarginEmu?: number;
    indentEmu?: number;
    text: string;
  }): void {
    shapeId += 1;
    const sp = u("p", "sp", NS_P);
    const nvSpPr = new NonVisualShapeProperties();
    const cNvPr = new NonVisualDrawingProperties();
    cNvPr.applyAttribute("id", String(shapeId));
    cNvPr.applyAttribute("name", `Shape ${shapeId}`);
    nvSpPr.appendChild(cNvPr);
    nvSpPr.appendChild(new NonVisualShapeDrawingProperties());
    nvSpPr.appendChild(new ApplicationNonVisualDrawingProperties());
    sp.appendChild(nvSpPr);
    sp.appendChild(u("p", "spPr", NS_P));
    const txBody = u("p", "txBody", NS_P);
    txBody.appendChild(u("a", "bodyPr", NS_A));
    txBody.appendChild(u("a", "lstStyle", NS_A));
    const p = new Paragraph();
    if (opts.alignment !== undefined) p.alignment = opts.alignment;
    if (opts.leftMarginEmu !== undefined) p.leftMarginEmu = opts.leftMarginEmu;
    if (opts.indentEmu !== undefined) p.indentEmu = opts.indentEmu;
    const r = new Run();
    const t = u("a", "t", NS_A);
    t.text = opts.text;
    r.appendChild(t);
    p.appendChild(r);
    txBody.appendChild(p);
    sp.appendChild(txBody);
    spTree?.appendChild(sp);
  }

  addShape({ alignment: "l", text: "Left aligned" });
  addShape({ alignment: "ctr", text: "Centered" });
  addShape({ alignment: "r", text: "Right aligned" });
  addShape({
    alignment: "l",
    leftMarginEmu: 914400,
    indentEmu: -457200,
    text: "Indented w/ hanging",
  });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (4 styled paragraphs)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
