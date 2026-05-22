/**
 * Story-11.2：Word 段落 / 文本运行有效样式解析器。
 *
 * 给定一个 `Paragraph` 或 `Run`，沿样式链查找各 schema 属性的「实际生效值」。
 * 链路（最高优先级在最前）：
 *
 * 段落 (`resolveEffectiveParagraphProperties`)：
 *   1. 段落自身的 `<w:pPr>` 直接格式
 *   2. `<w:pPr><w:pStyle w:val="..."/>` 引用的 `<w:style>` 的 `<w:pPr>`
 *   3. 沿 `<w:basedOn>` 链向上递归（深度上限 8，闭环防御）
 *   4. `<w:styles><w:docDefaults><w:pPrDefault><w:pPr>`
 *
 * 文本运行 (`resolveEffectiveRunProperties`)：
 *   1. Run 自身的 `<w:rPr>`
 *   2. `<w:rPr><w:rStyle w:val="..."/>` 引用的字符 `<w:style>` 的 `<w:rPr>` + basedOn 链
 *   3. 所在 Paragraph 的 `<w:pPr><w:pStyle w:val="..."/>` 引用的段落 `<w:style>` 的
 *      `<w:rPr>` + basedOn 链（覆盖「段落级默认字符样式」语义）
 *   4. `<w:styles><w:docDefaults><w:rPrDefault><w:rPr>`
 *
 * **注意**：链路里只接受 Style 上挂的 `StyleParagraphProperties` /
 * `StyleRunProperties`、以及段落 / Run 自身挂的 `ParagraphProperties` /
 * `RunProperties`、以及 default holders 里挂的 `ParagraphProperties` /
 * `RunProperties`——所有这些都派生自 OpenXmlCompositeElement，下面统一抽象为
 * `OpenXmlCompositeElement` 处理。
 *
 * 返回的是一个 `EffectiveProperties` **视图**（不挂回原树）：调用方用
 * `.get(Bold)` / `.get(FontSize)` / `.has(Italic)` 查具体子元素。视图持有的
 * 是原节点的引用，**不要 mutate**——如要修改样式请直接改 Style XML 然后重新
 * 解析。视图设计参考 ADR-023：effective* getter 不动原树。
 *
 * 限制 / 已知差距（落到 follow-up）：
 * - 段落样式 `<w:link w:val="…">` 指向的「链接字符样式」未参与 Run 解析链
 *   （ECMA-376-1 §17.7.4.5）。常规场景仍走步骤 3 拿段落 Style 的 rPr，
 *   覆盖 80% 视觉效果；要做到字节级 Word 解析需要补 link 支持。
 * - `<w:numPr>` 引用的编号样式 (`<w:abstractNum>`/`<w:lvl>`) 的 paragraph 属性
 *   未参与解析（独立 Epic 处理 numbering）。
 * - `<w:tblStyle>` 表格样式不在本 Epic 范围。
 */

import type { ElementCtor } from "../element/element.js";
import type { OpenXmlCompositeElement, OpenXmlElement } from "../element/index.js";
import { BasedOn } from "./generated/based-on.js";
import { DocDefaults } from "./generated/doc-defaults.js";
import { ParagraphPropertiesDefault } from "./generated/paragraph-properties-default.js";
import { ParagraphProperties } from "./generated/paragraph-properties.js";
import { ParagraphStyleId } from "./generated/paragraph-style-id.js";
import { Paragraph } from "./generated/paragraph.js";
import { RunPropertiesDefault } from "./generated/run-properties-default.js";
import { RunProperties } from "./generated/run-properties.js";
import { RunStyle } from "./generated/run-style.js";
import type { Run } from "./generated/run.js";
import { StyleParagraphProperties } from "./generated/style-paragraph-properties.js";
import { StyleRunProperties } from "./generated/style-run-properties.js";
import { Style } from "./generated/style.js";
import type { Styles } from "./generated/styles.js";

/** basedOn 递归上限——闭环 / 病态 fixture 不抛错。 */
const MAX_BASED_ON_DEPTH = 8;

/**
 * 「合并后的属性视图」。持有按优先级排好的多个 holder（Composite element），
 * `get(Ctor)` 返第一个有匹配子元素的 holder 的对应子；视图不挂回原树。
 */
export class EffectiveProperties {
  constructor(private readonly chain: readonly OpenXmlCompositeElement[]) {}

  /** 链上第一个出现的指定类型子元素；都没命中返 `undefined`。 */
  get<T extends OpenXmlElement>(ctor: ElementCtor<T>): T | undefined {
    for (const holder of this.chain) {
      const child = holder.firstChild(ctor);
      if (child !== undefined) return child;
    }
    return undefined;
  }

  /** 是否存在指定类型的有效子元素。 */
  has(ctor: ElementCtor): boolean {
    return this.get(ctor) !== undefined;
  }

  /** 链中 holder 个数——debug / 测试断言用。 */
  get depth(): number {
    return this.chain.length;
  }

  /** 链上原始 holder 引用列表（**只读**）。 */
  get holders(): readonly OpenXmlCompositeElement[] {
    return this.chain;
  }
}

/**
 * 对一个段落解析有效 `pPr`。`styles` 可省——省时退化为只看直接格式。
 *
 * 入参 `styles` 直接接收 `Styles` 根元素（来自 `stylesPart.styles`），便于
 * 单元测试纯内存构造。
 */
export function resolveEffectiveParagraphProperties(
  p: Paragraph,
  styles?: Styles,
): EffectiveProperties {
  const chain: OpenXmlCompositeElement[] = [];
  const directPpr = p.firstChild(ParagraphProperties);
  if (directPpr !== undefined) chain.push(directPpr);

  if (styles !== undefined) {
    const styleId = directPpr?.firstChild(ParagraphStyleId)?.val?.toString();
    if (styleId !== undefined) {
      collectStylePPrChain(styles, styleId, chain);
    }
    const docDefaultPpr = findDocDefaultParagraphProperties(styles);
    if (docDefaultPpr !== undefined) chain.push(docDefaultPpr);
  }

  return new EffectiveProperties(chain);
}

/**
 * 对一个 Run 解析有效 `rPr`。`styles` 可省。
 */
export function resolveEffectiveRunProperties(r: Run, styles?: Styles): EffectiveProperties {
  const chain: OpenXmlCompositeElement[] = [];
  const directRpr = r.firstChild(RunProperties);
  if (directRpr !== undefined) chain.push(directRpr);

  if (styles !== undefined) {
    const charStyleId = directRpr?.firstChild(RunStyle)?.val?.toString();
    if (charStyleId !== undefined) {
      collectStyleRPrChain(styles, charStyleId, chain);
    }

    // Run 的父 Paragraph 的 pStyle 也参与 rPr 解析（段落样式自带字符默认）
    const parentParagraph = findAncestorParagraph(r);
    if (parentParagraph !== undefined) {
      const paraStyleId = parentParagraph
        .firstChild(ParagraphProperties)
        ?.firstChild(ParagraphStyleId)
        ?.val?.toString();
      if (paraStyleId !== undefined) {
        collectStyleRPrChain(styles, paraStyleId, chain);
      }
    }

    const docDefaultRpr = findDocDefaultRunProperties(styles);
    if (docDefaultRpr !== undefined) chain.push(docDefaultRpr);
  }

  return new EffectiveProperties(chain);
}

// ─── 内部辅助 ─────────────────────────────────────────────────────────────────

function collectStylePPrChain(
  styles: Styles,
  styleId: string,
  out: OpenXmlCompositeElement[],
): void {
  const visited = new Set<string>();
  let currentId: string | undefined = styleId;
  let depth = 0;
  while (currentId !== undefined && depth < MAX_BASED_ON_DEPTH) {
    if (visited.has(currentId)) return; // 闭环防御
    visited.add(currentId);
    depth += 1;
    const style = findStyleById(styles, currentId);
    if (style === undefined) return;
    const ppr = style.firstChild(StyleParagraphProperties);
    if (ppr !== undefined) out.push(ppr);
    currentId = style.firstChild(BasedOn)?.val?.toString();
  }
}

function collectStyleRPrChain(
  styles: Styles,
  styleId: string,
  out: OpenXmlCompositeElement[],
): void {
  const visited = new Set<string>();
  let currentId: string | undefined = styleId;
  let depth = 0;
  while (currentId !== undefined && depth < MAX_BASED_ON_DEPTH) {
    if (visited.has(currentId)) return;
    visited.add(currentId);
    depth += 1;
    const style = findStyleById(styles, currentId);
    if (style === undefined) return;
    const rpr = style.firstChild(StyleRunProperties);
    if (rpr !== undefined) out.push(rpr);
    currentId = style.firstChild(BasedOn)?.val?.toString();
  }
}

function findStyleById(styles: Styles, styleId: string): Style | undefined {
  for (const child of styles.children) {
    if (child instanceof Style && child.styleId?.toString() === styleId) return child;
  }
  return undefined;
}

function findDocDefaultParagraphProperties(styles: Styles): ParagraphProperties | undefined {
  const dd = styles.firstChild(DocDefaults);
  return dd?.firstChild(ParagraphPropertiesDefault)?.firstChild(ParagraphProperties);
}

function findDocDefaultRunProperties(styles: Styles): RunProperties | undefined {
  const dd = styles.firstChild(DocDefaults);
  return dd?.firstChild(RunPropertiesDefault)?.firstChild(RunProperties);
}

function findAncestorParagraph(start: OpenXmlElement): Paragraph | undefined {
  let cur: OpenXmlElement | undefined = start.parent;
  while (cur !== undefined) {
    if (cur instanceof Paragraph) return cur;
    cur = cur.parent;
  }
  return undefined;
}
