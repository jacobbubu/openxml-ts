// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_pivot2023Calculation.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2023Pivot2023CalculationChildMaps } from "./_child-map.js";
import { AggregationInfo } from "./aggregation-info.js";
import { FeatureSupport } from "./feature-support.js";
import { PivotAreaReferenceSubtotals } from "./pivot-area-reference-subtotals.js";
import { PivotFieldSubtotals } from "./pivot-field-subtotals.js";
import { PivotTableSubtotalLineItems } from "./pivot-table-subtotal-line-items.js";
import { SubtotalLineItemPivotItemSubtotal } from "./subtotal-line-item-pivot-item-subtotal.js";
import { SubtotalPivotItemSubtotal } from "./subtotal-pivot-item-subtotal.js";

/**
 * 把 spreadsheetml-2023-pivot2023Calculation 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2023Pivot2023CalculationElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "aggregationInfo", AggregationInfo);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "featureSupportInfo", FeatureSupport);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "pivotAreaReferenceSubtotals", PivotAreaReferenceSubtotals);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "pivotFieldSubtotals", PivotFieldSubtotals);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "pivotFieldSubtotalLineItems", PivotTableSubtotalLineItems);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "subtotalLineItem", SubtotalLineItemPivotItemSubtotal);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation", "subtotal", SubtotalPivotItemSubtotal);
  registerSpreadsheetml2023Pivot2023CalculationChildMaps(registry);
}
