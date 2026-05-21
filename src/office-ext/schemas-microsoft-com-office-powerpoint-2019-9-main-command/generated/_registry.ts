// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2019_9_main_command.json

import type { ElementRegistry } from "../../../element/index.js";
import { CommentReplyV2Moniker } from "./comment-reply-v2-moniker.js";
import { CommentReplyV2MonikerList } from "./comment-reply-v2-moniker-list.js";
import { CommentV2Moniker } from "./comment-v2-moniker.js";
import { CommentV2MonikerList } from "./comment-v2-moniker-list.js";

/**
 * 把 9-main-command 主 namespace 下全部具体 element 类注册到给定 ElementRegistry。
 * 调用方按需 import 此函数来启用 typed XML 反序列化；不调用时 registry 保持空，
 * 让 tree-shaker 把生成类从 bundle 中剔除（ADR-012）。
 */
export function register9MainCommandElements(registry: ElementRegistry): void {
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/9/main/command", "cmRplyMk", CommentReplyV2Moniker);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/9/main/command", "cmRplyMkLst", CommentReplyV2MonikerList);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/9/main/command", "cmMK", CommentV2Moniker);
  registry.register("http://schemas.microsoft.com/office/powerpoint/2019/9/main/command", "cmMkLst", CommentV2MonikerList);
}
