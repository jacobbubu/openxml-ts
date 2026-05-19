/**
 * Story-21：Word 表格 markup 助手。
 *
 * 与 Epic-17 PPT 表格对称——一行返完整 typed Table 树。Word 表格全套元素都
 * 有 codegen typed 类（Table / TableProperties / TableGrid / GridColumn /
 * TableRow / TableCell / TableCellProperties / TableCellWidth / TableBorders +
 * 6 个 side borders），全部走 typed，避免 OpenXmlUnknownElement。
 *
 * 单位约定：Word 列宽用 **dxa**（点的二十分之一）；1 inch = 1440 dxa。默认整表
 * 9000 dxa（≈ 6.25 inch），借鉴 Word 自身新表默认宽度。
 *
 * 单元格文本访问器（set/get）按 (row, col) 0-based 寻址，与 PPT 同语义。
 */

import { StringValue } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import { BottomBorder } from "./generated/bottom-border.js";
import { GridColumn } from "./generated/grid-column.js";
import { InsideHorizontalBorder } from "./generated/inside-horizontal-border.js";
import { InsideVerticalBorder } from "./generated/inside-vertical-border.js";
import { LeftBorder } from "./generated/left-border.js";
import { Paragraph } from "./generated/paragraph.js";
import { RightBorder } from "./generated/right-border.js";
import { Run } from "./generated/run.js";
import { TableBorders } from "./generated/table-borders.js";
import { TableCellProperties } from "./generated/table-cell-properties.js";
import { TableCellWidth } from "./generated/table-cell-width.js";
import { TableCell } from "./generated/table-cell.js";
import { TableGrid } from "./generated/table-grid.js";
import { TableProperties } from "./generated/table-properties.js";
import { TableRow } from "./generated/table-row.js";
import { TableWidth } from "./generated/table-width.js";
import { Table } from "./generated/table.js";
import { Text } from "./generated/text.js";
import { TopBorder } from "./generated/top-border.js";

const DEFAULT_TABLE_WIDTH_DXA = 9000;

export interface CreateDocumentTableOptions {
  /** 整表宽 dxa；默认 9000（≈ 6.25 inch）。仅在 \`columnWidthsDxa\` 省略时用以均分。 */
  readonly totalWidthDxa?: number;
  /** 每列宽 dxa；不传 → 均分 \`totalWidthDxa\`。长度必须等于 cols。 */
  readonly columnWidthsDxa?: readonly number[];
  /** 是否套用标准实线边框（top / bottom / left / right / inside H/V）；默认 true。 */
  readonly borders?: boolean;
}

/**
 * 构造 \`rows × cols\` 个空 cell 的 Word \`<w:tbl>\`。
 *
 * @throws OpenXmlPackageError 当 rows/cols ≤ 0 或 columnWidthsDxa.length != cols 时
 */
export function createDocumentTable(
  rows: number,
  cols: number,
  options: CreateDocumentTableOptions = {},
): Table {
  if (rows <= 0 || cols <= 0 || !Number.isInteger(rows) || !Number.isInteger(cols)) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createDocumentTable: rows/cols must be positive integers, got rows=${rows} cols=${cols}`,
    });
  }
  if (options.columnWidthsDxa !== undefined && options.columnWidthsDxa.length !== cols) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message: `createDocumentTable: columnWidthsDxa.length=${options.columnWidthsDxa.length} != cols=${cols}`,
    });
  }
  const totalWidth = options.totalWidthDxa ?? DEFAULT_TABLE_WIDTH_DXA;
  const columnWidths =
    options.columnWidthsDxa ?? Array.from({ length: cols }, () => Math.floor(totalWidth / cols));

  const table = new Table();

  // tblPr：整表宽 + 可选 borders
  const tblPr = new TableProperties();
  const tblW = new TableWidth();
  tblW.extendedAttributes.set("w:w", String(totalWidth));
  tblW.extendedAttributes.set("w:type", "dxa");
  tblPr.appendChild(tblW);
  if (options.borders !== false) tblPr.appendChild(buildStandardBorders());
  table.appendChild(tblPr);

  // tblGrid：每列宽
  const tblGrid = new TableGrid();
  for (const w of columnWidths) {
    const gridCol = new GridColumn();
    gridCol.width = StringValue.parse(String(w));
    tblGrid.appendChild(gridCol);
  }
  table.appendChild(tblGrid);

  // 行
  for (let r = 0; r < rows; r += 1) {
    const tr = new TableRow();
    for (let c = 0; c < cols; c += 1) {
      tr.appendChild(buildEmptyCell(columnWidths[c] ?? 0));
    }
    table.appendChild(tr);
  }
  return table;
}

function buildStandardBorders(): TableBorders {
  const borders = new TableBorders();
  for (const Side of [
    TopBorder,
    LeftBorder,
    BottomBorder,
    RightBorder,
    InsideHorizontalBorder,
    InsideVerticalBorder,
  ]) {
    const b = new Side();
    b.extendedAttributes.set("w:val", "single");
    b.extendedAttributes.set("w:sz", "4");
    b.extendedAttributes.set("w:space", "0");
    b.extendedAttributes.set("w:color", "auto");
    borders.appendChild(b);
  }
  return borders;
}

function buildEmptyCell(widthDxa: number): TableCell {
  const tc = new TableCell();
  const tcPr = new TableCellProperties();
  const tcW = new TableCellWidth();
  tcW.extendedAttributes.set("w:w", String(widthDxa));
  tcW.extendedAttributes.set("w:type", "dxa");
  tcPr.appendChild(tcW);
  tc.appendChild(tcPr);
  // Word schema 要求每个 cell 至少含一个 \`<w:p>\`（即便空）
  tc.appendChild(new Paragraph());
  return tc;
}

/**
 * 按 (row, col) 0-based 设置 cell 纯文本——替换 cell 内 \`<w:p>\` 为单段单 Run+\`<w:t>\`，
 * 保留 \`<w:tcPr>\`。
 *
 * @throws OpenXmlPackageError 当 row/col 越界（code="BACKEND_ERROR"）
 */
export function setDocumentTableCellText(
  table: Table,
  row: number,
  col: number,
  text: string,
): void {
  const tc = findCell(table, row, col);
  // 移除 cell 内所有 \`<w:p>\`（保留 \`<w:tcPr>\`）
  for (const child of tc.children.toArray()) {
    if (child instanceof Paragraph) tc.children.remove(child);
  }
  const p = new Paragraph();
  const r = new Run();
  const t = new Text();
  t.text = text;
  if (needsXmlSpacePreserve(text)) t.extendedAttributes.set("xml:space", "preserve");
  r.appendChild(t);
  p.appendChild(r);
  tc.appendChild(p);
}

/**
 * 读 cell 的纯文本——展平 cell 里所有 \`<w:t>\` 内容。
 *
 * @throws OpenXmlPackageError 当 row/col 越界
 */
export function getDocumentTableCellText(table: Table, row: number, col: number): string {
  const tc = findCell(table, row, col);
  let buf = "";
  for (const t of tc.descendants(Text)) {
    if (t.text !== undefined) buf += t.text;
  }
  return buf;
}

function findCell(table: Table, row: number, col: number): TableCell {
  let rowIdx = 0;
  for (const child of table.children) {
    if (!(child instanceof TableRow)) continue;
    if (rowIdx === row) {
      let colIdx = 0;
      for (const grand of child.children) {
        if (!(grand instanceof TableCell)) continue;
        if (colIdx === col) return grand;
        colIdx += 1;
      }
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `Word table: col ${col} out of range (row ${row} has ${colIdx} cells)`,
      });
    }
    rowIdx += 1;
  }
  throw new OpenXmlPackageError({
    code: "BACKEND_ERROR",
    message: `Word table: row ${row} out of range (table has ${rowIdx} rows)`,
  });
}

function needsXmlSpacePreserve(text: string): boolean {
  if (text.length === 0) return false;
  return text.startsWith(" ") || text.endsWith(" ") || /\s{2,}/.test(text);
}
