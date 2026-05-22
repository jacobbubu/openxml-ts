// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_11_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { register201411MainChildMaps } from "./_child-map.js";
import { CalculatedTimeColumn } from "./calculated-time-column.js";
import { ModelTimeGrouping } from "./model-time-grouping.js";
import { ModelTimeGroupings } from "./model-time-groupings.js";

/**
 * 把 2014-11-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register201411MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/11/main", "calculatedTimeColumn", CalculatedTimeColumn);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/11/main", "modelTimeGrouping", ModelTimeGrouping);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2014/11/main", "modelTimeGroupings", ModelTimeGroupings);
  register201411MainChildMaps(registry);
}
