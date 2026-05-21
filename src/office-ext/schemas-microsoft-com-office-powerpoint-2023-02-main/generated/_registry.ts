// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2023_02_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { CameoEmpty } from "./cameo-empty.js";
import { PlaceholderTypeACB } from "./placeholder-type-acb.js";
import { PlaceholderTypeExtension } from "./placeholder-type-extension.js";
import { UnknownEmpty } from "./unknown-empty.js";

/**
 * 把 2023-02-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register202302MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2023/02/main", "cameo", CameoEmpty);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2023/02/main", "type", PlaceholderTypeACB);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2023/02/main", "phTypeExt", PlaceholderTypeExtension);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2023/02/main", "unknown", UnknownEmpty);
}
