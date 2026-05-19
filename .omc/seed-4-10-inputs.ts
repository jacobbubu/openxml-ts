import { readFile, writeFile } from "node:fs/promises";
import { PresentationDocument } from "../src/ppt/index.js";

const OUT = "/tmp/openxml-verify-4-10";

// 1. Roundtrip 3 个 fixture（test/ppt/fixtures/）
const FIXTURES = ["mcppt.pptx", "autosave.pptx", "Of16-02.pptx"] as const;
for (const f of FIXTURES) {
  const bytes = new Uint8Array(await readFile(`test/ppt/fixtures/${f}`));
  const doc = await PresentationDocument.openAsync(bytes);
  const pp = doc.presentationPart;
  if (pp !== undefined) {
    void pp.presentation;
    for (const sp of pp.slideParts) void sp.slide;
  }
  const out = await doc.saveAsBytesAsync();
  const outPath = `${OUT}/${f.replace(/\.pptx$/, ".roundtrip.pptx")}`;
  await writeFile(outPath, out);
  console.log(`roundtripped ${f} → ${outPath} (${out.byteLength} bytes)`);
}
