// openxml-ts 便捷扩展层（非 .NET SDK 原生 API）。详见 docs/convenience-layer.md。
/**
 * Epic-43：Word Paragraph 分页控制访问器 mixin。
 *
 * 给 Paragraph.prototype 挂三个 OnOff 三态字段：
 *
 *   p.keepNext = true                // 与下一段同页
 *   p.keepLines = true               // 本段所有行同页
 *   p.pageBreakBefore = true         // 本段前强制分页
 *   <field> = false                  // 显式取消（写 val="false"）
 *   <field> = undefined              // 删 OnOff 子（继承样式）
 *
 * 与 Run 格式 mixin（Epic-38）同语义；pPr 不存在自动创建并作为 Paragraph 第一个 child。
 */

import { BooleanValue, type OpenXmlElement } from "../../element/index.js";
import { KeepLines } from "../generated/keep-lines.js";
import { KeepNext } from "../generated/keep-next.js";
import { PageBreakBefore } from "../generated/page-break-before.js";
import { ParagraphProperties } from "../generated/paragraph-properties.js";
import { Paragraph } from "../generated/paragraph.js";

declare module "../generated/paragraph.js" {
  interface Paragraph {
    /** 与下一段保持在同页。 */
    keepNext: boolean | undefined;
    /** 本段所有行保持在同页。 */
    keepLines: boolean | undefined;
    /** 本段前强制分页。 */
    pageBreakBefore: boolean | undefined;
  }
}

type OnOffElement = OpenXmlElement & { val: BooleanValue | undefined };

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

function readOnOff<T extends OnOffElement>(
  pPr: ParagraphProperties | undefined,
  Cls: new () => T,
): boolean | undefined {
  const el = pPr?.firstChild(Cls);
  if (el === undefined) return undefined;
  const v = el.val;
  if (v === undefined) return true;
  return v.value;
}

function writeOnOff<T extends OnOffElement>(
  p: Paragraph,
  Cls: new () => T,
  value: boolean | undefined,
): void {
  const pPr = ensurePPr(p, value === undefined);
  if (pPr === undefined) return;
  let el = pPr.firstChild(Cls);
  if (value === undefined) {
    if (el !== undefined) pPr.children.remove(el);
    return;
  }
  if (el === undefined) {
    el = new Cls();
    pPr.appendChild(el);
  }
  el.val = value ? undefined : new BooleanValue(false);
}

Object.defineProperty(Paragraph.prototype, "keepNext", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): boolean | undefined {
    return readOnOff(this.firstChild(ParagraphProperties), KeepNext);
  },
  set(this: Paragraph, value: boolean | undefined): void {
    writeOnOff(this, KeepNext, value);
  },
});

Object.defineProperty(Paragraph.prototype, "keepLines", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): boolean | undefined {
    return readOnOff(this.firstChild(ParagraphProperties), KeepLines);
  },
  set(this: Paragraph, value: boolean | undefined): void {
    writeOnOff(this, KeepLines, value);
  },
});

Object.defineProperty(Paragraph.prototype, "pageBreakBefore", {
  configurable: false,
  enumerable: false,
  get(this: Paragraph): boolean | undefined {
    return readOnOff(this.firstChild(ParagraphProperties), PageBreakBefore);
  },
  set(this: Paragraph, value: boolean | undefined): void {
    writeOnOff(this, PageBreakBefore, value);
  },
});
