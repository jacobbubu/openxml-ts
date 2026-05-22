// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_sketchyshapes.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerDrawing2018SketchyshapesChildMaps } from "./_child-map.js";
import { LineSketchCurvedEmpty } from "./line-sketch-curved-empty.js";
import { LineSketchFreehandEmpty } from "./line-sketch-freehand-empty.js";
import { LineSketchNoneEmpty } from "./line-sketch-none-empty.js";
import { LineSketchScribbleEmpty } from "./line-sketch-scribble-empty.js";
import { LineSketchSeed } from "./line-sketch-seed.js";
import { LineSketchStyleProperties } from "./line-sketch-style-properties.js";
import { LineSketchTypeProperties } from "./line-sketch-type-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";

/**
 * 把 drawing-2018-sketchyshapes 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerDrawing2018SketchyshapesElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "lineSketchCurved", LineSketchCurvedEmpty);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "lineSketchFreehand", LineSketchFreehandEmpty);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "lineSketchNone", LineSketchNoneEmpty);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "lineSketchScribble", LineSketchScribbleEmpty);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "seed", LineSketchSeed);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "lineSketchStyleProps", LineSketchStyleProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "type", LineSketchTypeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/sketchyshapes", "extLst", OfficeArtExtensionList);
  registerDrawing2018SketchyshapesChildMaps(registry);
}
