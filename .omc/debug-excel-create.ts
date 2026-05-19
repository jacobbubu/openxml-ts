import { readFile } from "node:fs/promises";
import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";

async function dump(path: string, label: string): Promise<void> {
  console.log(`\n=========== ${label} (${path}) ===========`);
  const bytes = new Uint8Array(await readFile(path));
  const zip = new ZipReader(new BlobReader(new Blob([bytes])));
  const entries = await zip.getEntries();
  for (const e of entries) {
    if (!e.filename.endsWith(".xml") && !e.filename.endsWith(".rels")) continue;
    if (e.getData === undefined) continue;
    const text = await e.getData(new TextWriter());
    console.log(`\n--- ${e.filename} ---`);
    console.log(text);
  }
  await zip.close();
}

await dump("/tmp/openxml-verify-3-10/excel-create.xlsx", "OUR excel-create.xlsx");
await dump("test/fixtures/golden/basicspreadsheet.xlsx", "REAL basicspreadsheet.xlsx");
