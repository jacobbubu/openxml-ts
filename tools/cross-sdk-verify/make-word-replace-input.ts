/**
 * Generates a word template with {{client}} placeholders for use as input to word-replace.ts.
 * Usage: bun run make-word-replace-input.ts <output.docx>
 */
import { Paragraph, Run, Text, WordprocessingDocument } from "../../src/word/index.js";

const [outputPath] = process.argv.slice(2);
if (!outputPath) {
  process.stderr.write("usage: make-word-replace-input.ts <output.docx>\n");
  process.exit(2);
}

const doc = WordprocessingDocument.create();
const body = doc.mainDocumentPart?.document.firstChild()!;

for (const line of ["Dear {{client}},", "Thank you for your business, {{client}}.", "Sincerely,"]) {
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = line;
  r.appendChild(t);
  p.appendChild(r);
  (body as { appendChild: (e: unknown) => void }).appendChild(p);
}

await doc.saveAsAsync(outputPath);
process.stdout.write(`Wrote ${outputPath}\n`);
