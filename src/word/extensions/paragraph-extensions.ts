/**
 * `Paragraph` 的 partial mixin（Story-11.1）。
 *
 * 给 `Paragraph.prototype` 挂只读 `text` getter：把段落里所有 Run（含
 * Hyperlink / SDT 等容器内嵌的 Run）按文档顺序展平成字符串。语义与
 * Run.text 一致：`<w:tab>` → `\t`，`<w:br>` → `\n`，其它内联非文本节点
 * （rPr / pPr / Drawing / 书签锚等）跳过。
 *
 * setter 不提供——Paragraph 通常持多个 Run 且每个 Run 自带样式；把字符串
 * 写回去会丢格式。需要写入的话直接操作 Run.text 或新建 Run + appendChild。
 *
 * 副作用：模块加载时调用 `Object.defineProperty(Paragraph.prototype, ...)`。
 */

import { Paragraph } from "../generated/paragraph.js";
import { collectRunText } from "./text-collect.js";

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /** 段落里所有 Run 文本展平后的字符串。只读。 */
    readonly text: string;
  }
}

Object.defineProperty(Paragraph.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): string {
    return collectRunText(this);
  },
});
