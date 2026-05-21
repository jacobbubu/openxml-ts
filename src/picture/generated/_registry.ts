// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_picture.json

import type { ElementRegistry } from "../../element/index.js";
import { registerPictureChildMaps } from "./_child-map.js";
import { BlipFill } from "./blip-fill.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualPictureDrawingProperties } from "./non-visual-picture-drawing-properties.js";
import { NonVisualPictureProperties } from "./non-visual-picture-properties.js";
import { Picture } from "./picture.js";
import { ShapeProperties } from "./shape-properties.js";

/**
 * 把 picture 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerPictureElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "blipFill", BlipFill);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "cNvPicPr", NonVisualPictureDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "nvPicPr", NonVisualPictureProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "pic", Picture);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/picture", "spPr", ShapeProperties);
  registerPictureChildMaps(registry);
}
