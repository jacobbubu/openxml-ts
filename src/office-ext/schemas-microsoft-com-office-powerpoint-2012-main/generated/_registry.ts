// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { ChartTrackingReferenceBased } from "./chart-tracking-reference-based.js";
import { ColorType } from "./color-type.js";
import { ExtendedGuide } from "./extended-guide.js";
import { ExtensionList } from "./extension-list.js";
import { NotesGuideList } from "./notes-guide-list.js";
import { ParentCommentIdentifier } from "./parent-comment-identifier.js";
import { PresenceInfo } from "./presence-info.js";
import { PresetTransition } from "./preset-transition.js";
import { SlideGuideList } from "./slide-guide-list.js";
import { ThreadingInfo } from "./threading-info.js";

/**
 * 把 powerpoint-2012-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerPowerpoint2012MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "chartTrackingRefBased", ChartTrackingReferenceBased);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "clr", ColorType);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "guide", ExtendedGuide);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "notesGuideLst", NotesGuideList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "parentCm", ParentCommentIdentifier);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "presenceInfo", PresenceInfo);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "prstTrans", PresetTransition);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "sldGuideLst", SlideGuideList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2012/main", "threadingInfo", ThreadingInfo);
}
