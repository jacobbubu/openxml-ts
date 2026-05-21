// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-42：PPT / DrawingML `a:p` Paragraph 段落格式访问器 mixin。
 *
 * 与 Word Epic-30 对称，但 DrawingML pPr 的字段都是自身 typed 属性
 * （不是子元素）：
 *   <a:p><a:pPr algn="ctr" marL="457200" indent="-457200">...</a:p>
 *
 * 字段：
 *   p.alignment = "l" / "ctr" / "r" / "just" / "dist" / undefined
 *   p.leftMarginEmu = 914400          // 1 inch = 914400 EMU
 *   p.indentEmu = -457200             // 负值是悬挂缩进
 */

import { ParagraphProperties } from "../../drawing/generated/paragraph-properties.js";
import { Paragraph } from "../../drawing/generated/paragraph.js";
import { Int32Value, StringValue } from "../../element/index.js";

export type DrawingMLAlignment = "l" | "ctr" | "r" | "just" | "dist" | "justLow" | "thaiDist";

declare module "../../drawing/generated/paragraph.js" {
  interface Paragraph {
    /** 段落对齐："l"/"ctr"/"r"/"just"/"dist"，undefined 继承默认。 */
    alignment: DrawingMLAlignment | undefined;
    /** 左缩进（EMU；914400 = 1 inch）。 */
    leftMarginEmu: number | undefined;
    /** 首行缩进（EMU；负值是悬挂缩进）。 */
    indentEmu: number | undefined;
  }
}

function ensurePPr(p: Paragraph, readOnly: boolean): ParagraphProperties | undefined {
  const existing = p.firstChild(ParagraphProperties);
  if (existing !== undefined) return existing;
  if (readOnly) return undefined;
  const pPr = new ParagraphProperties();
  const first = p.children.at(0);
  if (first === undefined) p.appendChild(pPr);
  else p.children.insertBefore(pPr, first);
  return pPr;
}

Object.defineProperty(Paragraph.prototype, "alignment", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): DrawingMLAlignment | undefined {
    return this.firstChild(ParagraphProperties)?.alignment?.toString() as
      | DrawingMLAlignment
      | undefined;
  },
  set(this: Paragraph, value: DrawingMLAlignment | undefined): void {
    const pPr = ensurePPr(this, value === undefined);
    if (pPr === undefined) return;
    pPr.alignment = value === undefined ? undefined : StringValue.parse(value);
  },
});

Object.defineProperty(Paragraph.prototype, "leftMarginEmu", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): number | undefined {
    const v = this.firstChild(ParagraphProperties)?.leftMargin;
    if (v === undefined) return undefined;
    const n = Number.parseInt(v.toString(), 10);
    return Number.isFinite(n) ? n : undefined;
  },
  set(this: Paragraph, value: number | undefined): void {
    const pPr = ensurePPr(this, value === undefined);
    if (pPr === undefined) return;
    pPr.leftMargin = value === undefined ? undefined : Int32Value.parse(String(value));
  },
});

Object.defineProperty(Paragraph.prototype, "indentEmu", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): number | undefined {
    const v = this.firstChild(ParagraphProperties)?.indent;
    if (v === undefined) return undefined;
    const n = Number.parseInt(v.toString(), 10);
    return Number.isFinite(n) ? n : undefined;
  },
  set(this: Paragraph, value: number | undefined): void {
    const pPr = ensurePPr(this, value === undefined);
    if (pPr === undefined) return;
    pPr.indent = value === undefined ? undefined : Int32Value.parse(String(value));
  },
});
