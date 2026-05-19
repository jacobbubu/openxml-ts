/**
 * 例子（Epic-49）：演示 Cell.formula / Cell.cachedValue 访问器。
 *
 * 创建一个含 SUM、AVERAGE、MAX、MIN 公式的工作表，并写入缓存值供
 * 离线读取时使用。
 *
 * 跑法：
 *   bun run examples/excel-cell-formula.ts /tmp/out.xlsx
 *   file /tmp/out.xlsx  # → "Microsoft Excel 2007+"
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import { Cell, Row, SheetData, SpreadsheetDocument } from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-cell-formula <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  if (ws === undefined) throw new Error("missing Worksheet");
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("missing SheetData");

  // ── Row 1: 数据（A1:A5 = 10,20,30,40,50）─────────────────────────────────
  const dataValues = [10, 20, 30, 40, 50];
  for (const [i, val] of dataValues.entries()) {
    const row = new Row();
    row.rowIndex = UInt32Value.parse(String(i + 1));
    const cell = new Cell();
    cell.cellReference = StringValue.parse(`A${i + 1}`);
    cell.cachedValue = String(val);
    row.appendChild(cell);
    sheetData.appendChild(row);
  }

  // ── Row 7: SUM(A1:A5) ───────────────────────────────────────────────────
  const sumRow = new Row();
  sumRow.rowIndex = UInt32Value.parse("7");
  const sumLabelCell = new Cell();
  sumLabelCell.cellReference = StringValue.parse("A7");
  sumLabelCell.cachedValue = "SUM";
  sumRow.appendChild(sumLabelCell);

  const sumCell = new Cell();
  sumCell.cellReference = StringValue.parse("B7");
  sumCell.formula = "SUM(A1:A5)";
  sumCell.cachedValue = "150"; // 缓存值：Excel 重新计算前可读
  sumRow.appendChild(sumCell);
  sheetData.appendChild(sumRow);

  // ── Row 8: AVERAGE(A1:A5) ───────────────────────────────────────────────
  const avgRow = new Row();
  avgRow.rowIndex = UInt32Value.parse("8");
  const avgLabelCell = new Cell();
  avgLabelCell.cellReference = StringValue.parse("A8");
  avgLabelCell.cachedValue = "AVERAGE";
  avgRow.appendChild(avgLabelCell);

  const avgCell = new Cell();
  avgCell.cellReference = StringValue.parse("B8");
  avgCell.formula = "AVERAGE(A1:A5)";
  avgCell.cachedValue = "30";
  avgRow.appendChild(avgCell);
  sheetData.appendChild(avgRow);

  // ── Row 9: MAX(A1:A5) ───────────────────────────────────────────────────
  const maxRow = new Row();
  maxRow.rowIndex = UInt32Value.parse("9");
  const maxLabelCell = new Cell();
  maxLabelCell.cellReference = StringValue.parse("A9");
  maxLabelCell.cachedValue = "MAX";
  maxRow.appendChild(maxLabelCell);

  const maxCell = new Cell();
  maxCell.cellReference = StringValue.parse("B9");
  maxCell.formula = "MAX(A1:A5)";
  maxCell.cachedValue = "50";
  maxRow.appendChild(maxCell);
  sheetData.appendChild(maxRow);

  // ── Row 10: MIN(A1:A5) ──────────────────────────────────────────────────
  const minRow = new Row();
  minRow.rowIndex = UInt32Value.parse("10");
  const minLabelCell = new Cell();
  minLabelCell.cellReference = StringValue.parse("A10");
  minLabelCell.cachedValue = "MIN";
  minRow.appendChild(minLabelCell);

  const minCell = new Cell();
  minCell.cellReference = StringValue.parse("B10");
  minCell.formula = "MIN(A1:A5)";
  minCell.cachedValue = "10";
  minRow.appendChild(minCell);
  sheetData.appendChild(minRow);

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`Wrote ${outputPath} (5 data rows + 4 formula rows: SUM/AVERAGE/MAX/MIN)\n`);

  // ── 验证：重新打开后读回公式 ────────────────────────────────────────────
  process.stdout.write("Verifying by reopening…\n");
  const bytes = await doc.saveAsBytesAsync();
  const reopened = await SpreadsheetDocument.openAsync(bytes);
  // biome-ignore lint/style/noNonNullAssertion: parts are always present in create()
  const cells = [...reopened.workbookPart!.worksheetParts[0]!.worksheet.descendants(Cell)];

  const getFormula = (ref: string): string | undefined =>
    cells.find((c) => c.cellReference?.toString() === ref)?.formula;
  const getCached = (ref: string): string | undefined =>
    cells.find((c) => c.cellReference?.toString() === ref)?.cachedValue;

  const checks: Array<[string, string, string]> = [
    ["B7", "SUM(A1:A5)", "150"],
    ["B8", "AVERAGE(A1:A5)", "30"],
    ["B9", "MAX(A1:A5)", "50"],
    ["B10", "MIN(A1:A5)", "10"],
  ];

  let allOk = true;
  for (const [ref, expectedFormula, expectedCached] of checks) {
    const formula = getFormula(ref);
    const cached = getCached(ref);
    const ok = formula === expectedFormula && cached === expectedCached;
    if (!ok) allOk = false;
    process.stdout.write(
      `  ${ref}: formula="${formula}" cached="${cached}" ${ok ? "OK" : "FAIL"}\n`,
    );
  }

  if (!allOk) {
    process.stderr.write("Verification failed!\n");
    process.exit(1);
  }
  process.stdout.write("All checks passed.\n");
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
