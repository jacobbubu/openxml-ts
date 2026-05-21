// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2016_wordml_cid.json

import type { ElementRegistry } from "../../../element/index.js";
import { CommentId } from "./comment-id.js";
import { CommentsIds } from "./comments-ids.js";

/**
 * 把 2016-wordml-cid 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register2016WordmlCidElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2016/wordml/cid", "commentId", CommentId);
  registry.register("http://schemas.microsoft.com/office/word/2016/wordml/cid", "commentsIds", CommentsIds);
}
