// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2016_pivotdefaultlayout.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2016PivotdefaultlayoutChildMaps } from "./_child-map.js";
import { PivotTableDefinition16 } from "./pivot-table-definition16.js";

/**
 * 把 spreadsheetml-2016-pivotdefaultlayout 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2016PivotdefaultlayoutElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2016/pivotdefaultlayout", "pivotTableDefinition16", PivotTableDefinition16);
  registerSpreadsheetml2016PivotdefaultlayoutChildMaps(registry);
}
