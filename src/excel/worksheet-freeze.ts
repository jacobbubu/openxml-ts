// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-32：Excel 冻结窗格便捷层。
 *
 * 给 \`<x:worksheet>\` 设置冻结行 / 冻结列：在 \`<x:sheetViews>/<x:sheetView>\` 下
 * 挂 \`<x:pane state="frozen">\` + 一条 \`<x:selection>\`。
 *
 * 公开 API：
 *   setFreezePanes(worksheet, { rows: 1 })            // 冻结首行
 *   setFreezePanes(worksheet, { columns: 1 })          // 冻结首列
 *   setFreezePanes(worksheet, { rows: 2, columns: 3 }) // 冻结前 2 行 + 前 3 列
 *   setFreezePanes(worksheet, undefined)               // 解除冻结
 *
 * 不在范围：拆分窗格 (\`<x:pane state="split">\`)、多 selection、视图缩放等。
 */

import { StringValue, UInt32Value } from "../element/index.js";
import { Pane } from "./generated/pane.js";
import { Selection } from "./generated/selection.js";
import { SheetView } from "./generated/sheet-view.js";
import { SheetViews } from "./generated/sheet-views.js";
import type { Worksheet } from "./generated/worksheet.js";

export interface FreezePanesOptions {
  /** 冻结的行数（顶部）。0 / undefined 表示不冻结行。 */
  readonly rows?: number;
  /** 冻结的列数（左侧）。0 / undefined 表示不冻结列。 */
  readonly columns?: number;
  /**
   * 滚动区域的左上角格（如 "C2"）。未传时根据 rows / columns 自动计算。
   * 注意：这是冻结边界右下方的第一个可滚动格。
   */
  readonly topLeftCell?: string;
}

const A_CODE = "A".charCodeAt(0);

/**
 * 列序号（0-based）→ 字母列名（"A", "B", ..., "Z", "AA", "AB", ...）。
 * 给 setFreezePanes 用：把 columns=2 翻译成 topLeftCell 字母段 "C"。
 */
function columnIndexToName(zeroBased: number): string {
  let n = zeroBased;
  let out = "";
  do {
    out = String.fromCharCode(A_CODE + (n % 26)) + out;
    n = Math.floor(n / 26) - 1;
  } while (n >= 0);
  return out;
}

function computeTopLeftCell(rows: number, columns: number): string {
  return `${columnIndexToName(columns)}${rows + 1}`;
}

function computeActivePane(rows: number, columns: number): string {
  if (rows > 0 && columns > 0) return "bottomRight";
  if (rows > 0) return "bottomLeft";
  return "topRight";
}

/**
 * 给 worksheet 设置冻结窗格。
 *
 * @param worksheet 目标 \`<x:worksheet>\` 节点。
 * @param options   冻结配置；undefined 表示移除现有冻结。
 *
 * 行为：
 * - 自动确保 sheetViews / sheetView 存在（sheetViews 必须放在 worksheet 第一组），
 *   不存在时按 OOXML 顺序插入。
 * - 移除现有的 \`<x:pane>\` 与冻结相关的 \`<x:selection>\`（pane 属性匹配 frozen 那条）；
 *   其它 selection 保留。
 * - options=undefined 或者 rows=columns=0 时仅做清理。
 */
export function setFreezePanes(
  worksheet: Worksheet,
  options: FreezePanesOptions | undefined,
): void {
  const rows = options?.rows ?? 0;
  const columns = options?.columns ?? 0;

  const sheetView = ensureSheetView(
    worksheet,
    options === undefined || (rows === 0 && columns === 0),
  );
  if (sheetView === undefined) return;

  removeExistingFreezeElements(sheetView);

  if (options === undefined || (rows === 0 && columns === 0)) return;

  const topLeftCell = options.topLeftCell ?? computeTopLeftCell(rows, columns);
  const activePane = computeActivePane(rows, columns);

  const pane = new Pane();
  if (columns > 0) pane.horizontalSplit = StringValue.parse(String(columns));
  if (rows > 0) pane.verticalSplit = StringValue.parse(String(rows));
  pane.topLeftCell = StringValue.parse(topLeftCell);
  pane.activePane = StringValue.parse(activePane);
  pane.state = StringValue.parse("frozen");

  const selection = new Selection();
  selection.pane = StringValue.parse(activePane);
  selection.activeCell = StringValue.parse(topLeftCell);
  selection.sequenceOfReferences = StringValue.parse(topLeftCell);

  sheetView.appendChild(pane);
  sheetView.appendChild(selection);
}

/**
 * 读取 worksheet 当前的冻结配置。无冻结返 undefined。
 */
export function getFreezePanes(worksheet: Worksheet): FreezePanesOptions | undefined {
  const sheetView = worksheet.firstChild(SheetViews)?.firstChild(SheetView);
  const pane = sheetView?.firstChild(Pane);
  if (pane === undefined) return undefined;
  if (pane.state?.toString() !== "frozen") return undefined;
  const rows = parseIntOrZero(pane.verticalSplit?.toString());
  const columns = parseIntOrZero(pane.horizontalSplit?.toString());
  const topLeftCell = pane.topLeftCell?.toString();
  const out: { -readonly [K in keyof FreezePanesOptions]: FreezePanesOptions[K] } = {};
  if (rows > 0) out.rows = rows;
  if (columns > 0) out.columns = columns;
  if (topLeftCell !== undefined) out.topLeftCell = topLeftCell;
  return Object.keys(out).length === 0 ? undefined : out;
}

function parseIntOrZero(s: string | undefined): number {
  if (s === undefined) return 0;
  const n = Number.parseInt(s, 10);
  return Number.isFinite(n) ? n : 0;
}

function ensureSheetView(worksheet: Worksheet, readOnly: boolean): SheetView | undefined {
  let views = worksheet.firstChild(SheetViews);
  if (views === undefined) {
    if (readOnly) return undefined;
    views = new SheetViews();
    // sheetViews 在 worksheet 里必须靠前（schema 顺序），用 insertBefore 放第一个子。
    const first = worksheet.children.at(0);
    if (first === undefined) worksheet.appendChild(views);
    else worksheet.children.insertBefore(views, first);
  }
  let view = views.firstChild(SheetView);
  if (view === undefined) {
    if (readOnly) return undefined;
    view = new SheetView();
    // workbookViewId は CT_SheetView の必須属性（schema 要求）。
    view.workbookViewId = new UInt32Value(0);
    views.appendChild(view);
  }
  return view;
}

function removeExistingFreezeElements(sheetView: SheetView): void {
  const existingPane = sheetView.firstChild(Pane);
  if (existingPane !== undefined) sheetView.children.remove(existingPane);
  // 移除带 pane 属性的 selection（属于冻结布局）；保留无 pane 的「默认 selection」。
  const selections: Selection[] = [];
  for (const c of sheetView.children) {
    if (c instanceof Selection && c.pane !== undefined) selections.push(c);
  }
  for (const sel of selections) sheetView.children.remove(sel);
}
