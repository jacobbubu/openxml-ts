// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerWord2012WordmlChildMaps } from "./_child-map.js";
import { Appearance } from "./appearance.js";
import { ChartTrackingRefBased } from "./chart-tracking-ref-based.js";
import { Color } from "./color.js";
import { CommentEx } from "./comment-ex.js";
import { CommentsEx } from "./comments-ex.js";
import { DataBinding } from "./data-binding.js";
import { DefaultCollapsed } from "./default-collapsed.js";
import { DoNotAllowInsertDeleteSection } from "./do-not-allow-insert-delete-section.js";
import { FootnoteColumns } from "./footnote-columns.js";
import { People } from "./people.js";
import { PersistentDocumentId } from "./persistent-document-id.js";
import { Person } from "./person.js";
import { PresenceInfo } from "./presence-info.js";
import { SdtRepeatedSection } from "./sdt-repeated-section.js";
import { SdtRepeatedSectionItem } from "./sdt-repeated-section-item.js";
import { SectionTitle } from "./section-title.js";
import { WebExtensionCreated } from "./web-extension-created.js";
import { WebExtensionLinked } from "./web-extension-linked.js";

/**
 * 把 word-2012-wordml 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerWord2012WordmlElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "appearance", Appearance);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "chartTrackingRefBased", ChartTrackingRefBased);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "color", Color);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "commentEx", CommentEx);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "commentsEx", CommentsEx);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "dataBinding", DataBinding);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "collapsed", DefaultCollapsed);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "doNotAllowInsertDeleteSection", DoNotAllowInsertDeleteSection);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "footnoteColumns", FootnoteColumns);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "people", People);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "docId", PersistentDocumentId);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "person", Person);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "presenceInfo", PresenceInfo);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "repeatingSection", SdtRepeatedSection);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "repeatingSectionItem", SdtRepeatedSectionItem);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "sectionTitle", SectionTitle);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "webExtensionCreated", WebExtensionCreated);
  registry.register("http://schemas.microsoft.com/office/word/2012/wordml", "webExtensionLinked", WebExtensionLinked);
  registerWord2012WordmlChildMaps(registry);
}
