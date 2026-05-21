// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingGroup.json

import type { ElementRegistry } from "../../../element/index.js";
import { GraphicFrame } from "./graphic-frame.js";
import { GroupShape } from "./group-shape.js";
import { GroupShapeProperties } from "./group-shape-properties.js";
import { NonVisualDrawingProperties } from "./non-visual-drawing-properties.js";
import { NonVisualGraphicFrameProperties } from "./non-visual-graphic-frame-properties.js";
import { NonVisualGroupDrawingShapeProperties } from "./non-visual-group-drawing-shape-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { Transform2D } from "./transform2-d.js";
import { WordprocessingGroup } from "./wordprocessing-group.js";

/**
 * 把 word-2010-wordprocessingGroup 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerWord2010WordprocessingGroupElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "graphicFrame", GraphicFrame);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "grpSp", GroupShape);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "grpSpPr", GroupShapeProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "cNvPr", NonVisualDrawingProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "cNvFrPr", NonVisualGraphicFrameProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "cNvGrpSpPr", NonVisualGroupDrawingShapeProperties);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "xfrm", Transform2D);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingGroup", "wgp", WordprocessingGroup);
}
