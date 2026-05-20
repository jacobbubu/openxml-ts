// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chartDrawing.json

import type { ElementRegistry } from "../../element/index.js";
import { AbsoluteAnchorSize } from "./absolute-anchor-size.js";
import { BlipFill } from "./blip-fill.js";
import { ConnectionShape } from "./connection-shape.js";
import { Extent } from "./extent.js";
import { FromAnchor } from "./from-anchor.js";
import { GraphicFrame } from "./graphic-frame.js";
import { GroupShape } from "./group-shape.js";
import { GroupShapeProperties } from "./group-shape-properties.js";
import { NonVisualConnectionShapeProperties } from "./non-visual-connection-shape-properties.js";
import { NonVisualConnectorShapeDrawingProperties } from "./non-visual-connector-shape-drawing-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualGraphicFrameDrawingProperties } from "./non-visual-graphic-frame-drawing-properties.js";
import { NonVisualGraphicFrameProperties } from "./non-visual-graphic-frame-properties.js";
import { NonVisualGroupShapeDrawingProperties } from "./non-visual-group-shape-drawing-properties.js";
import { NonVisualGroupShapeProperties } from "./non-visual-group-shape-properties.js";
import { NonVisualPictureDrawingProperties } from "./non-visual-picture-drawing-properties.js";
import { NonVisualPictureProperties } from "./non-visual-picture-properties.js";
import { NonVisualShapeDrawingProperties } from "./non-visual-shape-drawing-properties.js";
import { NonVisualShapeProperties } from "./non-visual-shape-properties.js";
import { Picture } from "./picture.js";
import { RelativeAnchorSize } from "./relative-anchor-size.js";
import { Shape } from "./shape.js";
import { ShapeProperties } from "./shape-properties.js";
import { Style } from "./style.js";
import { TextBody } from "./text-body.js";
import { ToAnchor } from "./to-anchor.js";
import { Transform } from "./transform.js";
import { XPosition } from "./x-position.js";
import { YPosition } from "./y-position.js";

/**
 * 把 chartDrawing 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerChartDrawingElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "absSizeAnchor", AbsoluteAnchorSize);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "blipFill", BlipFill);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cxnSp", ConnectionShape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "ext", Extent);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "from", FromAnchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "graphicFrame", GraphicFrame);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "grpSp", GroupShape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "grpSpPr", GroupShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvCxnSpPr", NonVisualConnectionShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "nvCxnSpPr", NonVisualConnectorShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvGraphicFramePr", NonVisualGraphicFrameDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "nvGraphicFramePr", NonVisualGraphicFrameProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvGrpSpPr", NonVisualGroupShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "nvGrpSpPr", NonVisualGroupShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvPicPr", NonVisualPictureDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "nvPicPr", NonVisualPictureProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "cNvSpPr", NonVisualShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "nvSpPr", NonVisualShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "pic", Picture);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "relSizeAnchor", RelativeAnchorSize);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "sp", Shape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "spPr", ShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "style", Style);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "txBody", TextBody);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "to", ToAnchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "xfrm", Transform);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "x", XPosition);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/chartDrawing", "y", YPosition);
}
