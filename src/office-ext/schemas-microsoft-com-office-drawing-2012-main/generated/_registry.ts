// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerDrawing2012MainChildMaps } from "./_child-map.js";
import { BackgroundProperties } from "./background-properties.js";
import { NonVisualGroupProperties } from "./non-visual-group-properties.js";
import { ObjectProperties } from "./object-properties.js";
import { SignatureLine } from "./signature-line.js";

/**
 * 把 drawing-2012-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerDrawing2012MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2012/main", "backgroundPr", BackgroundProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/main", "nonVisualGroupProps", NonVisualGroupProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/main", "objectPr", ObjectProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/main", "signatureLine", SignatureLine);
  registerDrawing2012MainChildMaps(registry);
}
