/**
 * Epic-46：Word Style 创建 helper。
 *
 * 提供 `createParagraphStyle` 和 `createCharacterStyle` 两个便捷函数，
 * 将 `<w:style type="paragraph|character" ...>` 完整树追加到 StylesPart。
 *
 * 与 Epic-40/41 的消费侧（Paragraph.styleId / Run.styleId）对应——本模块补全创建侧。
 */

import { StringValue } from "../element/index.js";
import { OpenXmlPackageError } from "../packaging/errors.js";
import { BasedOn } from "./generated/based-on.js";
import { Bold } from "./generated/bold.js";
import { Color } from "./generated/color.js";
import { FontSize } from "./generated/font-size.js";
import { Italic } from "./generated/italic.js";
import { Justification } from "./generated/justification.js";
import { NextParagraphStyle } from "./generated/next-paragraph-style.js";
import { StyleName } from "./generated/style-name.js";
import { StyleParagraphProperties } from "./generated/style-paragraph-properties.js";
import { StyleRunProperties } from "./generated/style-run-properties.js";
import { Style } from "./generated/style.js";
import type { StylesPart } from "./parts/styles-part.js";

/** 段落 / 字符样式共享的格式选项。 */
export interface StyleFormattingOptions {
  /** 加粗；true → 追加 `<w:b/>`。 */
  readonly bold?: boolean;
  /** 斜体；true → 追加 `<w:i/>`。 */
  readonly italic?: boolean;
  /**
   * 字号（半点，half-points）；如 24 = 12pt，32 = 16pt。
   * 对应 `<w:sz w:val="N"/>`。
   */
  readonly fontSizeHalfPoints?: number;
  /**
   * 文字颜色（6 位十六进制，不含 `#`），如 `"FF0000"` 为红色。
   * 对应 `<w:color w:val="RRGGBB"/>`。
   */
  readonly colorHex?: string;
}

/** `createParagraphStyle` 选项。 */
export interface ParagraphStyleOptions {
  /** 样式唯一 ID，如 `"Heading1"`。 */
  readonly styleId: string;
  /** 用户可见名称，如 `"heading 1"`。 */
  readonly name: string;
  /** 父样式 ID（basedOn）；可选。 */
  readonly basedOn?: string;
  /** 下一段落默认样式 ID（next）；可选。 */
  readonly next?: string;
  /** 段落 / 字符格式；可选。 */
  readonly formatting?: StyleFormattingOptions & {
    /** 段落对齐方式，对应 `<w:jc w:val="..."/>`。 */
    readonly alignment?: "left" | "center" | "right" | "both" | "distribute";
  };
}

/** `createCharacterStyle` 选项。 */
export interface CharacterStyleOptions {
  /** 样式唯一 ID，如 `"Strong"`。 */
  readonly styleId: string;
  /** 用户可见名称，如 `"strong"`。 */
  readonly name: string;
  /** 父样式 ID（basedOn）；可选。 */
  readonly basedOn?: string;
  /** 字符格式；可选。 */
  readonly formatting?: StyleFormattingOptions;
}

/**
 * 在 `stylesPart` 中创建一条 `type="paragraph"` 的样式条目，并返回新 `Style` 节点。
 *
 * @throws {OpenXmlPackageError} 当 `stylesPart.styles` 未初始化（code="BACKEND_ERROR"）
 * @throws {OpenXmlPackageError} 当 `styleId` 已存在于 styles 中（code="BACKEND_ERROR"）
 */
export function createParagraphStyle(stylesPart: StylesPart, opts: ParagraphStyleOptions): Style {
  const styles = assertStyles(stylesPart);
  assertUniqueStyleId(styles, opts.styleId);

  const style = new Style();
  style.type = StringValue.parse("paragraph");
  style.styleId = StringValue.parse(opts.styleId);

  // <w:name>
  const nameEl = new StyleName();
  nameEl.val = StringValue.parse(opts.name);
  style.appendChild(nameEl);

  // <w:basedOn>
  if (opts.basedOn !== undefined) {
    const basedOn = new BasedOn();
    basedOn.val = StringValue.parse(opts.basedOn);
    style.appendChild(basedOn);
  }

  // <w:next>
  if (opts.next !== undefined) {
    const next = new NextParagraphStyle();
    next.val = StringValue.parse(opts.next);
    style.appendChild(next);
  }

  // <w:pPr> — 段落属性（仅 alignment）
  const fmt = opts.formatting;
  if (fmt?.alignment !== undefined) {
    const pPr = new StyleParagraphProperties();
    const jc = new Justification();
    jc.val = StringValue.parse(fmt.alignment);
    pPr.appendChild(jc);
    style.appendChild(pPr);
  }

  // <w:rPr> — 字符格式
  const rPr = buildRunProperties(fmt);
  if (rPr !== undefined) {
    style.appendChild(rPr);
  }

  styles.appendChild(style);
  return style;
}

/**
 * 在 `stylesPart` 中创建一条 `type="character"` 的样式条目，并返回新 `Style` 节点。
 *
 * @throws {OpenXmlPackageError} 当 `stylesPart.styles` 未初始化（code="BACKEND_ERROR"）
 * @throws {OpenXmlPackageError} 当 `styleId` 已存在于 styles 中（code="BACKEND_ERROR"）
 */
export function createCharacterStyle(stylesPart: StylesPart, opts: CharacterStyleOptions): Style {
  const styles = assertStyles(stylesPart);
  assertUniqueStyleId(styles, opts.styleId);

  const style = new Style();
  style.type = StringValue.parse("character");
  style.styleId = StringValue.parse(opts.styleId);

  // <w:name>
  const nameEl = new StyleName();
  nameEl.val = StringValue.parse(opts.name);
  style.appendChild(nameEl);

  // <w:basedOn>
  if (opts.basedOn !== undefined) {
    const basedOn = new BasedOn();
    basedOn.val = StringValue.parse(opts.basedOn);
    style.appendChild(basedOn);
  }

  // <w:rPr> — 字符格式（字符样式无 pPr）
  const rPr = buildRunProperties(opts.formatting);
  if (rPr !== undefined) {
    style.appendChild(rPr);
  }

  styles.appendChild(style);
  return style;
}

// ─── internal helpers ────────────────────────────────────────────────────────

import { Styles } from "./generated/styles.js";

function assertStyles(stylesPart: StylesPart): Styles {
  const styles = stylesPart.styles;
  if (!(styles instanceof Styles)) {
    throw new OpenXmlPackageError({
      code: "BACKEND_ERROR",
      message:
        "createParagraphStyle/createCharacterStyle: stylesPart.styles is not initialized — ensure the document was created or loaded correctly",
    });
  }
  return styles;
}

function assertUniqueStyleId(styles: Styles, styleId: string): void {
  for (const child of styles.children) {
    if (child instanceof Style && child.styleId?.toString() === styleId) {
      throw new OpenXmlPackageError({
        code: "BACKEND_ERROR",
        message: `createParagraphStyle/createCharacterStyle: styleId "${styleId}" already exists in this StylesPart`,
      });
    }
  }
}

/**
 * 根据格式选项构造 `<w:rPr>` 节点；若无任何格式设置返回 undefined。
 */
function buildRunProperties(
  fmt: StyleFormattingOptions | undefined,
): StyleRunProperties | undefined {
  if (fmt === undefined) return undefined;

  const { bold, italic, fontSizeHalfPoints, colorHex } = fmt;
  if (
    bold === undefined &&
    italic === undefined &&
    fontSizeHalfPoints === undefined &&
    colorHex === undefined
  ) {
    return undefined;
  }

  const rPr = new StyleRunProperties();

  if (bold === true) {
    rPr.appendChild(new Bold());
  }
  if (italic === true) {
    rPr.appendChild(new Italic());
  }
  if (fontSizeHalfPoints !== undefined) {
    const sz = new FontSize();
    sz.val = StringValue.parse(String(fontSizeHalfPoints));
    rPr.appendChild(sz);
  }
  if (colorHex !== undefined) {
    const color = new Color();
    color.val = StringValue.parse(colorHex);
    rPr.appendChild(color);
  }

  return rPr;
}
