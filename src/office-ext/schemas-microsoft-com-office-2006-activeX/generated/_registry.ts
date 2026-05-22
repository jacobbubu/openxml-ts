// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_activeX.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2006ActiveXChildMaps } from "./_child-map.js";
import { ActiveXControlData } from "./active-x-control-data.js";
import { ActiveXObjectProperty } from "./active-x-object-property.js";
import { SharedComFont } from "./shared-com-font.js";
import { SharedComPicture } from "./shared-com-picture.js";

/**
 * 把 2006-activeX 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2006ActiveXElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/2006/activeX", "ocx", ActiveXControlData);
  registry.register("http://schemas.microsoft.com/office/2006/activeX", "ocxPr", ActiveXObjectProperty);
  registry.register("http://schemas.microsoft.com/office/2006/activeX", "font", SharedComFont);
  registry.register("http://schemas.microsoft.com/office/2006/activeX", "picture", SharedComPicture);
  register2006ActiveXChildMaps(registry);
}
