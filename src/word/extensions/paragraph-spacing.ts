// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-31：Word `Paragraph.spacing` 访问器 mixin。
 *
 * 给 `Paragraph.prototype` 挂 getter/setter，封装段落级
 * `<w:spacing w:before= w:after= w:line= w:lineRule=>`。
 *
 * - 单位 dxa（1 inch = 1440 dxa，单倍行距 ≈ 240 dxa with lineRule="auto"）
 * - setter 传 undefined 删 `<w:spacing>`；传 partial 对象时 **merge**（保留已存在的字段）
 * - getter 仅返回已显式设的字段
 * - pPr 不存在时自动创建并插入为 Paragraph 第一个 child
 */

import { StringValue } from "../../element/index.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { Paragraph } from "../generated/paragraph.js";
import { SpacingBetweenLines } from "../generated/spacing-between-lines.js";

export interface ParagraphSpacing {
  readonly beforeDxa?: number;
  readonly afterDxa?: number;
  readonly lineDxa?: number;
  readonly lineRule?: "auto" | "atLeast" | "exact";
}

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落间距（段前 / 段后 / 行距）—— `<w:spacing>` 元素的便捷视图。
     * 读不到任何字段返 undefined。setter 传 undefined 删 spacing；传 partial 对象时
     * merge 进现有 spacing（不会清空未指定的字段）。
     */
    spacing: ParagraphSpacing | undefined;
  }
}

Object.defineProperty(Paragraph.prototype, "spacing", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): ParagraphSpacing | undefined {
    const pPr = this.firstChild(ParagraphProperties);
    const sp = pPr?.firstChild(SpacingBetweenLines);
    if (sp === undefined) return undefined;
    const out: { -readonly [K in keyof ParagraphSpacing]: ParagraphSpacing[K] } = {};
    const b = sp.before?.toString();
    const a = sp.after?.toString();
    const l = sp.line?.toString();
    const lr = sp.lineRule?.toString();
    if (b !== undefined) out.beforeDxa = Number.parseInt(b, 10);
    if (a !== undefined) out.afterDxa = Number.parseInt(a, 10);
    if (l !== undefined) out.lineDxa = Number.parseInt(l, 10);
    if (lr !== undefined) out.lineRule = lr as "auto" | "atLeast" | "exact";
    return Object.keys(out).length === 0 ? undefined : out;
  },
  set(this: Paragraph, value: ParagraphSpacing | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(SpacingBetweenLines);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }
    let sp = pPr.firstChild(SpacingBetweenLines);
    if (sp === undefined) {
      sp = new SpacingBetweenLines();
      pPr.appendChild(sp);
    }
    if (value.beforeDxa !== undefined) sp.before = StringValue.parse(String(value.beforeDxa));
    if (value.afterDxa !== undefined) sp.after = StringValue.parse(String(value.afterDxa));
    if (value.lineDxa !== undefined) sp.line = StringValue.parse(String(value.lineDxa));
    if (value.lineRule !== undefined) sp.lineRule = StringValue.parse(value.lineRule);
  },
});
