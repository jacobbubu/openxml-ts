// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2018_wordml_cex.json

import type { ElementRegistry } from "../../../element/index.js";
import { CommentExtensible } from "./comment-extensible.js";
import { CommentsExtensible } from "./comments-extensible.js";
import { ExtensionList } from "./extension-list.js";

/**
 * 把 2018-wordml-cex 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register2018WordmlCexElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/word/2018/wordml/cex", "commentExtensible", CommentExtensible);
  registry.register("http://schemas.microsoft.com/office/word/2018/wordml/cex", "commentsExtensible", CommentsExtensible);
  registry.register("http://schemas.microsoft.com/office/word/2018/wordml/cex", "extLst", ExtensionList);
}
