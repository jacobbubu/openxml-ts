// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-24：DrawingML \`a:p\` (Paragraph) 的只读 \`text\` getter mixin。
 *
 * 段落内所有 Run 文本展平 + \`<a:br>\` 转 \\n。**段落级**不提供 setter——多 Run + 各
 * 自的 rPr 写回会丢格式；要改请直接 Run.text 或新建 Run + appendChild。
 */

import { Paragraph } from "../../drawing/generated/paragraph.js";
import { collectParagraphText } from "./text-collect.js";

declare module "../../drawing/generated/paragraph.js" {
  interface Paragraph {
    /** Paragraph 里所有 Run 的文本展平。只读。 */
    readonly text: string;
  }
}

Object.defineProperty(Paragraph.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): string {
    return collectParagraphText(this);
  },
});
