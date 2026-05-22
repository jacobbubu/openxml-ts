// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2021_extlinks2021.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2021Extlinks2021ChildMaps } from "./_child-map.js";
import { AbsoluteUrlAlternateUrl } from "./absolute-url-alternate-url.js";
import { ExternalBookAlternateUrls } from "./external-book-alternate-urls.js";
import { RelativeUrlAlternateUrl } from "./relative-url-alternate-url.js";

/**
 * 把 spreadsheetml-2021-extlinks2021 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2021Extlinks2021Elements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2021/extlinks2021", "absoluteUrl", AbsoluteUrlAlternateUrl);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2021/extlinks2021", "alternateUrls", ExternalBookAlternateUrls);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2021/extlinks2021", "relativeUrl", RelativeUrlAlternateUrl);
  registerSpreadsheetml2021Extlinks2021ChildMaps(registry);
}
