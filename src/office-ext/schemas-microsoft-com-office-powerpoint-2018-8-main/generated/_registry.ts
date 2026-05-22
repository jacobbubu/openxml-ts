// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2018_8_main.json

import type { ElementRegistry } from "../../../element/index.js";
import { register20188MainChildMaps } from "./_child-map.js";
import { Author } from "./author.js";
import { AuthorList } from "./author-list.js";
import { Comment } from "./comment.js";
import { CommentList } from "./comment-list.js";
import { CommentRelationship } from "./comment-relationship.js";
import { CommentReply } from "./comment-reply.js";
import { CommentReplyList } from "./comment-reply-list.js";
import { CommentUnknownAnchor } from "./comment-unknown-anchor.js";
import { ExtensionList } from "./extension-list.js";
import { Point2DType } from "./point2-d-type.js";
import { TextBodyType } from "./text-body-type.js";

/**
 * 把 2018-8-main 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 * Epic-86：同时注册父→子上下文映射以启用上下文感知反序列化。
 */
export function register20188MainElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "author", Author);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "authorLst", AuthorList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "cm", Comment);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "cmLst", CommentList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "commentRel", CommentRelationship);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "reply", CommentReply);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "replyLst", CommentReplyList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "unknownAnchor", CommentUnknownAnchor);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "extLst", ExtensionList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "pos", Point2DType);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2018/8/main", "txBody", TextBodyType);
  register20188MainChildMaps(registry);
}
