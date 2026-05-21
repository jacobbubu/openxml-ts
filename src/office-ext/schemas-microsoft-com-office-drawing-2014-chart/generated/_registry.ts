// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chart.json

import type { ElementRegistry } from "../../../element/index.js";
import { BooleanFalse } from "./boolean-false.js";
import { Bubble3DBoolean } from "./bubble3-d-boolean.js";
import { CategoryFilterException } from "./category-filter-exception.js";
import { CategoryFilterExceptions } from "./category-filter-exceptions.js";
import { ChartDataPointUniqueIDMap } from "./chart-data-point-unique-id-map.js";
import { ChartDataPointUniqueIDMapEntry } from "./chart-data-point-unique-id-map-entry.js";
import { DLbl } from "./d-lbl.js";
import { InvertIfNegativeBoolean } from "./invert-if-negative-boolean.js";
import { LiteralDataChart } from "./literal-data-chart.js";
import { Marker } from "./marker.js";
import { MultiLvlStrData } from "./multi-lvl-str-data.js";
import { NumberDataType } from "./number-data-type.js";
import { PivotOptions16 } from "./pivot-options16.js";
import { ShapeProperties } from "./shape-properties.js";
import { StrFilteredLiteralCache } from "./str-filtered-literal-cache.js";
import { StringDataType } from "./string-data-type.js";
import { UniqueID } from "./unique-id.js";
import { UniqueIdChartUniqueID } from "./unique-id-chart-unique-id.js";
import { UnsignedIntegerType } from "./unsigned-integer-type.js";
import { XsdunsignedInt } from "./xsdunsigned-int.js";

/**
 * 把 drawing-2014-chart 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2014ChartElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "showExpandCollapseFieldButtons", BooleanFalse);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "bubble3D", Bubble3DBoolean);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "categoryFilterException", CategoryFilterException);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "categoryFilterExceptions", CategoryFilterExceptions);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "datapointuniqueidmap", ChartDataPointUniqueIDMap);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "ptentry", ChartDataPointUniqueIDMapEntry);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "dLbl", DLbl);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "invertIfNegative", InvertIfNegativeBoolean);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "literalDataChart", LiteralDataChart);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "marker", Marker);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "multiLvlStrCache", MultiLvlStrData);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "numCache", NumberDataType);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "pivotOptions16", PivotOptions16);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "filteredLitCache", StrFilteredLiteralCache);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "strCache", StringDataType);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "uniqueID", UniqueID);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "uniqueId", UniqueIdChartUniqueID);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "explosion", UnsignedIntegerType);
  registry.register("http://schemas.microsoft.com/office/drawing/2014/chart", "ptidx", XsdunsignedInt);
}
