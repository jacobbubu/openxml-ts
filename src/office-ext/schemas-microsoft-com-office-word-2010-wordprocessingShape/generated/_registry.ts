// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingShape.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerWord2010WordprocessingShapeChildMaps } from "./_child-map.js";
import { LinkedTextBox } from "./linked-text-box.js";
import { NonVisualConnectorProperties } from "./non-visual-connector-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualDrawingShapeProperties } from "./non-visual-drawing-shape-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { ShapeProperties } from "./shape-properties.js";
import { ShapeStyle } from "./shape-style.js";
import { TextBodyProperties } from "./text-body-properties.js";
import { TextBoxInfo2 } from "./text-box-info2.js";
import { WordprocessingShape } from "./wordprocessing-shape.js";

/**
 * 把 word-2010-wordprocessingShape 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerWord2010WordprocessingShapeElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "linkedTxbx", LinkedTextBox);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "cNvCnPr", NonVisualConnectorProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "cNvSpPr", NonVisualDrawingShapeProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "spPr", ShapeProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "style", ShapeStyle);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "bodyPr", TextBodyProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "txbx", TextBoxInfo2);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingShape", "wsp", WordprocessingShape);
  registerWord2010WordprocessingShapeChildMaps(registry);
}
