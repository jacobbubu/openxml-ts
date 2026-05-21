// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-54：Word `Paragraph.numbering` 编号访问器 mixin。
 *
 * 给 `Paragraph.prototype` 挂 getter/setter，封装 `<w:pPr><w:numPr>` 结构：
 *
 * - getter: 返 `{ id, level }` | undefined
 * - setter: `{ id, level }` → 创建 / 替换 `<w:numPr>`；undefined → 删 `<w:numPr>`
 * - pPr 不存在时自动创建并作为 Paragraph 第一个 child（与 Epic-40/30/31/35 同构）
 * - numPr 在 pPr 内放在 pStyle 之后（schema 顺序）
 */

import { Int32Value } from "../../element/index.js";
import { NumberingId } from "../generated/numbering-id.js";
import { NumberingLevelReference } from "../generated/numbering-level-reference.js";
import { NumberingProperties } from "../generated/numbering-properties.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { ParagraphStyleId } from "../generated/paragraph-style-id.js";
import { Paragraph } from "../generated/paragraph.js";

/** 段落编号引用：numId 指向 NumberingPart 条目，level 为 0-based 缩进级别（0..8）。 */
export interface ParagraphNumbering {
  /** 指向 NumberingPart 中的 numId（AbstractNum 实例编号）。 */
  id: number;
  /** 缩进级别，0-based（0 = 最外层，8 = 最内层）。 */
  level: number;
}

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /**
     * 段落编号引用（`<w:numPr>`）。
     * - getter: 返 `{ id, level }` 或 undefined（无 numPr）。
     * - setter: 传入 `{ id, level }` 创建 / 更新；传 undefined 删除 `<w:numPr>`。
     */
    numbering: ParagraphNumbering | undefined;
  }
}

Object.defineProperty(Paragraph.prototype, "numbering", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): ParagraphNumbering | undefined {
    const pPr = this.firstChild(ParagraphProperties);
    if (pPr === undefined) return undefined;
    const numPr = pPr.firstChild(NumberingProperties);
    if (numPr === undefined) return undefined;
    const ilvl = numPr.firstChild(NumberingLevelReference);
    const numId = numPr.firstChild(NumberingId);
    if (ilvl === undefined || numId === undefined) return undefined;
    const level = ilvl.val?.value;
    const id = numId.val?.value;
    if (level === undefined || id === undefined) return undefined;
    return { id, level };
  },
  set(this: Paragraph, value: ParagraphNumbering | undefined): void {
    let pPr = this.firstChild(ParagraphProperties);
    if (value === undefined) {
      if (pPr === undefined) return;
      const existing = pPr.firstChild(NumberingProperties);
      if (existing !== undefined) pPr.children.remove(existing);
      return;
    }

    // Ensure pPr exists as first child of Paragraph
    if (pPr === undefined) {
      pPr = new ParagraphProperties();
      const first = this.children.at(0);
      if (first === undefined) this.appendChild(pPr);
      else this.children.insertBefore(pPr, first);
    }

    // Remove existing numPr if present
    const existingNumPr = pPr.firstChild(NumberingProperties);
    if (existingNumPr !== undefined) pPr.children.remove(existingNumPr);

    // Build new numPr: <w:numPr><w:ilvl w:val="level"/><w:numId w:val="id"/></w:numPr>
    const numPr = new NumberingProperties();

    const ilvl = new NumberingLevelReference();
    ilvl.val = Int32Value.parse(String(value.level));
    numPr.appendChild(ilvl);

    const numId = new NumberingId();
    numId.val = Int32Value.parse(String(value.id));
    numPr.appendChild(numId);

    // Insert numPr into pPr: after pStyle (schema order) or as first child
    const firstPpChild = pPr.children.at(0);
    if (firstPpChild === undefined) {
      pPr.appendChild(numPr);
    } else if (firstPpChild instanceof ParagraphStyleId) {
      // pStyle present: insert numPr after it
      const second = pPr.children.at(1);
      if (second === undefined) pPr.appendChild(numPr);
      else pPr.children.insertBefore(numPr, second);
    } else {
      // No pStyle: insert numPr as first child
      pPr.children.insertBefore(numPr, firstPpChild);
    }
  },
});
