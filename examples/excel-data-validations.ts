/**
 * 例子（Epic-58）：演示 Excel 数据验证（下拉列表 + 数值范围）。
 *
 * 跑法：
 *   bun run examples/excel-data-validations.ts <output.xlsx>
 */

import { StringValue, UInt32Value } from "../src/element/index.js";
import {
  Cell,
  CellValue,
  Row,
  SheetData,
  SpreadsheetDocument,
  addCellListValidation,
  addCellRangeValidation,
  getCellValidations,
} from "../src/excel/index.js";

async function main(): Promise<void> {
  const [outputPath] = process.argv.slice(2);
  if (outputPath === undefined) {
    process.stderr.write("usage: excel-data-validations <output.xlsx>\n");
    process.exit(2);
  }

  const doc = SpreadsheetDocument.create();
  const ws = doc.workbookPart?.worksheetParts[0]?.worksheet;
  if (ws === undefined) throw new Error("expected default worksheet");
  const sheetData = ws.firstChild(SheetData);
  if (sheetData === undefined) throw new Error("expected default SheetData");

  // 添加标题行
  const headerRow = new Row();
  headerRow.rowIndex = UInt32Value.parse("1");
  for (const [ref, text] of [
    ["A1", "水果选择（A 列）"],
    ["B1", "数量（B 列）"],
    ["C1", "价格（C 列，小数）"],
  ] as const) {
    const cell = new Cell();
    cell.cellReference = StringValue.parse(ref);
    cell.dataType = StringValue.parse("str");
    const v = new CellValue();
    v.text = text;
    cell.appendChild(v);
    headerRow.appendChild(cell);
  }
  sheetData.appendChild(headerRow);

  // 添加数据行（留空让用户填）
  for (let i = 2; i <= 11; i += 1) {
    const row = new Row();
    row.rowIndex = UInt32Value.parse(String(i));
    sheetData.appendChild(row);
  }

  // A 列：下拉列表验证（水果选择）
  addCellListValidation(ws, "A2:A11", {
    values: ["苹果", "香蕉", "樱桃", "橙子", "西瓜"],
    promptTitle: "请选择水果",
    prompt: "从下拉列表中选择一种水果",
    errorTitle: "无效输入",
    error: "请从列表中选择水果",
  });

  // B 列：整数范围验证（数量 1~1000）
  addCellRangeValidation(ws, "B2:B11", {
    type: "whole",
    min: 1,
    max: 1000,
    promptTitle: "请输入数量",
    prompt: "请输入 1 到 1000 之间的整数",
    errorTitle: "无效数量",
    error: "数量必须是 1 到 1000 之间的整数",
  });

  // C 列：小数范围验证（价格 0.01~9999.99）
  addCellRangeValidation(ws, "C2:C11", {
    type: "decimal",
    min: 0.01,
    max: 9999.99,
    promptTitle: "请输入价格",
    prompt: "请输入 0.01 到 9999.99 之间的价格",
  });

  const validations = getCellValidations(ws);
  process.stdout.write(`数据验证规则数量: ${validations.length}\n`);
  for (const v of validations) {
    process.stdout.write(
      `  ${v.sqref}: type=${v.type}, formula1=${v.formula1}, formula2=${v.formula2}\n`,
    );
  }

  await doc.saveAsAsync(outputPath);
  process.stdout.write(`已写入 ${outputPath}\n`);
}

main().catch((err) => {
  process.stderr.write(`failed: ${(err as Error).stack ?? err}\n`);
  process.exit(1);
});
