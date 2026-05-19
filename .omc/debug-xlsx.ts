import { SpreadsheetDocument } from "../src/excel/index.js";

const doc = SpreadsheetDocument.create();
const bytes = await doc.saveAsBytesAsync();
console.log("bytes length:", bytes.byteLength);

// Decompress ZIP, inspect xl/workbook.xml + xl/worksheets/sheet1.xml + xl/sharedStrings.xml
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";
const zip = new ZipReader(new BlobReader(new Blob([bytes])));
const entries = await zip.getEntries();
for (const e of entries) {
  if (!e.filename.endsWith(".xml") && !e.filename.endsWith(".rels")) continue;
  const writer = new TextWriter();
  const text = await e.getData!(writer);
  console.log(`\n===== ${e.filename} =====`);
  console.log(text);
}
await zip.close();
