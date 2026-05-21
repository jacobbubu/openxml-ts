// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chart_ac.json

import type { ElementRegistry } from "../../../element/index.js";
import { MultiLvlStrData } from "./multi-lvl-str-data.js";

/**
 * 把 2014-chart-ac 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register2014ChartAcElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart/ac", "multiLvlStrLit", MultiLvlStrData);
}
