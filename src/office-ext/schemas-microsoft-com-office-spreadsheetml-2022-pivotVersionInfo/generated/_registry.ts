// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_pivotVersionInfo.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2022PivotVersionInfoChildMaps } from "./_child-map.js";
import { CacheVersionInfo } from "./cache-version-info.js";
import { LastRefreshFeatureXsdstring } from "./last-refresh-feature-xsdstring.js";
import { LastUpdateFeatureXsdstring } from "./last-update-feature-xsdstring.js";
import { PivotVersionInfo } from "./pivot-version-info.js";
import { RequiredFeatureXsdstring } from "./required-feature-xsdstring.js";

/**
 * 把 spreadsheetml-2022-pivotVersionInfo 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2022PivotVersionInfoElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo", "cacheVersionInfo", CacheVersionInfo);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo", "lastRefreshFeature", LastRefreshFeatureXsdstring);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo", "lastUpdateFeature", LastUpdateFeatureXsdstring);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo", "pivotVersionInfo", PivotVersionInfo);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2022/pivotVersionInfo", "requiredFeature", RequiredFeatureXsdstring);
  registerSpreadsheetml2022PivotVersionInfoChildMaps(registry);
}
