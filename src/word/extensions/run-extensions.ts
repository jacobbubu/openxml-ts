/**
 * `Run` 的 partial mixin（Story-11.1）。
 *
 * 同 `cell-extensions.ts` 的设计：codegen 产物 `src/word/generated/run.ts`
 * 不允许手改；本模块通过 TS module augmentation + 运行时
 * `Object.defineProperty` 给 `Run.prototype` 挂一对 `text` 访问器。
 *
 * - **getter**：展平 Run 内部 `<w:t>` / `<w:tab>` / `<w:br>`，按文档顺序
 *   拼成字符串；`<w:tab>` → `\t`，`<w:br>` → `\n`。
 * - **setter**：把字符串解析回 Text / TabChar / Break 节点序列，替换 Run
 *   现有内联文本子节点；RunProperties / Drawing 等结构性子节点保留。
 *
 * 副作用：模块加载时调用 `Object.defineProperty(Run.prototype, ...)`。调用方
 * 负责保证至少 import 一次（典型路径是 `openxml-ts/word` 公共 entry 重新
 * 导出本模块）。
 */

import { Run } from "../generated/run.js";
import { applyRunText, collectRunText } from "./text-collect.js";

declare module "../generated/run.js" {
  interface Run {
    /**
     * Run 内联文本——展平 `<w:t>` + `\t`（`<w:tab>`）+ `\n`（`<w:br>`）。
     *
     * setter 会替换 Run 现有的 Text / TabChar / Break 子节点；rPr / Drawing
     * 等其它子节点保留。空字符串清空文本但保留 rPr。
     */
    text: string;
  }
}

Object.defineProperty(Run.prototype, "text", {
  configurable: false,
  enumerable: false,
  get(this: Run): string {
    return collectRunText(this);
  },
  set(this: Run, value: string): void {
    applyRunText(this, value);
  },
});
