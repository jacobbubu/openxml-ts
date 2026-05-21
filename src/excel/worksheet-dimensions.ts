// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-33：Excel 列宽 / 行高便捷层。
 *
 * 公开 API：
 *   setColumnWidth(worksheet, { from, to, widthChars })      // 设一段连续列宽
 *   setColumnWidth(worksheet, { from, to, widthChars: undefined })  // 清除
 *   getColumnWidth(worksheet, columnIndex)                    // 读 1-based 列宽
 *   setRowHeight(row, heightPoints)                           // 设行高
 *   setRowHeight(row, undefined)                              // 清行高
 *   getRowHeight(row)                                         // 读行高
 *
 * - 列宽单位：Excel 字符宽度（Calibri 11pt 下约等于显示像素数 / 7）
 * - 行高单位：磅（point）
 * - 设列宽时若与现有 `<x:col>` 范围重叠：按 [min..max] 切分 / 替换，保证最终
 *   范围互不重叠
 */

import { BooleanValue, StringValue, UInt32Value } from "../element/index.js";
import { Column } from "./generated/column.js";
import { Columns } from "./generated/columns.js";
import type { Row } from "./generated/row.js";
import { SheetData } from "./generated/sheet-data.js";
import type { Worksheet } from "./generated/worksheet.js";

export interface ColumnWidthRange {
  /** 1-based 起始列号（含）。 */
  readonly from: number;
  /** 1-based 终止列号（含）。 */
  readonly to: number;
  /** 列宽（字符数，Excel 单位）。undefined 表示清除该区间的自定义宽度。 */
  readonly widthChars: number | undefined;
}

/**
 * 设置 worksheet 上一段连续列的宽度。
 *
 * 行为：
 * - widthChars = undefined：把 [from..to] 范围内的 col 元素 删除 / 缩短 / 拆分，
 *   恢复 Excel 默认列宽
 * - widthChars 有值：先做 undefined 路径的清理，再插入一条 col 元素
 *   （min=from, max=to, width=W, customWidth="1"）
 * - 自动确保 cols 存在；空 cols 自动清掉
 */
export function setColumnWidth(worksheet: Worksheet, range: ColumnWidthRange): void {
  if (range.from < 1 || range.to < range.from) {
    throw new RangeError(`invalid range: from=${range.from} to=${range.to}`);
  }
  const cols = ensureColumns(worksheet, range.widthChars === undefined);
  if (cols === undefined) return;

  removeOverlappingRanges(cols, range.from, range.to);

  if (range.widthChars !== undefined) {
    const col = new Column();
    col.min = UInt32Value.parse(String(range.from));
    col.max = UInt32Value.parse(String(range.to));
    col.width = StringValue.parse(String(range.widthChars));
    col.customWidth = new BooleanValue(true);
    cols.appendChild(col);
  }

  if (firstColumn(cols) === undefined) worksheet.children.remove(cols);
}

/**
 * 读取 1-based 列序号对应的宽度。落在某 `<x:col>` 的 [min..max] 区间内返回该
 * width；没有匹配返 undefined（即用 Excel 默认宽度）。
 */
export function getColumnWidth(worksheet: Worksheet, columnIndex: number): number | undefined {
  const cols = worksheet.firstChild(Columns);
  if (cols === undefined) return undefined;
  for (const c of cols.children) {
    if (!(c instanceof Column)) continue;
    const min = parseUInt(c.min?.toString());
    const max = parseUInt(c.max?.toString());
    if (min === undefined || max === undefined) continue;
    if (columnIndex < min || columnIndex > max) continue;
    const w = c.width?.toString();
    if (w === undefined) return undefined;
    const n = Number.parseFloat(w);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

/**
 * 设行高（磅）。undefined 清除自定义行高。
 */
export function setRowHeight(row: Row, heightPoints: number | undefined): void {
  if (heightPoints === undefined) {
    row.height = undefined;
    row.customHeight = undefined;
    return;
  }
  row.height = StringValue.parse(String(heightPoints));
  row.customHeight = new BooleanValue(true);
}

/**
 * 读行高（磅）。未设返 undefined。
 */
export function getRowHeight(row: Row): number | undefined {
  const h = row.height?.toString();
  if (h === undefined) return undefined;
  const n = Number.parseFloat(h);
  return Number.isFinite(n) ? n : undefined;
}

// ─── 内部 ────────────────────────────────────────────────────────────────────

function parseUInt(s: string | undefined): number | undefined {
  if (s === undefined) return undefined;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : undefined;
}

function firstColumn(cols: Columns): Column | undefined {
  for (const c of cols.children) if (c instanceof Column) return c;
  return undefined;
}

function ensureColumns(worksheet: Worksheet, readOnly: boolean): Columns | undefined {
  const existing = worksheet.firstChild(Columns);
  if (existing !== undefined) return existing;
  if (readOnly) return undefined;
  const cols = new Columns();
  // OOXML 顺序要求 cols 在 sheetData 之前；用 insertBefore，找不到 sheetData 时 append。
  const sheetData = worksheet.firstChild(SheetData);
  if (sheetData !== undefined) worksheet.children.insertBefore(cols, sheetData);
  else worksheet.appendChild(cols);
  return cols;
}

function removeOverlappingRanges(cols: Columns, from: number, to: number): void {
  const toRemove: Column[] = [];
  const toAppend: Column[] = [];
  for (const c of cols.children) {
    if (!(c instanceof Column)) continue;
    const min = parseUInt(c.min?.toString());
    const max = parseUInt(c.max?.toString());
    if (min === undefined || max === undefined) continue;
    if (max < from || min > to) continue;
    toRemove.push(c);
    // 左侧残段
    if (min < from) toAppend.push(cloneColumnRange(c, min, from - 1));
    // 右侧残段
    if (max > to) toAppend.push(cloneColumnRange(c, to + 1, max));
  }
  for (const c of toRemove) cols.children.remove(c);
  for (const c of toAppend) cols.appendChild(c);
}

function cloneColumnRange(source: Column, newMin: number, newMax: number): Column {
  const c = new Column();
  c.min = UInt32Value.parse(String(newMin));
  c.max = UInt32Value.parse(String(newMax));
  if (source.width !== undefined) c.width = source.width;
  if (source.customWidth !== undefined) c.customWidth = source.customWidth;
  if (source.style !== undefined) c.style = source.style;
  if (source.hidden !== undefined) c.hidden = source.hidden;
  if (source.bestFit !== undefined) c.bestFit = source.bestFit;
  if (source.outlineLevel !== undefined) c.outlineLevel = source.outlineLevel;
  if (source.collapsed !== undefined) c.collapsed = source.collapsed;
  if (source.phonetic !== undefined) c.phonetic = source.phonetic;
  return c;
}
