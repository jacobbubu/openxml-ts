// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2013_main_command.json

import type { ElementRegistry } from "../../../element/index.js";
import { AnimEffectMkLstAnimationEffectMonikerList } from "./anim-effect-mk-lst-animation-effect-moniker-list.js";
import { AnimEffectParentMkLstAnimationEffectMonikerList } from "./anim-effect-parent-mk-lst-animation-effect-moniker-list.js";
import { CommentAuthorMonikerList } from "./comment-author-moniker-list.js";
import { CommentMonikerList } from "./comment-moniker-list.js";
import { CustomShowMonikerList } from "./custom-show-moniker-list.js";
import { CustomXmlPartMonikerList } from "./custom-xml-part-moniker-list.js";
import { DesignerTagMonikerList } from "./designer-tag-moniker-list.js";
import { DocumentMoniker } from "./document-moniker.js";
import { DocumentMonikerList } from "./document-moniker-list.js";
import { HandoutMonikerList } from "./handout-moniker-list.js";
import { MainMasterMonikerList } from "./main-master-moniker-list.js";
import { NotesMasterMonikerList } from "./notes-master-moniker-list.js";
import { NotesMonikerList } from "./notes-moniker-list.js";
import { NotesTextMonikerList } from "./notes-text-moniker-list.js";
import { OsfTaskPaneAppMonikerList } from "./osf-task-pane-app-moniker-list.js";
import { SectionLinkObjMonikerList } from "./section-link-obj-moniker-list.js";
import { SectionMonikerList } from "./section-moniker-list.js";
import { SlideBaseMonikerList } from "./slide-base-moniker-list.js";
import { SlideLayoutMonikerList } from "./slide-layout-moniker-list.js";
import { SlideMoniker } from "./slide-moniker.js";
import { SlideMonikerList } from "./slide-moniker-list.js";
import { SlidePosMonikerList } from "./slide-pos-moniker-list.js";
import { StringTagMonikerList } from "./string-tag-moniker-list.js";
import { SummaryZoomMonikerList } from "./summary-zoom-moniker-list.js";

/**
 * 把 ppt-2013-command 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function registerPpt2013CommandElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "animEffectMkLst", AnimEffectMkLstAnimationEffectMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "animEffectParentMkLst", AnimEffectParentMkLstAnimationEffectMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "cmAuthorMkLst", CommentAuthorMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "cmMkLst", CommentMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "custShowMkLst", CustomShowMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "cXmlMkLst", CustomXmlPartMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "designTagMkLst", DesignerTagMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "docMk", DocumentMoniker);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "docMkLst", DocumentMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "handoutMkLst", HandoutMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldMasterMkLst", MainMasterMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "notesMasterMkLst", NotesMasterMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "notesMkLst", NotesMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "notesTxtMkLst", NotesTextMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "tkAppMkLst", OsfTaskPaneAppMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sectionLnkObjMkLst", SectionLinkObjMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sectionMkLst", SectionMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldBaseMkLst", SlideBaseMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldLayoutMkLst", SlideLayoutMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldMk", SlideMoniker);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldMkLst", SlideMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "sldPosMkLst", SlidePosMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "tagMkLst", StringTagMonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2013/main/command", "tocMkLst", SummaryZoomMonikerList);
}
