// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_namedsheetviews.json

import type { ElementRegistry } from "../../../element/index.js";
import { ColumnFilter } from "./column-filter.js";
import { DifferentialFormatType } from "./differential-format-type.js";
import { ExtensionList } from "./extension-list.js";
import { FilterColumn } from "./filter-column.js";
import { NamedSheetView } from "./named-sheet-view.js";
import { NamedSheetViews } from "./named-sheet-views.js";
import { NsvFilter } from "./nsv-filter.js";
import { RichSortCondition } from "./rich-sort-condition.js";
import { SortCondition } from "./sort-condition.js";
import { SortRule } from "./sort-rule.js";
import { SortRules } from "./sort-rules.js";

/**
 * 把 spreadsheetml-2019-namedsheetviews 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2019NamedsheetviewsElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "columnFilter", ColumnFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "dxf", DifferentialFormatType);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "filter", FilterColumn);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "namedSheetView", NamedSheetView);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "namedSheetViews", NamedSheetViews);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "nsvFilter", NsvFilter);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "richSortCondition", RichSortCondition);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "sortCondition", SortCondition);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "sortRule", SortRule);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews", "sortRules", SortRules);
}
