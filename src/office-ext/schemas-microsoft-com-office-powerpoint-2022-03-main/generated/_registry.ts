// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_03_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { register202203MainChildMaps } from "./_child-map.js";
import { ExtensionList } from "./extension-list.js";
import { Reaction } from "./reaction.js";
import { ReactionInstance } from "./reaction-instance.js";
import { Reactions } from "./reactions.js";

/**
 * 把 2022-03-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register202203MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2022/03/main", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2022/03/main", "rxn", Reaction);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2022/03/main", "instance", ReactionInstance);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2022/03/main", "reactions", Reactions);
  register202203MainChildMaps(registry);
}
