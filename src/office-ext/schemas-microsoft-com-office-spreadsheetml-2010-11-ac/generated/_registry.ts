// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_ac.json

import type { ElementRegistry } from "../../../element/index.js";
import { register201011AcChildMaps } from "./_child-map.js";
import { AbsolutePath } from "./absolute-path.js";

/**
 * 把 2010-11-ac 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register201011AcElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac", "absPath", AbsolutePath);
  register201011AcChildMaps(registry);
}
