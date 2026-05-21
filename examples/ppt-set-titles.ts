/**
 * 例子（Epic-37）：演示 Slide.title 访问器。
 *
 * 跑法：
 *   bun run examples/ppt-set-titles.ts <output.pptx>
 */

import { OpenXmlCompositeElement, OpenXmlUnknownElement } from "../src/element/index.js";
import type { Slide } from "../src/ppt/generated/slide.js";
import { PresentationDocument } from "../src/ppt/index.js";

const NS_P = "http://schemas.openxmlformats.org/presentationml/2006/main";
const NS_A = "http://schemas.openxmlformats.org/drawingml/2006/main";

function u(prefix: string, localName: string, ns: string): OpenXmlUnknownElement {
  return new OpenXmlUnknownElement(prefix, localName, ns);
}

function appendTitlePlaceholder(slide: Slide, initial: string): void {
  let spTree: OpenXmlCompositeElement | undefined;
  for (const d of slide.descendants()) {
    if (d.localName === "spTree" && d instanceof OpenXmlCompositeElement) {
      spTree = d;
      break;
    }
  }
  if (spTree === undefined) throw new Error("slide missing spTree");

  const sp = u("p", "sp", NS_P);
  const nvSpPr = u("p", "nvSpPr", NS_P);
  const cNvPr = u("p", "cNvPr", NS_P);
  cNvPr.extendedAttributes.set("id", "2");
  cNvPr.extendedAttributes.set("name", "Title");
  nvSpPr.appendChild(cNvPr);
  nvSpPr.appendChild(u("p", "cNvSpPr", NS_P));
  const nvPr = u("p", "nvPr", NS_P);
  const ph = u("p", "ph", NS_P);
  ph.extendedAttributes.set("type", "title");
  nvPr.appendChild(ph);
  nvSpPr.appendChild(nvPr);
  sp.appendChild(nvSpPr);
  sp.appendChild(u("p", "spPr", NS_P));

  const txBody = u("p", "txBody", NS_P);
  txBody.appendChild(u("a", "bodyPr", NS_A));
  txBody.appendChild(u("a", "lstStyle", NS_A));
  const p = u("a", "p", NS_A);
  const r = u("a", "r", NS_A);
  r.appendChild(u("a", "rPr", NS_A));
  const t = u("a", "t", NS_A);
  t.text = initial;
  r.appendChild(t);
  p.appendChild(r);
  txBody.appendChild(p);
  sp.appendChild(txBody);

  spTree.appendChild(sp);
}

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: ppt-set-titles <output.pptx>\n");
    process.exit(2);
  }

  const doc = PresentationDocument.create();
  const slide = doc.presentationPart?.slideParts[0]?.slide;
  appendTitlePlaceholder(slide, "Initial Title");

  // 用 setter 改成最终标题
  slide.title = "Hello from openxml-ts";

  process.stdout.write(`Title reads back as: ${slide.title}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
