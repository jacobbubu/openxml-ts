import { SpreadsheetDocument } from "../src/excel/index.js";
import { Cell, CellValue, Row, SheetData } from "../src/excel/index.js";

const doc = SpreadsheetDocument.create();
const wsp = doc.workbookPart!.worksheetParts[0]!;
const sd = wsp.worksheet.firstChild(SheetData)!;
const r = new Row();
const c = new Cell();
const v = new CellValue();
v.text = "42";
c.appendChild(v);
r.appendChild(c);
sd.appendChild(r);

const out = await doc.saveAsBytesAsync();
console.log("bytes len:", out.byteLength);

// dump worksheet xml
import { ZipReader, BlobReader, TextWriter } from "@zip.js/zip.js";
const zip = new ZipReader(new BlobReader(new Blob([out])));
for (const e of await zip.getEntries()) {
  if (e.filename === "xl/worksheets/sheet1.xml") {
    const txt = await e.getData!(new TextWriter());
    console.log("worksheet xml:", txt);
  }
}
await zip.close();

const re = await SpreadsheetDocument.openAsync(out);
const reSd = re.workbookPart!.worksheetParts[0]!.worksheet.firstChild(SheetData);
console.log("reSd:", reSd?.localName, reSd?.constructor.name);
if (reSd) {
  const reRow = reSd.firstChild(Row);
  console.log("reRow:", reRow?.localName, reRow?.constructor.name);
  if (reRow) {
    const reCell = reRow.firstChild(Cell);
    console.log("reCell:", reCell?.localName, reCell?.constructor.name);
    if (reCell) {
      const reV = reCell.firstChild(CellValue);
      console.log("reV:", reV?.localName, reV?.constructor.name, "text:", reV?.text);
    }
  }
}
