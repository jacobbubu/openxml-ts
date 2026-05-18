/**
 * Story-11.2：Word 有效样式解析器单元测试。
 *
 * 纯内存构造 Styles 树，验证 4 个链路点全部生效：
 *  - 直接格式优先
 *  - pStyle / rStyle 引用
 *  - basedOn 链
 *  - docDefaults 兜底
 *
 * 也覆盖闭环 basedOn / 缺 styles 入参 / 多层链优先级。
 */

import { describe, expect, it } from "vitest";
import { StringValue } from "../../src/element/index.js";
import { BasedOn } from "../../src/word/generated/based-on.js";
import { DocDefaults } from "../../src/word/generated/doc-defaults.js";
import { ParagraphPropertiesDefault } from "../../src/word/generated/paragraph-properties-default.js";
import { RunPropertiesDefault } from "../../src/word/generated/run-properties-default.js";
import { StyleParagraphProperties } from "../../src/word/generated/style-paragraph-properties.js";
import { StyleRunProperties } from "../../src/word/generated/style-run-properties.js";
import {
  Bold,
  Color,
  Italic,
  Paragraph,
  ParagraphProperties,
  ParagraphStyleId,
  Run,
  RunProperties,
  RunStyle,
  Style,
  Styles,
  resolveEffectiveParagraphProperties,
  resolveEffectiveRunProperties,
} from "../../src/word/index.js";

function makeStyle(
  styleId: string,
  opts: {
    type?: "paragraph" | "character";
    basedOn?: string;
    ppr?: StyleParagraphProperties;
    rpr?: StyleRunProperties;
  } = {},
): Style {
  const s = new Style();
  s.styleId = StringValue.parse(styleId);
  if (opts.type !== undefined) s.type = StringValue.parse(opts.type);
  if (opts.basedOn !== undefined) {
    const b = new BasedOn();
    b.extendedAttributes.set("w:val", opts.basedOn);
    s.appendChild(b);
  }
  if (opts.ppr !== undefined) s.appendChild(opts.ppr);
  if (opts.rpr !== undefined) s.appendChild(opts.rpr);
  return s;
}

function makePStyleId(val: string): ParagraphStyleId {
  const p = new ParagraphStyleId();
  p.extendedAttributes.set("w:val", val);
  return p;
}

function makeRStyleId(val: string): RunStyle {
  const r = new RunStyle();
  r.extendedAttributes.set("w:val", val);
  return r;
}

describe("resolveEffectiveParagraphProperties（Story-11.2）", () => {
  it("无 styles 入参——只看直接格式", () => {
    const p = new Paragraph();
    const ppr = new ParagraphProperties();
    p.appendChild(ppr);
    const eff = resolveEffectiveParagraphProperties(p);
    expect(eff.depth).toBe(1);
    expect(eff.holders[0]).toBe(ppr);
  });

  it("段落自身无 pPr 也无 styles——返空链", () => {
    const eff = resolveEffectiveParagraphProperties(new Paragraph());
    expect(eff.depth).toBe(0);
  });

  it("通过 pStyle 命中段落样式的 StyleParagraphProperties", () => {
    const stylePpr = new StyleParagraphProperties();
    stylePpr.appendChild(new Italic());
    const styles = new Styles();
    styles.appendChild(makeStyle("Heading1", { type: "paragraph", ppr: stylePpr }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("Heading1"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.depth).toBe(2);
    expect(eff.has(Italic)).toBe(true);
  });

  it("basedOn 链——子样式无 Italic 时回退到父样式", () => {
    const parentPpr = new StyleParagraphProperties();
    parentPpr.appendChild(new Italic());
    const childPpr = new StyleParagraphProperties(); // 子样式什么都没塞

    const styles = new Styles();
    styles.appendChild(makeStyle("ParentStyle", { type: "paragraph", ppr: parentPpr }));
    styles.appendChild(
      makeStyle("ChildStyle", { type: "paragraph", basedOn: "ParentStyle", ppr: childPpr }),
    );

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("ChildStyle"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.has(Italic)).toBe(true);
  });

  it("闭环 basedOn 不抛——但仍返已经走过的链", () => {
    const ppr1 = new StyleParagraphProperties();
    ppr1.appendChild(new Italic());

    const styles = new Styles();
    styles.appendChild(makeStyle("S1", { type: "paragraph", basedOn: "S2", ppr: ppr1 }));
    styles.appendChild(makeStyle("S2", { type: "paragraph", basedOn: "S1" }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("S1"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.has(Italic)).toBe(true);
  });

  it("docDefaults 兜底——直接 + style 都没有时仍命中", () => {
    const defaultPpr = new ParagraphProperties();
    defaultPpr.appendChild(new Italic());
    const docDefaults = new DocDefaults();
    const pprDefault = new ParagraphPropertiesDefault();
    pprDefault.appendChild(defaultPpr);
    docDefaults.appendChild(pprDefault);

    const styles = new Styles();
    styles.appendChild(docDefaults);

    const eff = resolveEffectiveParagraphProperties(new Paragraph(), styles);
    expect(eff.has(Italic)).toBe(true);
  });

  it("优先级：直接格式 > Style > docDefaults", () => {
    // docDefaults 给一个 Italic；Style 给另一个；直接格式给第三个
    const docItalic = new Italic();
    const styleItalic = new Italic();
    const directItalic = new Italic();

    const defaultPpr = new ParagraphProperties();
    defaultPpr.appendChild(docItalic);
    const docDefaults = new DocDefaults();
    const pprDefault = new ParagraphPropertiesDefault();
    pprDefault.appendChild(defaultPpr);
    docDefaults.appendChild(pprDefault);

    const stylePpr = new StyleParagraphProperties();
    stylePpr.appendChild(styleItalic);

    const styles = new Styles();
    styles.appendChild(docDefaults);
    styles.appendChild(makeStyle("S", { type: "paragraph", ppr: stylePpr }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(directItalic);
    directPpr.appendChild(makePStyleId("S"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.get(Italic)).toBe(directItalic);
  });
});

describe("resolveEffectiveRunProperties（Story-11.2）", () => {
  it("直接 rPr 命中", () => {
    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(new Bold());
    r.appendChild(rpr);
    const eff = resolveEffectiveRunProperties(r);
    expect(eff.has(Bold)).toBe(true);
  });

  it("rStyle 命中字符样式", () => {
    const charRpr = new StyleRunProperties();
    charRpr.appendChild(new Bold());
    const styles = new Styles();
    styles.appendChild(makeStyle("Emphasis", { type: "character", rpr: charRpr }));

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(makeRStyleId("Emphasis"));
    r.appendChild(rpr);

    const eff = resolveEffectiveRunProperties(r, styles);
    expect(eff.has(Bold)).toBe(true);
  });

  it("父段落 pStyle 的 Style 的 rPr 也参与解析", () => {
    const paraRpr = new StyleRunProperties();
    paraRpr.appendChild(new Bold());
    const styles = new Styles();
    styles.appendChild(makeStyle("Heading1", { type: "paragraph", rpr: paraRpr }));

    const p = new Paragraph();
    const ppr = new ParagraphProperties();
    ppr.appendChild(makePStyleId("Heading1"));
    p.appendChild(ppr);
    const r = new Run();
    p.appendChild(r);

    const eff = resolveEffectiveRunProperties(r, styles);
    expect(eff.has(Bold)).toBe(true);
  });

  it("docDefaults rPrDefault 兜底", () => {
    const defaultRpr = new RunProperties();
    defaultRpr.appendChild(new Bold());
    const docDefaults = new DocDefaults();
    const rprDefault = new RunPropertiesDefault();
    rprDefault.appendChild(defaultRpr);
    docDefaults.appendChild(rprDefault);

    const styles = new Styles();
    styles.appendChild(docDefaults);

    const eff = resolveEffectiveRunProperties(new Run(), styles);
    expect(eff.has(Bold)).toBe(true);
  });

  it("rStyle 优先于父段落 pStyle 的 rPr", () => {
    const charRpr = new StyleRunProperties();
    const charBold = new Bold();
    charRpr.appendChild(charBold);

    const paraRpr = new StyleRunProperties();
    const paraBold = new Bold();
    paraRpr.appendChild(paraBold);

    const styles = new Styles();
    styles.appendChild(makeStyle("CharStyle", { type: "character", rpr: charRpr }));
    styles.appendChild(makeStyle("ParaStyle", { type: "paragraph", rpr: paraRpr }));

    const p = new Paragraph();
    const ppr = new ParagraphProperties();
    ppr.appendChild(makePStyleId("ParaStyle"));
    p.appendChild(ppr);

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(makeRStyleId("CharStyle"));
    r.appendChild(rpr);
    p.appendChild(r);

    const eff = resolveEffectiveRunProperties(r, styles);
    expect(eff.get(Bold)).toBe(charBold);
  });

  it("混合多属性：Bold 来自直接，Color 来自字符样式", () => {
    const charRpr = new StyleRunProperties();
    const charColor = new Color();
    charColor.extendedAttributes.set("w:val", "FF0000");
    charRpr.appendChild(charColor);

    const styles = new Styles();
    styles.appendChild(makeStyle("CharStyle", { type: "character", rpr: charRpr }));

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(new Bold());
    rpr.appendChild(makeRStyleId("CharStyle"));
    r.appendChild(rpr);

    const eff = resolveEffectiveRunProperties(r, styles);
    expect(eff.has(Bold)).toBe(true);
    expect(eff.get(Color)).toBe(charColor);
  });
});
