// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2006_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { ColumnSortMap } from "./column-sort-map.js";
import { ColumnSortMapItem } from "./column-sort-map-item.js";
import { Formula } from "./formula.js";
import { Macrosheet } from "./macrosheet.js";
import { ReferenceSequence } from "./reference-sequence.js";
import { RowSortMap } from "./row-sort-map.js";
import { RowSortMapItem } from "./row-sort-map-item.js";
import { WorksheetSortMap } from "./worksheet-sort-map.js";

/**
 * 把 excel-2006-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerExcel2006MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "colSortMap", ColumnSortMap);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "col", ColumnSortMapItem);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "f", Formula);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "macrosheet", Macrosheet);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "sqref", ReferenceSequence);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "rowSortMap", RowSortMap);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "row", RowSortMapItem);
  registry.register("http://schemas.microsoft.com/office/excel/2006/main", "worksheetSortMap", WorksheetSortMap);
}
