/**
 * Epic-24：DrawingML \`a:r\` (Run) 的 \`text\` 访问器 mixin。
 *
 * 同 Word Run.text 的实现思路——给原型挂 getter / setter，副作用进入 \`openxml-ts/ppt\`
 * 入口。getter 展平内嵌 \`<a:t>\` + \`<a:br>\`；setter 替换 \`<a:t>\` / \`<a:br>\` 子，保留 rPr。
 */

import { Run } from "../../drawing/generated/run.js";
import { applyARunText, collectParagraphText } from "./text-collect.js";

declare module "../../drawing/generated/run.js" {
  interface Run {
    /**
     * Run 内联文本——展平 \`<a:t>\` + \`<a:br>\`（→ \\n）。setter 替换 Run 现有 Text/Break
     * 子节点；rPr 等其它子节点保留。空字符串清空文本但保留 rPr。
     */
    text: string;
  }
}

Object.defineProperty(Run.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Run): string {
    return collectParagraphText(this);
  },
  set(this: Run, value: string): void {
    applyARunText(this, value);
  },
});
