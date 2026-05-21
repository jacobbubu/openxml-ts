// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2021_scriptlink.json

import type { ElementRegistry } from "../../../element/index.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { ScriptLink } from "./script-link.js";

/**
 * 把 drawing-2021-scriptlink 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2021ScriptlinkElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2021/scriptlink", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/scriptlink", "scriptLink", ScriptLink);
}
