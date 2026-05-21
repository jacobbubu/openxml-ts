// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2007_8_2_chart.json

import type { ElementRegistry } from "../../../element/index.js";
import { DropZoneCategories } from "./drop-zone-categories.js";
import { DropZoneData } from "./drop-zone-data.js";
import { DropZoneFilter } from "./drop-zone-filter.js";
import { DropZoneSeries } from "./drop-zone-series.js";
import { DropZonesVisible } from "./drop-zones-visible.js";
import { InSketchMode } from "./in-sketch-mode.js";
import { InvertSolidFillFormat } from "./invert-solid-fill-format.js";
import { PivotOptions } from "./pivot-options.js";
import { ShapeProperties } from "./shape-properties.js";
import { ShowSketchButton } from "./show-sketch-button.js";
import { SketchOptions } from "./sketch-options.js";
import { Style } from "./style.js";

/**
 * 把 8-2-chart 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register82ChartElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "dropZoneCategories", DropZoneCategories);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "dropZoneData", DropZoneData);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "dropZoneFilter", DropZoneFilter);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "dropZoneSeries", DropZoneSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "dropZonesVisible", DropZonesVisible);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "inSketchMode", InSketchMode);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "invertSolidFillFmt", InvertSolidFillFormat);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "pivotOptions", PivotOptions);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "showSketchBtn", ShowSketchButton);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "sketchOptions", SketchOptions);
  registry.register("http://schemas.microsoft.com/office/drawing/2007/8/2/chart", "style", Style);
}
