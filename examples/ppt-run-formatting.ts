/**
 * 例子（Epic-39）：演示 PPT/DrawingML Run 格式访问器。
 *
 * 跑法：
 *   bun run examples/ppt-run-formatting.ts <output.pptx>
 */

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
    process.stderr.write("usage: ppt-run-formatting <output.pptx>\n");
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

  function addShapeWithStyledText(opts: {
    bold?: boolean;
    italic?: boolean;
    underline?: string;
    fontSizeHundredths?: number;
    colorHex?: string;
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
    const p = u("a", "p", NS_A);
    const r = new Run();
    if (opts.bold !== undefined) r.bold = opts.bold;
    if (opts.italic !== undefined) r.italic = opts.italic;
    if (opts.underline !== undefined) r.underline = opts.underline;
    if (opts.fontSizeHundredths !== undefined) r.fontSizeHundredths = opts.fontSizeHundredths;
    if (opts.colorHex !== undefined) r.colorHex = opts.colorHex;
    const t = u("a", "t", NS_A);
    t.text = opts.text;
    r.appendChild(t);
    p.appendChild(r);
    txBody.appendChild(p);
    sp.appendChild(txBody);
    spTree?.appendChild(sp);
  }

  addShapeWithStyledText({ text: "Plain text" });
  addShapeWithStyledText({ text: "Bold", bold: true });
  addShapeWithStyledText({ text: "Italic underlined", italic: true, underline: "sng" });
  addShapeWithStyledText({
    text: "Big red bold",
    bold: true,
    fontSizeHundredths: 4800,
    colorHex: "FF0000",
  });

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (4 styled shapes)\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
