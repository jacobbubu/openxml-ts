// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_03_chart.json

import type { ElementRegistry } from "../../../element/index.js";
import { register201703ChartChildMaps } from "./_child-map.js";
import { BooleanFalse } from "./boolean-false.js";
import { DataDisplayOptions16 } from "./data-display-options16.js";

/**
 * 把 2017-03-chart 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register201703ChartElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2017/03/chart", "dispNaAsBlank", BooleanFalse);
  registry.register("http://schemas.microsoft.com/office/drawing/2017/03/chart", "dataDisplayOptions16", DataDisplayOptions16);
  register201703ChartChildMaps(registry);
}
