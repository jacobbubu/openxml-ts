/**
 * Epic-62：Excel Sheet 视觉元数据访问器。
 *
 * 提供三类便捷操作：
 *
 * 1. Sheet 可见性（workbook.xml `<x:sheet state>`）：
 *    setSheetState / getSheetState
 *
 * 2. 活动工作表索引（workbook.xml BookViews > WorkbookView.activeTab）：
 *    setActiveSheet / getActiveSheet
 *
 * 3. Worksheet 标签颜色（sheetN.xml `<x:sheetPr><x:tabColor rgb="...">`)：
 *    setWorksheetTabColor / getWorksheetTabColor / clearWorksheetTabColor
 *
 * 自动创建链：SheetPr → TabColor（不存在时按 OOXML schema 顺序插入）。
 */

import { HexBinaryValue, StringValue, UInt32Value } from "../element/index.js";
import { BookViews } from "./generated/book-views.js";
import { SheetProperties } from "./generated/sheet-properties.js";
import type { Sheet } from "./generated/sheet.js";
import { TabColor } from "./generated/tab-color.js";
import { WorkbookView } from "./generated/workbook-view.js";
import type { Workbook } from "./generated/workbook.js";
import type { Worksheet } from "./generated/worksheet.js";

// ─── Sheet 可见性 ─────────────────────────────────────────────────────────────

/** Sheet 可见性的三种状态（对应 OOXML `ST_SheetState`）。 */
export type SheetState = "visible" | "hidden" | "veryHidden";

/**
 * 设置 `<x:sheet>` 的可见状态。
 *
 * - "visible"    → 移除 state 属性（默认）
 * - "hidden"     → state="hidden"
 * - "veryHidden" → state="veryHidden"
 *
 * @param sheet  workbook.xml 中的 `<x:sheet>` 元素。
 * @param state  目标可见状态。
 */
export function setSheetState(sheet: Sheet, state: SheetState): void {
  if (state === "visible") {
    sheet.state = undefined;
  } else {
    sheet.state = StringValue.parse(state);
  }
}

/**
 * 读取 `<x:sheet>` 的当前可见状态。未设置 state 属性时返回 "visible"。
 *
 * @param sheet  workbook.xml 中的 `<x:sheet>` 元素。
 * @returns      当前可见状态，默认 "visible"。
 */
export function getSheetState(sheet: Sheet): SheetState {
  const raw = sheet.state?.toString();
  if (raw === "hidden") return "hidden";
  if (raw === "veryHidden") return "veryHidden";
  return "visible";
}

// ─── 活动工作表 ───────────────────────────────────────────────────────────────

/**
 * 设置工作簿当前激活的工作表索引（0-based）。
 *
 * 自动确保 `<x:bookViews>/<x:workbookView>` 存在；不存在时按需创建。
 *
 * @param workbook    workbook.xml 的 `<x:workbook>` 根元素。
 * @param sheetIndex  0-based 工作表索引。
 */
export function setActiveSheet(workbook: Workbook, sheetIndex: number): void {
  if (!Number.isInteger(sheetIndex) || sheetIndex < 0) {
    throw new RangeError(
      `setActiveSheet: sheetIndex must be a non-negative integer, got ${sheetIndex}`,
    );
  }
  const view = ensureWorkbookView(workbook);
  view.activeTab = UInt32Value.parse(String(sheetIndex));
}

/**
 * 读取工作簿当前激活工作表索引（0-based）。
 *
 * 若 `<x:bookViews>/<x:workbookView>` 不存在或 activeTab 未设置，返回 0。
 *
 * @param workbook  workbook.xml 的 `<x:workbook>` 根元素。
 * @returns         0-based 工作表索引，默认 0。
 */
export function getActiveSheet(workbook: Workbook): number {
  const bookViews = workbook.firstChild(BookViews);
  if (bookViews === undefined) return 0;
  const view = bookViews.firstChild(WorkbookView);
  if (view === undefined) return 0;
  const raw = view.activeTab?.toString();
  if (raw === undefined) return 0;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

// ─── Worksheet 标签颜色 ───────────────────────────────────────────────────────

/**
 * 设置 Worksheet 的标签颜色。
 *
 * 颜色格式为 8 位 ARGB 十六进制字符串（如 `"FFFF0000"` 为不透明红色）。
 * 仅含 6 位 RGB 时自动补全透明度前缀 `"FF"`。
 *
 * 自动创建链：若 `<x:sheetPr>` 或 `<x:tabColor>` 不存在，按需创建。
 * `<x:sheetPr>` 插入为 worksheet 的第一个子元素（OOXML schema 顺序）。
 *
 * @param worksheet  sheetN.xml 的 `<x:worksheet>` 根元素。
 * @param hex        8 位（或 6 位）ARGB/RGB 十六进制字符串，大小写均可。
 */
export function setWorksheetTabColor(worksheet: Worksheet, hex: string): void {
  const normalized = normalizeArgb(hex);
  const sheetPr = ensureSheetProperties(worksheet);
  let tabColor = sheetPr.firstChild(TabColor);
  if (tabColor === undefined) {
    tabColor = new TabColor();
    sheetPr.appendChild(tabColor);
  }
  // 清除其他颜色模式属性，只保留 rgb
  tabColor.auto = undefined;
  tabColor.indexed = undefined;
  tabColor.theme = undefined;
  tabColor.tint = undefined;
  tabColor.rgb = HexBinaryValue.parse(normalized);
}

/**
 * 读取 Worksheet 标签颜色的 ARGB 十六进制字符串。
 *
 * 仅返回 `rgb` 属性；theme/tint/indexed 等其它颜色模式返回 undefined。
 *
 * @param worksheet  sheetN.xml 的 `<x:worksheet>` 根元素。
 * @returns          8 位 ARGB 十六进制字符串（大写），或 undefined（无颜色）。
 */
export function getWorksheetTabColor(worksheet: Worksheet): string | undefined {
  const sheetPr = worksheet.firstChild(SheetProperties);
  if (sheetPr === undefined) return undefined;
  const tabColor = sheetPr.firstChild(TabColor);
  if (tabColor === undefined) return undefined;
  return tabColor.rgb?.toString();
}

/**
 * 清除 Worksheet 标签颜色。
 *
 * 移除 `<x:tabColor>` 元素；若 `<x:sheetPr>` 变为空且无其他属性，也一并移除。
 *
 * @param worksheet  sheetN.xml 的 `<x:worksheet>` 根元素。
 */
export function clearWorksheetTabColor(worksheet: Worksheet): void {
  const sheetPr = worksheet.firstChild(SheetProperties);
  if (sheetPr === undefined) return;
  const tabColor = sheetPr.firstChild(TabColor);
  if (tabColor !== undefined) {
    sheetPr.children.remove(tabColor);
  }
  // 若 sheetPr 无子元素且无显式属性，移除整个 sheetPr
  if (isSheetPropertiesEmpty(sheetPr)) {
    worksheet.children.remove(sheetPr);
  }
}

// ─── 内部工具 ─────────────────────────────────────────────────────────────────

/** 确保 workbook 下有 bookViews/workbookView，返回 workbookView。 */
function ensureWorkbookView(workbook: Workbook): WorkbookView {
  let bookViews = workbook.firstChild(BookViews);
  if (bookViews === undefined) {
    bookViews = new BookViews();
    const first = workbook.children.at(0);
    if (first === undefined) workbook.appendChild(bookViews);
    else workbook.children.insertBefore(bookViews, first);
  }
  let view = bookViews.firstChild(WorkbookView);
  if (view === undefined) {
    view = new WorkbookView();
    bookViews.appendChild(view);
  }
  return view;
}

/** 确保 worksheet 下有 sheetPr，作为第一个子元素，返回 SheetProperties。 */
function ensureSheetProperties(worksheet: Worksheet): SheetProperties {
  const existing = worksheet.firstChild(SheetProperties);
  if (existing !== undefined) return existing;
  const sheetPr = new SheetProperties();
  const first = worksheet.children.at(0);
  if (first === undefined) worksheet.appendChild(sheetPr);
  else worksheet.children.insertBefore(sheetPr, first);
  return sheetPr;
}

/** 规范化颜色为 8 位大写 ARGB 十六进制（6 位时补 "FF" 前缀）。 */
function normalizeArgb(hex: string): string {
  const upper = hex.toUpperCase().replace(/^#/, "");
  if (upper.length === 6) return `FF${upper}`;
  if (upper.length === 8) return upper;
  throw new RangeError(`setWorksheetTabColor: expected 6 or 8 hex characters, got "${hex}"`);
}

/** 判断 SheetProperties 是否为空（无子元素且无任何显式属性）。 */
function isSheetPropertiesEmpty(sheetPr: SheetProperties): boolean {
  // 若有子元素则不为空
  for (const _child of sheetPr.children) return false;
  // 检查所有可能的属性
  return (
    sheetPr.syncHorizontal === undefined &&
    sheetPr.syncVertical === undefined &&
    sheetPr.syncReference === undefined &&
    sheetPr.transitionEvaluation === undefined &&
    sheetPr.transitionEntry === undefined &&
    sheetPr.published === undefined &&
    sheetPr.codeName === undefined &&
    sheetPr.filterMode === undefined &&
    sheetPr.enableFormatConditionsCalculation === undefined
  );
}
