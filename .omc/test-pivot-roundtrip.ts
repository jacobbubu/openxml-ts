import { SpreadsheetDocument } from "../src/excel/index.js";
import { readFile, writeFile } from "node:fs/promises";

const bytes = new Uint8Array(await readFile("test/fixtures/golden/basicspreadsheet.xlsx"));
const doc = await SpreadsheetDocument.openAsync(bytes);
const wp = doc.workbookPart!;
// Force load all worksheets typed
for (const wsp of wp.worksheetParts) void wsp.worksheet;
const out = await doc.saveAsBytesAsync();

// Re-open the output and check pivotSelection
const doc2 = await SpreadsheetDocument.openAsync(out);
const wp2 = doc2.workbookPart!;
for (const wsp of wp2.worksheetParts) {
  for (const el of (wsp.worksheet as any).descendants()) {
    if (el.localName === "pivotSelection") {
      console.log("after roundtrip — pivotSelection extAttrs:");
      for (const [k, v] of el.extendedAttributes) console.log(`  ${k}=${v}`);
      console.log("  id typed:", el.id?.toString?.());
      break;
    }
  }
}

// Also inspect raw bytes
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";
const zip = new ZipReader(new BlobReader(new Blob([out])));
for (const e of await zip.getEntries()) {
  if (e.filename === "xl/worksheets/sheet1.xml") {
    const txt = await e.getData!(new TextWriter());
    const m = txt.match(/<x:pivotSelection[^/]*/);
    if (m) console.log("\nraw pivotSelection in serialized output:\n  " + m[0]);
  }
}
await zip.close();
