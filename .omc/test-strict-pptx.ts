import { readFile } from "node:fs/promises";
import { PresentationDocument } from "../src/ppt/index.js";

const bytes = new Uint8Array(await readFile("test/ppt/fixtures/Algn_tab_TabAlignment.pptx"));
const doc = await PresentationDocument.openAsync(bytes);
const pp = doc.presentationPart;
console.log("presentationPart:", pp !== undefined ? "✓ found" : "✗ undefined");
if (pp !== undefined) {
  console.log("presentation root:", pp.presentation.localName);
  console.log("slideParts count:", pp.slideParts.length);
  for (const sp of pp.slideParts) {
    console.log("  slide:", sp.slide.localName, "ns:", sp.slide.namespaceUri);
  }
}
