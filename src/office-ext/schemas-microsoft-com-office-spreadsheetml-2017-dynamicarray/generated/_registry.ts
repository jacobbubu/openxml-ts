// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_dynamicarray.json

import type { ElementRegistry } from "../../../element/index.js";
import { DynamicArrayProperties } from "./dynamic-array-properties.js";
import { ExtensionList } from "./extension-list.js";

/**
 * 把 spreadsheetml-2017-dynamicarray 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2017DynamicarrayElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray", "dynamicArrayProperties", DynamicArrayProperties);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/dynamicarray", "extLst", ExtensionList);
}
