// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-44：Excel 内建数字格式应用 helper。
 *
 * Excel 数字格式机制：cell `s` 属性 (Cell.styleIndex) 指向 `<x:cellXfs>` 第 N 条
 * `<x:xf>`，每条 `<x:xf>` 的 `numFmtId` 指向格式。Excel 内建格式 ID（0-22 / 37-49 /
 * 81）不需要在 `<x:numFmts>` 注册。
 *
 * 公开 API：
 *
 *   setBuiltInNumberFormat(doc, cell, BuiltInNumberFormat.CURRENCY)
 *
 * 行为：
 * - 在 stylesheet.cellFormats 找已有 xf 条目（fontId=0/fillId=0/borderId=0/xfId=0、
 *   numFmtId=builtInId、applyNumberFormat=true）；
 * - 找不到就 append 一条；
 * - 设置 cell.styleIndex 指向该条目的 0-based index。
 */

import { BooleanValue, UInt32Value } from "../element/index.js";
import { CellFormat } from "./generated/cell-format.js";
import { CellFormats } from "./generated/cell-formats.js";
import type { Cell } from "./generated/cell.js";
import type { SpreadsheetDocument } from "./spreadsheet-document.js";

/**
 * Excel 常用内建数字格式 ID。完整列表见 OOXML §18.8.30。
 * 这里只列常用的几条，用户可以直接传 number 而非 enum。
 */
export const BuiltInNumberFormat = {
  /** General（默认） */
  GENERAL: 0,
  /** 整数 `0` */
  INTEGER: 1,
  /** 两位小数 `0.00` */
  DECIMAL_2: 2,
  /** 千分位整数 `#,##0` */
  THOUSANDS_INT: 3,
  /** 千分位两位小数 `#,##0.00` */
  THOUSANDS_DECIMAL_2: 4,
  /** 百分比整数 `0%` */
  PERCENT_INT: 9,
  /** 百分比两位小数 `0.00%` */
  PERCENT_DECIMAL_2: 10,
  /** 日期 `m/d/yyyy` */
  DATE_SHORT: 14,
  /** 日期+时间 `m/d/yyyy h:mm` */
  DATETIME: 22,
  /** 货币 `_-* "$"#,##0.00_-` */
  CURRENCY: 44,
} as const;

/**
 * 给 cell 应用内建数字格式。返回新 / 已有 cellXf 条目的 0-based index。
 *
 * 仅支持内建 ID（0-22 / 37-49 / 81）；自定义格式字符串单开 Epic。
 */
export function setBuiltInNumberFormat(
  doc: SpreadsheetDocument,
  cell: Cell,
  builtInId: number,
): number {
  if (!Number.isInteger(builtInId) || builtInId < 0 || builtInId > 200) {
    throw new RangeError(`setBuiltInNumberFormat: builtInId out of range: ${builtInId}`);
  }
  const stylesPart = doc.workbookStylesPart;
  if (stylesPart === undefined) {
    throw new Error("setBuiltInNumberFormat: workbook has no styles part");
  }
  const stylesheet = stylesPart.stylesheet;
  if (stylesheet === undefined) {
    throw new Error("setBuiltInNumberFormat: stylesheet root not loaded");
  }
  const cellFormats = stylesheet.firstChild(CellFormats);
  if (cellFormats === undefined) {
    throw new Error("setBuiltInNumberFormat: stylesheet missing <cellXfs>");
  }

  let index = -1;
  let cursor = 0;
  for (const child of cellFormats.children) {
    if (!(child instanceof CellFormat)) {
      cursor += 1;
      continue;
    }
    if (matchesBuiltInXf(child, builtInId)) {
      index = cursor;
      break;
    }
    cursor += 1;
  }

  if (index < 0) {
    const xf = new CellFormat();
    xf.numberFormatId = UInt32Value.parse(String(builtInId));
    xf.fontId = UInt32Value.parse("0");
    xf.fillId = UInt32Value.parse("0");
    xf.borderId = UInt32Value.parse("0");
    xf.formatId = UInt32Value.parse("0");
    xf.applyNumberFormat = new BooleanValue(true);
    cellFormats.appendChild(xf);
    // 重新数 cellFormat child 数（仅算 CellFormat 实例，跳过其它非典型子）
    let total = 0;
    for (const c of cellFormats.children) {
      if (c instanceof CellFormat) total += 1;
    }
    index = total - 1;
    cellFormats.extendedAttributes.set("count", String(total));
  }

  cell.styleIndex = UInt32Value.parse(String(index));
  return index;
}

function matchesBuiltInXf(xf: CellFormat, builtInId: number): boolean {
  const numFmtId = xf.numberFormatId?.toString();
  if (numFmtId !== String(builtInId)) return false;
  // 简化判断：fontId/fillId/borderId 都是 0（或 undefined 视为 0）
  const fontId = xf.fontId?.toString() ?? "0";
  const fillId = xf.fillId?.toString() ?? "0";
  const borderId = xf.borderId?.toString() ?? "0";
  if (fontId !== "0" || fillId !== "0" || borderId !== "0") return false;
  return true;
}
