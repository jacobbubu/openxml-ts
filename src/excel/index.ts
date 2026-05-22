/**
 * `openxml-ts/excel` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { SpreadsheetDocument, Cell, Row, Worksheet } from "openxml-ts/excel";
 *
 * await using doc = await SpreadsheetDocument.openAsync("./report.xlsx");
 * const sheet = doc.workbookPart!.worksheetParts[0]!.worksheet;
 * for (const c of sheet.descendants(Cell)) console.log(c.resolvedText);
 * ```
 *
 * 子 entry + size-limit 守护在 Story-3.8 落地；本文件 Story-3.5 先建出口。
 *
 * 副作用：模块在加载时通过 `extensions/cell-extensions.js` 给 `Cell.prototype`
 * 挂上 `resolvedText` getter（Object.defineProperty）。tree-shaker 不会
 * 摇掉这次副作用（package.json `sideEffects: false` 不影响——具体由本
 * 模块的导入图保证）。
 */

// 必要副作用：挂上 Cell.resolvedText getter
import "./extensions/cell-extensions.js";
// 必要副作用：挂上 Cell.value typed 访问器（Epic-45）
import "./extensions/cell-value-accessor.js";
// 必要副作用：挂上 Cell.formula / Cell.cachedValue 访问器（Epic-49）
import "./extensions/cell-formula-accessor.js";

// 门面 + typed Parts
export { SpreadsheetDocument, SpreadsheetDocumentType } from "./spreadsheet-document.js";
export {
  CalculationChainPart,
  ChartPart,
  DrawingPart,
  SharedStringTablePart,
  ThemePart,
  TypedXmlPart,
  WorkbookPart,
  WorkbookStylesPart,
  WorksheetPart,
} from "./parts/index.js";

export { BinaryPart } from "../parts/binary-part.js";
export { CoreProperties } from "../parts/core-properties.js";
export { CorePropertiesPart } from "../parts/core-properties-part.js";
export { ExtendedFilePropertiesPart } from "../parts/extended-file-properties-part.js";
export { CustomFilePropertiesPart } from "../parts/custom-file-properties-part.js";
export { CustomXmlPart } from "../parts/custom-xml-part.js";
export { CustomXmlPropertiesPart } from "../parts/custom-xml-properties-part.js";
export {
  type AddImagePartOptions,
  ImagePart,
  extensionForMime,
  mimeForExtension,
  sniffImageMime,
} from "../parts/image-part.js";

export {
  type CellAnchorPoint,
  type CreateTwoCellAnchorOptions,
  createImageTwoCellAnchorForExcel,
} from "./image-markup.js";

// SST resolver helper
export {
  SharedStringResolver,
  registerSharedStringResolver,
  getResolverForWorksheet,
} from "./shared-string-table.js";

// 常用 element 类（其它从 ./generated/index.js 深 import）
export { Cell } from "./generated/cell.js";
export { CellFormula } from "./generated/cell-formula.js";
export { CellValue } from "./generated/cell-value.js";
export { InlineString } from "./generated/inline-string.js";
export { Row } from "./generated/row.js";
export { SharedStringItem } from "./generated/shared-string-item.js";
export { SharedStringTable } from "./generated/shared-string-table.js";
export { Sheet } from "./generated/sheet.js";
export { SheetData } from "./generated/sheet-data.js";
export { Sheets } from "./generated/sheets.js";
export { Stylesheet } from "./generated/stylesheet.js";
export { Text } from "./generated/text.js";
export { Workbook } from "./generated/workbook.js";
export { Worksheet } from "./generated/worksheet.js";

// ─── Excel 冻结窗格（Epic-32） ───────────────────────────────────────────────
export { Pane } from "./generated/pane.js";
export { Selection } from "./generated/selection.js";
export { SheetView } from "./generated/sheet-view.js";
export { SheetViews } from "./generated/sheet-views.js";
export {
  type FreezePanesOptions,
  setFreezePanes,
  getFreezePanes,
} from "./worksheet-freeze.js";

// ─── Excel 列宽 / 行高（Epic-33） ────────────────────────────────────────────
export { Column } from "./generated/column.js";
export { Columns } from "./generated/columns.js";
export {
  type ColumnWidthRange,
  setColumnWidth,
  getColumnWidth,
  setRowHeight,
  getRowHeight,
} from "./worksheet-dimensions.js";

// ─── Excel 数字格式（Epic-44） ────────────────────────────────────────────────
export { CellFormat } from "./generated/cell-format.js";
export { CellFormats } from "./generated/cell-formats.js";
export { BuiltInNumberFormat, setBuiltInNumberFormat } from "./number-format.js";

// ─── Excel 合并单元格（Epic-53） ──────────────────────────────────────────────
export { MergeCell } from "./generated/merge-cell.js";
export { MergeCells } from "./generated/merge-cells.js";
export {
  mergeCells,
  unmergeCells,
  clearAllMergedCells,
  getMergedRanges,
} from "./merge-cells.js";

// ─── Excel 数据验证（Epic-58） ────────────────────────────────────────────────
export { DataValidation } from "./generated/data-validation.js";
export { DataValidations } from "./generated/data-validations.js";
export { Formula1 } from "./generated/formula1.js";
export { Formula2 } from "./generated/formula2.js";
export {
  type ListValidationOptions,
  type RangeValidationOptions,
  type RangeValidationType,
  type RangeValidationOperator,
  type CellValidationInfo,
  addCellListValidation,
  addCellRangeValidation,
  clearCellValidations,
  getCellValidations,
} from "./data-validations.js";

// ─── Excel Sheet 视觉元数据（Epic-62） ───────────────────────────────────────
export { BookViews } from "./generated/book-views.js";
export { SheetProperties } from "./generated/sheet-properties.js";
export { TabColor } from "./generated/tab-color.js";
export { WorkbookView } from "./generated/workbook-view.js";
export {
  type SheetState,
  setSheetState,
  getSheetState,
  setActiveSheet,
  getActiveSheet,
  setWorksheetTabColor,
  getWorksheetTabColor,
  clearWorksheetTabColor,
} from "./sheet-metadata.js";
