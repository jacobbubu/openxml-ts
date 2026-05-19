import { readFile, writeFile } from "node:fs/promises";
import {
  Cell,
  InlineString,
  Row,
  SheetData,
  SpreadsheetDocument,
  Text,
} from "../src/excel/index.js";

const OUT = "/tmp/openxml-verify-3-10";

// 1. Seed replace-input.xlsx 含 `{{client}}` 占位
{
  const doc = SpreadsheetDocument.create();
  const sd = doc.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData)!;
  const rows: readonly (readonly string[])[] = [
    ["Dear {{client}}", "this is a sample", "openxml-ts demo"],
    ["Contract for {{client}}", "row 2 col 2", "row 2 col 3"],
    ["Cell A3", "Cell B3", "Sincerely, openxml-ts"],
  ];
  for (let rowIdx = 0; rowIdx < rows.length; rowIdx += 1) {
    const cols = rows[rowIdx] as readonly string[];
    const r = new Row();
    r.extendedAttributes.set("r", String(rowIdx + 1));
    for (let colIdx = 0; colIdx < cols.length; colIdx += 1) {
      const text = cols[colIdx] as string;
      const c = new Cell();
      c.extendedAttributes.set("r", `${String.fromCharCode(65 + colIdx)}${rowIdx + 1}`);
      c.extendedAttributes.set("t", "inlineStr");
      const is = new InlineString();
      const t = new Text();
      t.text = text;
      is.appendChild(t);
      c.appendChild(is);
      r.appendChild(c);
    }
    sd.appendChild(r);
  }
  await doc.saveAsAsync(`${OUT}/excel-replace-input.xlsx`);
  console.log(`seeded ${OUT}/excel-replace-input.xlsx`);
}

// 2. Roundtrip 3 个 fixture：open → saveAsBytes → 写到新文件
const FIXTURES = [
  "basicspreadsheet.xlsx",
  "Spreadsheet.xlsx",
  "missingcalcchainpart.xlsx",
] as const;

for (const f of FIXTURES) {
  const bytes = new Uint8Array(await readFile(`test/fixtures/golden/${f}`));
  const doc = await SpreadsheetDocument.openAsync(bytes);
  // 触发 typed root 加载，让 saveAsBytes 真正写出 element 树
  const wp = doc.workbookPart;
  if (wp !== undefined) {
    void wp.workbook;
    for (const wsp of wp.worksheetParts) void wsp.worksheet;
  }
  const out = await doc.saveAsBytesAsync();
  await writeFile(`${OUT}/${f.replace(/\.xlsx$/, ".roundtrip.xlsx")}`, out);
  console.log(`roundtripped ${f} → ${OUT}/${f.replace(/\.xlsx$/, ".roundtrip.xlsx")} (${out.byteLength} bytes)`);
}
