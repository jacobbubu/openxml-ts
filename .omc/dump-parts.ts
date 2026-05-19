import { readFile } from "node:fs/promises";
import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

async function partList(path: string): Promise<void> {
  console.log(`\n=== ${path} ===`);
  const zip = new ZipReader(new BlobReader(new Blob([await readFile(path)])));
  for (const e of await zip.getEntries()) {
    console.log(`  ${e.filename} (${e.uncompressedSize} bytes)`);
  }
  await zip.close();
}

await partList("test/fixtures/golden/basicspreadsheet.xlsx");
await partList("test/fixtures/golden/Spreadsheet.xlsx");
await partList("/tmp/openxml-verify-3-10/excel-create.xlsx");
