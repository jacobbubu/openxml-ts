// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_timeslicer.json

import type { ElementRegistry } from "../../../element/index.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { TimeSlicer } from "./time-slicer.js";

/**
 * 把 drawing-2012-timeslicer 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerDrawing2012TimeslicerElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2012/timeslicer", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2012/timeslicer", "timeslicer", TimeSlicer);
}
