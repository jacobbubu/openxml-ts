import { SpreadsheetDocument } from "../src/excel/index.js";
import { readFile } from "node:fs/promises";

const bytes = new Uint8Array(await readFile("test/fixtures/golden/basicspreadsheet.xlsx"));
const doc = await SpreadsheetDocument.openAsync(bytes);
console.log("worksheets:", doc.workbookPart!.worksheetParts.length);
for (const wsp of doc.workbookPart!.worksheetParts) {
  const ws = wsp.worksheet;
  console.log("ws root:", ws.localName, "prefix:", ws.prefix);
  let found = 0;
  for (const el of (ws as any).descendants()) {
    if (el.localName === "pivotSelection") {
      found += 1;
      console.log("  found pivotSelection, type:", el.constructor.name);
      console.log("  extAttrs:");
      for (const [k, v] of el.extendedAttributes) console.log(`    ${k}=${v}`);
      console.log("  id typed:", el.id?.toString?.());
    }
  }
  if (found === 0) console.log("  no pivotSelection in this sheet");
}
