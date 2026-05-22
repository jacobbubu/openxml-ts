// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2020_02_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { register202002MainChildMaps } from "./_child-map.js";
import { DesignerDrawingProps } from "./designer-drawing-props.js";
import { DesignerTag } from "./designer-tag.js";
import { DesignerTagList } from "./designer-tag-list.js";
import { ExtensionList } from "./extension-list.js";

/**
 * 把 2020-02-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register202002MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2020/02/main", "designPr", DesignerDrawingProps);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2020/02/main", "designTag", DesignerTag);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2020/02/main", "designTagLst", DesignerTagList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2020/02/main", "extLst", ExtensionList);
  register202002MainChildMaps(registry);
}
