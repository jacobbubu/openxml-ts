// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_threadedcomments.json

import type { ElementRegistry } from "../../../element/index.js";
import { registerSpreadsheetml2018ThreadedcommentsChildMaps } from "./_child-map.js";
import { ExtensionList } from "./extension-list.js";
import { Mention } from "./mention.js";
import { Person } from "./person.js";
import { PersonList } from "./person-list.js";
import { ThreadedComment } from "./threaded-comment.js";
import { ThreadedCommentMentions } from "./threaded-comment-mentions.js";
import { ThreadedComments } from "./threaded-comments.js";
import { ThreadedCommentText } from "./threaded-comment-text.js";

/**
 * 把 spreadsheetml-2018-threadedcomments 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function registerSpreadsheetml2018ThreadedcommentsElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "mention", Mention);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "person", Person);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "personList", PersonList);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "threadedComment", ThreadedComment);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "mentions", ThreadedCommentMentions);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "ThreadedComments", ThreadedComments);
  registry.register("http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments", "text", ThreadedCommentText);
  registerSpreadsheetml2018ThreadedcommentsChildMaps(registry);
}
