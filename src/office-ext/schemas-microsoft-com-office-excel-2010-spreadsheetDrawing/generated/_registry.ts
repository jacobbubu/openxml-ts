// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2010_spreadsheetDrawing.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerExcel2010SpreadsheetDrawingChildMaps } from "./_child-map.js";
import { ApplicationNonVisualDrawingProperties } from "./application-non-visual-drawing-properties.js";
import { ContentPart } from "./content-part.js";
import { ExcelNonVisualContentPartShapeProperties } from "./excel-non-visual-content-part-shape-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualInkContentPartProperties } from "./non-visual-ink-content-part-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Transform2D } from "./transform2-d.js";

/**
 * 把 excel-2010-spreadsheetDrawing 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerExcel2010SpreadsheetDrawingElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "nvPr", ApplicationNonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "contentPart", ContentPart);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "nvContentPartPr", ExcelNonVisualContentPartShapeProperties);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "cNvContentPartPr", NonVisualInkContentPartProperties);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing", "xfrm", Transform2D);
  registerExcel2010SpreadsheetDrawingChildMaps(registry);
}
