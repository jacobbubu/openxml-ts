// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2008_diagram.json

import type { ElementRegistry } from "../../../element/index.js";
import { DataModelExtensionBlock } from "./data-model-extension-block.js";
import { Drawing } from "./drawing.js";
import { GroupShape } from "./group-shape.js";
import { GroupShapeNonVisualProperties } from "./group-shape-non-visual-properties.js";
import { GroupShapeProperties } from "./group-shape-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualDrawingShapeProperties } from "./non-visual-drawing-shape-properties.js";
import { NonVisualGroupDrawingShapeProperties } from "./non-visual-group-drawing-shape-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Shape } from "./shape.js";
import { ShapeNonVisualProperties } from "./shape-non-visual-properties.js";
import { ShapeProperties } from "./shape-properties.js";
import { ShapeStyle } from "./shape-style.js";
import { ShapeTree } from "./shape-tree.js";
import { TextBody } from "./text-body.js";
import { Transform2D } from "./transform2-d.js";

/**
 * 把 drawing-2008-diagram 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2008DiagramElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "dataModelExt", DataModelExtensionBlock);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "drawing", Drawing);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "grpSp", GroupShape);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "nvGrpSpPr", GroupShapeNonVisualProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "grpSpPr", GroupShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "cNvSpPr", NonVisualDrawingShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "cNvGrpSpPr", NonVisualGroupDrawingShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "sp", Shape);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "nvSpPr", ShapeNonVisualProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "style", ShapeStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "spTree", ShapeTree);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "txBody", TextBody);
  registry.register("http://schemas.microsoft.com/office/drawing/2008/diagram", "txXfrm", Transform2D);
}
