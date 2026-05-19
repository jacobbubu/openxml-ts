/**
 * Epic-40：Word `Paragraph.styleId` 访问器 mixin。
 *
 * 给 `Paragraph.prototype` 挂 getter/setter，封装 `<w:pPr><w:pStyle w:val="..."/>`。
 *
 * - getter: 返当前 pStyle.val 字符串；不存在返 undefined
 * - setter: 字符串 → 创建 / 替换；undefined → 删 pStyle
 * - pPr 不存在时自动创建并作为 Paragraph 第一个 child（与 Epic-30/31/35 同构）
 *
 * 不在范围：自动创建 Style 条目（用户保证 styleId 在 styles part 已存在）。
 */

import { StringValue } from "../../element/index.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { ParagraphStyleId } from "../generated/paragraph-style-id.js";
import { Paragraph } from "../generated/paragraph.js";

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落引用样式表条目的 styleId（如 "Heading1"、"Quote"）。
     * undefined 表示段落不引用样式（继承默认）。
     */
    styleId: string | undefined;
  }
}

Object.defineProperty(Paragraph.prototype, "styleId", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): string | undefined {
    return this.firstChild(ParagraphProperties)?.firstChild(ParagraphStyleId)?.val?.toString();
  },
  set(this: Paragraph, value: string | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(ParagraphStyleId);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }
    let pStyle = pPr.firstChild(ParagraphStyleId);
    if (pStyle === undefined) {
      pStyle = new ParagraphStyleId();
      // pStyle 在 pPr 里通常作为第一个子（schema 顺序约束）
      const firstPpChild = pPr.children.at(0);
      if (firstPpChild === undefined) pPr.appendChild(pStyle);
      else pPr.children.insertBefore(pStyle, firstPpChild);
    }
    pStyle.val = StringValue.parse(value);
  },
});
