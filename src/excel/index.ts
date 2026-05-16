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

// 门面 + typed Parts
export { SpreadsheetDocument } from "./spreadsheet-document.js";
export {
  CalculationChainPart,
  SharedStringTablePart,
  ThemePart,
  TypedXmlPart,
  WorkbookPart,
  WorkbookStylesPart,
  WorksheetPart,
} from "./parts/index.js";

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
