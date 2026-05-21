// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_calcfeatures.json

import type { ElementRegistry } from "../../../element/index.js";
import { CalcFeature } from "./calc-feature.js";
import { CalcFeatures } from "./calc-features.js";

/**
 * 把 spreadsheetml-2018-calcfeatures 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2018CalcfeaturesElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/calcfeatures", "feature", CalcFeature);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/calcfeatures", "calcFeatures", CalcFeatures);
}
