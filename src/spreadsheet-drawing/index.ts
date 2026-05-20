/**
 * `openxml-ts/spreadsheet-drawing` 公共 entry。
 *
 * 用法：
 * ```ts
 * import { WorksheetDrawing, TwoCellAnchor, OneCellAnchor } from "openxml-ts/spreadsheet-drawing";
 * import { registerSpreadsheetDrawingElements } from "openxml-ts/spreadsheet-drawing";
 * ```
 */

export * from "./generated/index.js";
export { registerSpreadsheetDrawingElements } from "./generated/_registry.js";
