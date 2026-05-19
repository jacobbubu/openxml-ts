import { readFile } from "node:fs/promises";
import { Cell, SpreadsheetDocument } from "../src/excel/index.js";

const DIR = "/tmp/openxml-verify-3-10";

async function listCells(path: string): Promise<string[]> {
  const bytes = new Uint8Array(await readFile(path));
  const doc = await SpreadsheetDocument.openAsync(bytes);
  const out: string[] = [];
  for (const wsp of doc.workbookPart?.worksheetParts ?? []) {
    for (const c of wsp.worksheet.descendants(Cell)) {
      // resolvedText 自动覆盖 sharedStr / inlineStr / 直接 cellValue 三种路径
      const text = c.resolvedText;
      if (text !== undefined) out.push(text);
    }
  }
  return out;
}

console.log("excel-create.xlsx:        ", JSON.stringify(await listCells(`${DIR}/excel-create.xlsx`)));
console.log("excel-replace-input.xlsx: ", JSON.stringify(await listCells(`${DIR}/excel-replace-input.xlsx`)));
console.log("excel-replace-output.xlsx:", JSON.stringify(await listCells(`${DIR}/excel-replace-output.xlsx`)));
