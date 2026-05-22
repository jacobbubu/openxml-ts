// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_animation_model3d.json

import type { ElementRegistry } from "../../../element/index.js";
import { register2018AnimationModel3dChildMaps } from "./_child-map.js";
import { AnimationProperties } from "./animation-properties.js";
import { EmbeddedAnimation } from "./embedded-animation.js";
import { OfficeArtExtensionList } from "./office-art-extension-list.js";
import { PosterFrame } from "./poster-frame.js";

/**
 * 把 2018-animation-model3d 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register2018AnimationModel3dElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/drawing/2018/animation/model3d", "animPr", AnimationProperties);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/animation/model3d", "embedAnim", EmbeddedAnimation);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/animation/model3d", "extLst", OfficeArtExtensionList);
  registry.register("http://schemas.microsoft.com/office/drawing/2018/animation/model3d", "posterFrame", PosterFrame);
  register2018AnimationModel3dChildMaps(registry);
}
