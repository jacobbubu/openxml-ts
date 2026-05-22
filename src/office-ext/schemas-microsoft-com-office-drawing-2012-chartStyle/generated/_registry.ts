// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerDrawing2012ChartStyleChildMaps } from "./_child-map.js";
import { AxisTitle } from "./axis-title.js";
import { CategoryAxisProperties } from "./category-axis-properties.js";
import { ChartArea } from "./chart-area.js";
import { ChartStyle } from "./chart-style.js";
import { ColorStyle } from "./color-style.js";
import { ColorStyleVariation } from "./color-style-variation.js";
import { DataLabel } from "./data-label.js";
import { DataLabelCallout } from "./data-label-callout.js";
import { DataLabels } from "./data-labels.js";
import { DataPoint } from "./data-point.js";
import { DataPoint3D } from "./data-point3-d.js";
import { DataPointLine } from "./data-point-line.js";
import { DataPointMarker } from "./data-point-marker.js";
import { DataPointWireframe } from "./data-point-wireframe.js";
import { DataSeries } from "./data-series.js";
import { DataTableStyle } from "./data-table-style.js";
import { DownBar } from "./down-bar.js";
import { DropLine } from "./drop-line.js";
import { EffectReference } from "./effect-reference.js";
import { ErrorBar } from "./error-bar.js";
import { FillReference } from "./fill-reference.js";
import { Floor } from "./floor.js";
import { FontReference } from "./font-reference.js";
import { GridlineMajor } from "./gridline-major.js";
import { GridlineMinor } from "./gridline-minor.js";
import { HiLoLine } from "./hi-lo-line.js";
import { LeaderLine } from "./leader-line.js";
import { LegendStyle } from "./legend-style.js";
import { LineReference } from "./line-reference.js";
import { LineWidthScale } from "./line-width-scale.js";
import { MarkerLayoutProperties } from "./marker-layout-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { PlotArea } from "./plot-area.js";
import { PlotArea3D } from "./plot-area3-d.js";
import { SeriesAxisProperties } from "./series-axis-properties.js";
import { SeriesLine } from "./series-line.js";
import { ShapeProperties } from "./shape-properties.js";
import { StyleColor } from "./style-color.js";
import { TextBodyProperties } from "./text-body-properties.js";
import { TextCharacterPropertiesType } from "./text-character-properties-type.js";
import { TitleStyle } from "./title-style.js";
import { TrendlineLabel } from "./trendline-label.js";
import { TrendlineStyle } from "./trendline-style.js";
import { UpBar } from "./up-bar.js";
import { ValueAxisProperties } from "./value-axis-properties.js";
import { View3DProperties } from "./view3-d-properties.js";
import { Wall } from "./wall.js";

/**
 * 把 drawing-2012-chartStyle 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerDrawing2012ChartStyleElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "axisTitle", AxisTitle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "categoryAxis", CategoryAxisProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "chartArea", ChartArea);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "chartStyle", ChartStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "colorStyle", ColorStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "variation", ColorStyleVariation);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataLabel", DataLabel);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataLabelCallout", DataLabelCallout);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataLabels", DataLabels);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPoint", DataPoint);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPoint3D", DataPoint3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPointLine", DataPointLine);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPointMarker", DataPointMarker);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPointWireframe", DataPointWireframe);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataSeries", DataSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataTable", DataTableStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "downBar", DownBar);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dropLine", DropLine);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "effectRef", EffectReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "errorBar", ErrorBar);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "fillRef", FillReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "floor", Floor);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "fontRef", FontReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "gridlineMajor", GridlineMajor);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "gridlineMinor", GridlineMinor);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "hiLoLine", HiLoLine);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "leaderLine", LeaderLine);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "legend", LegendStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "lnRef", LineReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "lineWidthScale", LineWidthScale);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "dataPointMarkerLayout", MarkerLayoutProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "plotArea", PlotArea);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "plotArea3D", PlotArea3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "seriesAxis", SeriesAxisProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "seriesLine", SeriesLine);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "styleClr", StyleColor);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "bodyPr", TextBodyProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "defRPr", TextCharacterPropertiesType);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "title", TitleStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "trendlineLabel", TrendlineLabel);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "trendline", TrendlineStyle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "upBar", UpBar);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "valueAxis", ValueAxisProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "view3D", View3DProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chartStyle", "wall", Wall);
  registerDrawing2012ChartStyleChildMaps(registry);
}
