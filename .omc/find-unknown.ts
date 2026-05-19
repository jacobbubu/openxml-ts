import { PresentationDocument } from "../src/ppt/presentation-document.js";
import { OpenXmlUnknownElement, OpenXmlCompositeElement } from "../src/element/index.js";

const doc = PresentationDocument.create();
const out = await doc.saveAsBytesAsync();
const fresh = await PresentationDocument.openAsync(out);
const pp = fresh.presentationPart!;
const sp = pp.slideParts[0]!;

const walk = (root: any, where: string) => {
  if (root instanceof OpenXmlUnknownElement) {
    console.log(`UNKNOWN in ${where}: <${root.prefix}:${root.localName} xmlns="${root.namespaceUri}">`);
  }
  if (root instanceof OpenXmlCompositeElement) {
    for (const child of (root as any).descendants()) {
      if (child instanceof OpenXmlUnknownElement) {
        console.log(`UNKNOWN in ${where}: <${child.prefix}:${child.localName} xmlns="${child.namespaceUri}">`);
      }
    }
  }
};
walk(pp.presentation, "presentation");
walk(sp.slide, "slide");
