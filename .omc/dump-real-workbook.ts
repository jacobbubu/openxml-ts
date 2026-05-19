import { readFile } from "node:fs/promises";
import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

const want = new Set(["xl/workbook.xml", "[Content_Types].xml", "xl/styles.xml"]);
const zip = new ZipReader(
  new BlobReader(new Blob([await readFile("test/fixtures/golden/Spreadsheet.xlsx")])),
);
for (const e of await zip.getEntries()) {
  if (!want.has(e.filename) || e.getData === undefined) continue;
  const txt = await e.getData(new TextWriter());
  console.log(`\n--- ${e.filename} ---`);
  console.log(txt.slice(0, 1500));
}
await zip.close();
