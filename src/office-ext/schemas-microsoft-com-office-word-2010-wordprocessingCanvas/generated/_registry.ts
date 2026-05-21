// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingCanvas.json

import type { ElementRegistry } from "../../../element/index.js";
import { BackgroundFormatting } from "./background-formatting.js";
import { GraphicFrameType } from "./graphic-frame-type.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { WholeFormatting } from "./whole-formatting.js";
import { WordprocessingCanvas } from "./wordprocessing-canvas.js";

/**
 * 把 word-2010-wordprocessingCanvas 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerWord2010WordprocessingCanvasElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "bg", BackgroundFormatting);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "graphicFrame", GraphicFrameType);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "whole", WholeFormatting);
  registry.register("http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas", "wpc", WordprocessingCanvas);
}
