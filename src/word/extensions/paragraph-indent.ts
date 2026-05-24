// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-30：Word \`Paragraph.indent\` 访问器 mixin。
 *
 * 给 \`Paragraph.prototype\` 挂 getter/setter，封装 \`<w:ind w:left= w:right= w:firstLine= w:hanging=>\`。
 *
 * - 单位 dxa（1 inch = 1440 dxa）
 * - setter 传 undefined 删 \`<w:ind>\`；传部分字段时 **merge**（保留已存在的字段，不清空）
 * - getter 读全部当前已设的字段，未设的不出现
 */

import { StringValue } from "../../element/index.js";
import { Indentation } from "../generated/indentation.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { Paragraph } from "../generated/paragraph.js";

export interface ParagraphIndent {
  readonly leftDxa?: number;
  readonly rightDxa?: number;
  readonly firstLineDxa?: number;
  readonly hangingDxa?: number;
}

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落缩进——\`<w:ind>\` 元素的便捷视图。读不到任何字段返 undefined。
     * setter 传 undefined 删 ind；传 partial 对象时 merge 进现有 ind。
     */
    indent: ParagraphIndent | undefined;
  }
}

Object.defineProperty(Paragraph.prototype, "indent", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): ParagraphIndent | undefined {
    const pPr = this.firstChild(ParagraphProperties);
    const ind = pPr?.firstChild(Indentation);
    if (ind === undefined) return undefined;
    const out: { -readonly [K in keyof ParagraphIndent]: ParagraphIndent[K] } = {};
    // §14.3.1.2: "start" is the O14+ canonical form; "left" is the O07 alias.
    // After strict translation, w:left routes to ind.start. Read start first, fall back to left.
    const l = (ind.start ?? ind.left)?.toString();
    // Similarly "end" is the O14+ canonical form for "right".
    const r = (ind.end ?? ind.right)?.toString();
    const f = ind.firstLine?.toString();
    const h = ind.hanging?.toString();
    if (l !== undefined) out.leftDxa = Number.parseInt(l, 10);
    if (r !== undefined) out.rightDxa = Number.parseInt(r, 10);
    if (f !== undefined) out.firstLineDxa = Number.parseInt(f, 10);
    if (h !== undefined) out.hangingDxa = Number.parseInt(h, 10);
    return Object.keys(out).length === 0 ? undefined : out;
  },
  set(this: Paragraph, value: ParagraphIndent | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(Indentation);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }
    let ind = pPr.firstChild(Indentation);
    if (ind === undefined) {
      ind = new Indentation();
      pPr.appendChild(ind);
    }
    // Merge：仅在 value 显式带某字段时写入；其它字段保留
    // Write to left/right (Transitional w:left/w:right) for compatibility with .NET SDK readers.
    // The getter reads start ?? left so strict-translated documents (which use w:start) also work.
    if (value.leftDxa !== undefined) ind.left = StringValue.parse(String(value.leftDxa));
    if (value.rightDxa !== undefined) ind.right = StringValue.parse(String(value.rightDxa));
    if (value.firstLineDxa !== undefined)
      ind.firstLine = StringValue.parse(String(value.firstLineDxa));
    if (value.hangingDxa !== undefined) ind.hanging = StringValue.parse(String(value.hangingDxa));
  },
});
