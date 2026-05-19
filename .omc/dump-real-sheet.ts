import { readFile } from "node:fs/promises";
import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

const zip = new ZipReader(
  new BlobReader(new Blob([await readFile("test/fixtures/golden/basicspreadsheet.xlsx")])),
);
for (const e of await zip.getEntries()) {
  if (e.filename !== "xl/worksheets/sheet1.xml" || e.getData === undefined) continue;
  const txt = await e.getData(new TextWriter());
  console.log(txt.slice(0, 2000));
}
await zip.close();
