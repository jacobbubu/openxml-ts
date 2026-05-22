// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2021_livefeed.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerDrawing2021LivefeedChildMaps } from "./_child-map.js";
import { BackgroundBlurProperties } from "./background-blur-properties.js";
import { BackgroundCustomProperties } from "./background-custom-properties.js";
import { BackgroundNormalProperties } from "./background-normal-properties.js";
import { BackgroundRemovedProperties } from "./background-removed-properties.js";
import { LiveFeedBackgroundProperties } from "./live-feed-background-properties.js";
import { LiveFeedProperties } from "./live-feed-properties.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";

/**
 * 把 drawing-2021-livefeed 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerDrawing2021LivefeedElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "Blur", BackgroundBlurProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "Custom", BackgroundCustomProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "Normal", BackgroundNormalProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "Removed", BackgroundRemovedProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "backgroundProps", LiveFeedBackgroundProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "liveFeedProps", LiveFeedProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2021/livefeed", "extLst", OfficeArtExtensionList);
  registerDrawing2021LivefeedChildMaps(registry);
}
