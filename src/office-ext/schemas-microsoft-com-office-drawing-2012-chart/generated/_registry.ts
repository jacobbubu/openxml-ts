// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chart.json

import type { ElementRegistry } from "../../../element/index.js";
import { AutoGeneneratedCategories } from "./auto-genenerated-categories.js";
import { AxisDataSourceType } from "./axis-data-source-type.js";
import { Bubble3D } from "./bubble3-d.js";
import { CategoryFilterException } from "./category-filter-exception.js";
import { CategoryFilterExceptions } from "./category-filter-exceptions.js";
import { ChartText } from "./chart-text.js";
import { DataLabel } from "./data-label.js";
import { DataLabelFieldTable } from "./data-label-field-table.js";
import { DataLabelFieldTableCache } from "./data-label-field-table-cache.js";
import { DataLabelFieldTableEntry } from "./data-label-field-table-entry.js";
import { DataLabelsRange } from "./data-labels-range.js";
import { DataLabelsRangeChache } from "./data-labels-range-chache.js";
import { ExceptionForSave } from "./exception-for-save.js";
import { Explosion } from "./explosion.js";
import { FilteredAreaSeries } from "./filtered-area-series.js";
import { FilteredBarSeries } from "./filtered-bar-series.js";
import { FilteredBubbleSeries } from "./filtered-bubble-series.js";
import { FilteredCategoryTitle } from "./filtered-category-title.js";
import { FilteredLineSeriesExtension } from "./filtered-line-series-extension.js";
import { FilteredPieSeries } from "./filtered-pie-series.js";
import { FilteredRadarSeries } from "./filtered-radar-series.js";
import { FilteredScatterSeries } from "./filtered-scatter-series.js";
import { FilteredSeriesTitle } from "./filtered-series-title.js";
import { FilteredSurfaceSeries } from "./filtered-surface-series.js";
import { Formula } from "./formula.js";
import { FormulaReference } from "./formula-reference.js";
import { FullReference } from "./full-reference.js";
import { InvertIfNegativeBoolean } from "./invert-if-negative-boolean.js";
import { Layout } from "./layout.js";
import { LeaderLines } from "./leader-lines.js";
import { LevelReference } from "./level-reference.js";
import { Marker } from "./marker.js";
import { NumberingFormat } from "./numbering-format.js";
import { PivotSource } from "./pivot-source.js";
import { SequenceOfReferences } from "./sequence-of-references.js";
import { ShapeProperties } from "./shape-properties.js";
import { ShowDataLabelsRange } from "./show-data-labels-range.js";
import { ShowLeaderLines } from "./show-leader-lines.js";
import { SurfaceChartSeries } from "./surface-chart-series.js";
import { TextFieldGuid } from "./text-field-guid.js";

/**
 * 把 drawing-2012-chart 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2012ChartElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "autoCat", AutoGeneneratedCategories);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "cat", AxisDataSourceType);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "bubble3D", Bubble3D);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "categoryFilterException", CategoryFilterException);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "categoryFilterExceptions", CategoryFilterExceptions);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "tx", ChartText);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "dLbl", DataLabel);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "dlblFieldTable", DataLabelFieldTable);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "dlblFieldTableCache", DataLabelFieldTableCache);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "dlblFTEntry", DataLabelFieldTableEntry);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "datalabelsRange", DataLabelsRange);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "dlblRangeCache", DataLabelsRangeChache);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "xForSave", ExceptionForSave);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "explosion", Explosion);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredAreaSeries", FilteredAreaSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredBarSeries", FilteredBarSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredBubbleSeries", FilteredBubbleSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredCategoryTitle", FilteredCategoryTitle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredLineSeries", FilteredLineSeriesExtension);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredPieSeries", FilteredPieSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredRadarSeries", FilteredRadarSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredScatterSeries", FilteredScatterSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredSeriesTitle", FilteredSeriesTitle);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "filteredSurfaceSeries", FilteredSurfaceSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "f", Formula);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "formulaRef", FormulaReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "fullRef", FullReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "invertIfNegative", InvertIfNegativeBoolean);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "layout", Layout);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "leaderLines", LeaderLines);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "levelRef", LevelReference);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "marker", Marker);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "numFmt", NumberingFormat);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "pivotSource", PivotSource);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "sqref", SequenceOfReferences);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "showDataLabelsRange", ShowDataLabelsRange);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "showLeaderLines", ShowLeaderLines);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "ser", SurfaceChartSeries);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/chart", "txfldGUID", TextFieldGuid);
}
