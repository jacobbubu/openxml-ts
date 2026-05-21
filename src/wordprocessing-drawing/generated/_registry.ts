// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json

import type { ElementRegistry } from "../../element/index.js";
import { registerWordprocessingDrawingChildMaps } from "./_child-map.js";
import { Anchor } from "./anchor.js";
import { DocProperties } from "./doc-properties.js";
import { EffectExtent } from "./effect-extent.js";
import { Extent } from "./extent.js";
import { HorizontalPosition } from "./horizontal-position.js";
import { Inline } from "./inline.js";
import { LineTo } from "./line-to.js";
import { NonVisualGraphicFrameDrawingProperties } from "./non-visual-graphic-frame-drawing-properties.js";
import { PositionOffset } from "./position-offset.js";
import { SimplePosition } from "./simple-position.js";
import { StartPoint } from "./start-point.js";
import { VerticalAlignment } from "./vertical-alignment.js";
import { VerticalPosition } from "./vertical-position.js";
import { WrapNone } from "./wrap-none.js";
import { WrapPolygon } from "./wrap-polygon.js";
import { WrapSquare } from "./wrap-square.js";
import { WrapThrough } from "./wrap-through.js";
import { WrapTight } from "./wrap-tight.js";
import { WrapTopBottom } from "./wrap-top-bottom.js";

/**
 * 把 wordprocessingDrawing 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerWordprocessingDrawingElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "anchor", Anchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "docPr", DocProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "effectExtent", EffectExtent);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "extent", Extent);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "positionH", HorizontalPosition);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "inline", Inline);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "lineTo", LineTo);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "cNvGraphicFramePr", NonVisualGraphicFrameDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "posOffset", PositionOffset);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "simplePos", SimplePosition);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "start", StartPoint);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "align", VerticalAlignment);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "positionV", VerticalPosition);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapNone", WrapNone);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapPolygon", WrapPolygon);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapSquare", WrapSquare);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapThrough", WrapThrough);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapTight", WrapTight);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing", "wrapTopAndBottom", WrapTopBottom);
  registerWordprocessingDrawingChildMaps(registry);
}
