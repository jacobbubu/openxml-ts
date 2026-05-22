// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingDrawing.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerWord2010WordprocessingDrawingChildMaps } from "./_child-map.js";
import { PercentageHeight } from "./percentage-height.js";
import { PercentagePositionHeightOffset } from "./percentage-position-height-offset.js";
import { PercentagePositionVerticalOffset } from "./percentage-position-vertical-offset.js";
import { PercentageWidth } from "./percentage-width.js";
import { RelativeHeight } from "./relative-height.js";
import { RelativeWidth } from "./relative-width.js";

/**
 * 把 word-2010-wordprocessingDrawing 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerWord2010WordprocessingDrawingElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "pctHeight", PercentageHeight);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "pctPosHOffset", PercentagePositionHeightOffset);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "pctPosVOffset", PercentagePositionVerticalOffset);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "pctWidth", PercentageWidth);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "sizeRelV", RelativeHeight);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing", "sizeRelH", RelativeWidth);
  registerWord2010WordprocessingDrawingChildMaps(registry);
}
