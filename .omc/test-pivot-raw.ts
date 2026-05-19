import { SpreadsheetDocument } from "../src/excel/index.js";
import { readFile } from "node:fs/promises";
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";

const bytes = new Uint8Array(await readFile("test/fixtures/golden/basicspreadsheet.xlsx"));
const doc = await SpreadsheetDocument.openAsync(bytes);
const wp = doc.workbookPart!;
for (const wsp of wp.worksheetParts) void wsp.worksheet;
const out = await doc.saveAsBytesAsync();

const zip = new ZipReader(new BlobReader(new Blob([out])));
for (const e of await zip.getEntries()) {
  if (e.filename === "xl/worksheets/sheet1.xml") {
    const txt = await e.getData!(new TextWriter());
    const idx = txt.indexOf("<x:pivotSelection");
    const end = txt.indexOf("/>", idx);
    console.log("pivotSelection element (raw):");
    console.log(txt.slice(idx, end + 2));
  }
}
await zip.close();
