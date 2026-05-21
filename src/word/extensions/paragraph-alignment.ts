// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-30：Word \`Paragraph.alignment\` 访问器 mixin。
 *
 * 给 \`Paragraph.prototype\` 挂 getter/setter，从手工挂 pPr+Justification 收敛到
 * \`p.alignment = "center"\` 一行。\`alignment === undefined\` 表示「无显式对齐」
 * （继承样式默认）。
 *
 * 副作用：通过 \`openxml-ts/word\` 入口 bare-import 注入。
 */

import { StringValue } from "../../element/index.js";
import { Justification } from "../generated/justification.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { Paragraph } from "../generated/paragraph.js";

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落对齐方式——\`<w:jc w:val="...">\`。读不到返 undefined（继承样式默认）。
     * setter 传 undefined 删除 \`<w:jc>\`；传字符串 set / 替换。
     */
    alignment: WordAlignment | undefined;
  }
}

export type WordAlignment = "left" | "center" | "right" | "both" | "distribute" | "start" | "end";

Object.defineProperty(Paragraph.prototype, "alignment", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): WordAlignment | undefined {
    const pPr = this.firstChild(ParagraphProperties);
    const jc = pPr?.firstChild(Justification);
    const v = jc?.val?.toString();
    return v as WordAlignment | undefined;
  },
  set(this: Paragraph, value: WordAlignment | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(Justification);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      // pPr 必须作为 Paragraph 第一个 child
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }
    const existing = pPr.firstChild(Justification);
    if (existing !== undefined) {
      existing.val = StringValue.parse(value);
    } else {
      const jc = new Justification();
      jc.val = StringValue.parse(value);
      pPr.appendChild(jc);
    }
  },
});
