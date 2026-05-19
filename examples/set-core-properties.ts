/**
 * 例子（Epic-29）：构造 docx/xlsx/pptx 各设 title/author/created 元数据。
 *
 * 跑法：
 *   bun run examples/set-core-properties.ts <output-prefix>
 *
 * 产出 <prefix>.docx / .xlsx / .pptx 三份文件。
 */

import { SpreadsheetDocument } from "../src/excel/index.js";
import { PresentationDocument } from "../src/ppt/index.js";
import { WordprocessingDocument } from "../src/word/index.js";

async function main(): Promise<void> {
  const [prefix] = process.argv.slice(2);
  if (prefix === undefined) {
    process.stderr.write("usage: set-core-properties <output-prefix>\n");
    process.exit(2);
  }

  const now = new Date();

  // Word
  const wd = WordprocessingDocument.create();
  wd.coreProperties.title = "Q4 Report";
  wd.coreProperties.creator = "Alice";
  wd.coreProperties.lastModifiedBy = "Alice";
  wd.coreProperties.subject = "Quarterly business review";
  wd.coreProperties.keywords = "quarterly,report,Q4";
  wd.coreProperties.created = now;
  wd.coreProperties.modified = now;
  wd.coreProperties.revision = "1";
  await wd.saveAsAsync(`${prefix}.docx`);

  // Excel
  const xd = SpreadsheetDocument.create();
  xd.coreProperties.title = "Q4 Numbers";
  xd.coreProperties.creator = "Bob";
  xd.coreProperties.created = now;
  await xd.saveAsAsync(`${prefix}.xlsx`);

  // PPT
  const pd = PresentationDocument.create();
  pd.coreProperties.title = "Q4 Deck";
  pd.coreProperties.creator = "Charlie";
  pd.coreProperties.created = now;
  await pd.saveAsAsync(`${prefix}.pptx`);

  process.stdout.write(`Wrote ${prefix}.{docx,xlsx,pptx} with core properties\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
