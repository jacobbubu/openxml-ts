/**
 * 例子（Epic-62）：演示 Sheet 视觉元数据访问器
 * （tabColor / state / activeTab）。
 *
 * 跑法：
 *   bun run examples/excel-sheet-metadata.ts <output.xlsx>
 *
 * 演示内容：
 *   - getSheetState / setSheetState：读写 Sheet 可见性
 *   - getActiveSheet / setActiveSheet：读写活动 sheet 索引
 *   - getWorksheetTabColor / setWorksheetTabColor：读写标签颜色
 *   - clearWorksheetTabColor：清除标签颜色
 */

import { StringValue } from "../src/element/index.js";
import {
  Cell,
  CellValue,
  Row,
  Sheet,
  SheetData,
  Sheets,
  SpreadsheetDocument,
  clearWorksheetTabColor,
  getActiveSheet,
  getSheetState,
  getWorksheetTabColor,
  setActiveSheet,
  setSheetState,
  setWorksheetTabColor,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-sheet-metadata <output.xlsx>\n");
    process.exit(2);
  }

  // 创建工作簿（包含一个默认 Sheet）
  const doc = SpreadsheetDocument.create();
  const workbookPart = doc.workbookPart!;
  const workbook = workbookPart.workbook;

  // 取第一个 worksheet
  const ws = workbookPart.worksheetParts[0]!.worksheet;

  // 写入一行示例数据
  const sheetData = ws.firstChild(SheetData);
  if (sheetData !== undefined) {
    const row = new Row();
    const cell = new Cell();
    cell.cellReference = StringValue.parse("A1");
    cell.dataType = StringValue.parse("str");
    const val = new CellValue();
    val.text = "Epic-62 Sheet 视觉元数据演示";
    cell.appendChild(val);
    row.appendChild(cell);
    sheetData.appendChild(row);
  }

  // 取工作簿中第一个 <x:sheet> 元素
  const sheetsEl = workbook.firstChild(Sheets);
  let sheet: Sheet | undefined;
  if (sheetsEl !== undefined) {
    for (const child of sheetsEl.children) {
      if (child instanceof Sheet) {
        sheet = child;
        break;
      }
    }
  }

  if (sheet === undefined) throw new Error("no Sheet element found");

  // ─── 演示 SheetState ──────────────────────────────────────────────────────
  process.stdout.write(`初始 state: ${getSheetState(sheet)}\n`); // "visible"

  setSheetState(sheet, "hidden");
  process.stdout.write(`set hidden → state: ${getSheetState(sheet)}\n`); // "hidden"

  setSheetState(sheet, "visible");
  process.stdout.write(`set visible → state: ${getSheetState(sheet)}\n`); // "visible"

  // ─── 演示 activeTab ───────────────────────────────────────────────────────
  process.stdout.write(`初始 activeTab: ${getActiveSheet(workbook)}\n`); // 0

  setActiveSheet(workbook, 0);
  process.stdout.write(`set activeSheet(0) → activeTab: ${getActiveSheet(workbook)}\n`); // 0

  // ─── 演示 tabColor ────────────────────────────────────────────────────────
  process.stdout.write(`初始 tabColor: ${String(getWorksheetTabColor(ws))}\n`); // undefined

  setWorksheetTabColor(ws, "FFFF0000"); // 红色
  process.stdout.write(`set FFFF0000 → tabColor: ${getWorksheetTabColor(ws)}\n`); // "FFFF0000"

  setWorksheetTabColor(ws, "FF0000FF"); // 蓝色（覆盖）
  process.stdout.write(`set FF0000FF → tabColor: ${getWorksheetTabColor(ws)}\n`); // "FF0000FF"

  clearWorksheetTabColor(ws);
  process.stdout.write(`clearTabColor → tabColor: ${String(getWorksheetTabColor(ws))}\n`); // undefined

  // ─── 最终状态：红色标签，sheet 保持可见 ──────────────────────────────────
  setWorksheetTabColor(ws, "FFFF0000");
  process.stdout.write(`最终 tabColor: ${getWorksheetTabColor(ws)}\n`);
  process.stdout.write(`最终 state: ${getSheetState(sheet)}\n`);
  process.stdout.write(`最终 activeTab: ${getActiveSheet(workbook)}\n`);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
