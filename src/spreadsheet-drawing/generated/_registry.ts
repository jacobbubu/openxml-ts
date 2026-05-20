// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json

import type { ElementRegistry } from "../../element/index.js";
import { AbsoluteAnchor } from "./absolute-anchor.js";
import { BlipFill } from "./blip-fill.js";
import { ClientData } from "./client-data.js";
import { ColumnId } from "./column-id.js";
import { ColumnOffset } from "./column-offset.js";
import { ConnectionShape } from "./connection-shape.js";
import { ContentPart } from "./content-part.js";
import { Extent } from "./extent.js";
import { FromMarker } from "./from-marker.js";
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
import { OneCellAnchor } from "./one-cell-anchor.js";
import { Picture } from "./picture.js";
import { Position } from "./position.js";
import { RowId } from "./row-id.js";
import { RowOffset } from "./row-offset.js";
import { Shape } from "./shape.js";
import { ShapeProperties } from "./shape-properties.js";
import { ShapeStyle } from "./shape-style.js";
import { TextBody } from "./text-body.js";
import { ToMarker } from "./to-marker.js";
import { Transform } from "./transform.js";
import { TwoCellAnchor } from "./two-cell-anchor.js";
import { WorksheetDrawing } from "./worksheet-drawing.js";

/**
 * 把 spreadsheetDrawing 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerSpreadsheetDrawingElements(registry: ElementRegistry): void {
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "absoluteAnchor", AbsoluteAnchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "blipFill", BlipFill);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "clientData", ClientData);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "col", ColumnId);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "colOff", ColumnOffset);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cxnSp", ConnectionShape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "contentPart", ContentPart);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "ext", Extent);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "from", FromMarker);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "graphicFrame", GraphicFrame);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "grpSp", GroupShape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "grpSpPr", GroupShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "nvCxnSpPr", NonVisualConnectionShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvCxnSpPr", NonVisualConnectorShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvGraphicFramePr", NonVisualGraphicFrameDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "nvGraphicFramePr", NonVisualGraphicFrameProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvGrpSpPr", NonVisualGroupShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "nvGrpSpPr", NonVisualGroupShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvPicPr", NonVisualPictureDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "nvPicPr", NonVisualPictureProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "cNvSpPr", NonVisualShapeDrawingProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "nvSpPr", NonVisualShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "oneCellAnchor", OneCellAnchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "pic", Picture);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "pos", Position);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "row", RowId);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "rowOff", RowOffset);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "sp", Shape);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "spPr", ShapeProperties);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "style", ShapeStyle);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "txBody", TextBody);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "to", ToMarker);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "xfrm", Transform);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "twoCellAnchor", TwoCellAnchor);
  registry.register("http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing", "wsDr", WorksheetDrawing);
}
