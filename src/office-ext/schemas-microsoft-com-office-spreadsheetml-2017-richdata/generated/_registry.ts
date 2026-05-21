// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata.json

import type { ElementRegistry } from "../../../element/index.js";
import { ExtensionList } from "./extension-list.js";
import { Key } from "./key.js";
import { RichValue } from "./rich-value.js";
import { RichValueBlock } from "./rich-value-block.js";
import { RichValueData } from "./rich-value-data.js";
import { RichValueFallback } from "./rich-value-fallback.js";
import { RichValueStructure } from "./rich-value-structure.js";
import { RichValueStructures } from "./rich-value-structures.js";
import { Value } from "./value.js";

/**
 * 把 spreadsheetml-2017-richdata 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetml2017RichdataElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "k", Key);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "rv", RichValue);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "rvb", RichValueBlock);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "rvData", RichValueData);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "fb", RichValueFallback);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "s", RichValueStructure);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "rvStructures", RichValueStructures);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2017/richdata", "v", Value);
}
