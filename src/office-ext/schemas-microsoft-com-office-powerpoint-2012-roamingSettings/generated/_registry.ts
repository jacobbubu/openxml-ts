// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_roamingSettings.json

import type { ElementRegistry } from "../../../element/index.js";
import { Key } from "./key.js";
import { RoamingProperty } from "./roaming-property.js";
import { Value } from "./value.js";

/**
 * 把 powerpoint-2012-roamingSettings 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerPowerpoint2012RoamingSettingsElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/roamingSettings", "key", Key);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/roamingSettings", "props", RoamingProperty);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/roamingSettings", "value", Value);
}
