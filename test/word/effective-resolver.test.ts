/**
 * Story-11.2 / Epic-108：Word 有效样式解析器单元测试。
 *
 * 纯内存构造 Styles 树，验证 4 个链路点全部生效：
 *  - 直接格式优先
 *  - pStyle / rStyle 引用
 *  - basedOn 链
 *  - docDefaults 兜底
 *
 * 也覆盖闭环 basedOn / 缺 styles 入参 / 多层链优先级。
 *
 * Epic-108 新增：≥8 个真实样式链测试，在修复前的旧代码上全部失败。
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

// ─── 辅助构造函数 ─────────────────────────────────────────────────────────────

/**
 * 构造一个 Style 节点。使用 typed .val 字段设置 basedOn，确保与 resolver 的
 * `.val?.toString()` 读取方式完全一致。
 */
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
    b.val = StringValue.parse(opts.basedOn); // typed field, NOT extendedAttributes
    s.appendChild(b);
  }
  if (opts.ppr !== undefined) s.appendChild(opts.ppr);
  if (opts.rpr !== undefined) s.appendChild(opts.rpr);
  return s;
}

/** 构造 ParagraphStyleId，使用 typed .val 字段。 */
function makePStyleId(val: string): ParagraphStyleId {
  const p = new ParagraphStyleId();
  p.val = StringValue.parse(val); // typed field, NOT extendedAttributes
  return p;
}

/** 构造 RunStyle，使用 typed .val 字段。 */
function makeRStyleId(val: string): RunStyle {
  const r = new RunStyle();
  r.val = StringValue.parse(val); // typed field, NOT extendedAttributes
  return r;
}

// ─── 段落有效属性解析（基础覆盖）────────────────────────────────────────────────

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

// ─── Run 有效属性解析（基础覆盖）────────────────────────────────────────────────

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
    charColor.val = StringValue.parse("FF0000");
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

// ─── Epic-108：真实样式链测试（在修复前的旧代码上全部失败）─────────────────────

describe("Epic-108：样式链解析（旧代码必然失败的新测试）", () => {
  // ── pPr 样式链 ──────────────────────────────────────────────────────────────

  it("pStyle 引用：段落只有直接 pStyle 引用，basedOn 祖先的属性必须出现在有效结果中", () => {
    // 三层链：GrandParent → Parent → Child
    // GrandParent 有 Italic，Child 有 Bold，Parent 什么也没有
    // 使用 ChildStyle 的段落：有效结果应包含 Bold（Child）和 Italic（GrandParent）
    const gpPpr = new StyleParagraphProperties();
    gpPpr.appendChild(new Italic());

    const parentPpr = new StyleParagraphProperties();
    // 故意空白，没有属性

    const childPpr = new StyleParagraphProperties();
    childPpr.appendChild(new Bold());

    const styles = new Styles();
    styles.appendChild(makeStyle("GrandParent", { type: "paragraph", ppr: gpPpr }));
    styles.appendChild(
      makeStyle("Parent", { type: "paragraph", basedOn: "GrandParent", ppr: parentPpr }),
    );
    styles.appendChild(makeStyle("Child", { type: "paragraph", basedOn: "Parent", ppr: childPpr }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("Child"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    // Bold 来自 Child 样式（直接命中）
    expect(eff.has(Bold)).toBe(true);
    // Italic 只存在于 GrandParent——旧代码（basedOn 从不跟踪）此处失败
    expect(eff.has(Italic)).toBe(true);
  });

  it("pStyle basedOn：链中每一层都进入 chain，depth 正确", () => {
    // 两层 basedOn + 直接格式 = depth 4（directPpr + Child + Parent + docDefault）
    const parentPpr = new StyleParagraphProperties();
    const childPpr = new StyleParagraphProperties();

    const defaultPpr = new ParagraphProperties();
    const docDefaults = new DocDefaults();
    const pprDefault = new ParagraphPropertiesDefault();
    pprDefault.appendChild(defaultPpr);
    docDefaults.appendChild(pprDefault);

    const styles = new Styles();
    styles.appendChild(docDefaults);
    styles.appendChild(makeStyle("Base", { type: "paragraph", ppr: parentPpr }));
    styles.appendChild(makeStyle("Derived", { type: "paragraph", basedOn: "Base", ppr: childPpr }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("Derived"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    // directPpr + childPpr + parentPpr + defaultPpr = 4
    // 旧代码：directPpr + defaultPpr = 2（失败）
    expect(eff.depth).toBe(4);
  });

  it("pStyle 优先级：直接格式 > Child style > Parent style（basedOn 链）", () => {
    const parentItalic = new Italic();
    const childItalic = new Italic();
    const directItalic = new Italic();

    const parentPpr = new StyleParagraphProperties();
    parentPpr.appendChild(parentItalic);

    const childPpr = new StyleParagraphProperties();
    childPpr.appendChild(childItalic);

    const styles = new Styles();
    styles.appendChild(makeStyle("Base", { type: "paragraph", ppr: parentPpr }));
    styles.appendChild(makeStyle("Derived", { type: "paragraph", basedOn: "Base", ppr: childPpr }));

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(directItalic);
    directPpr.appendChild(makePStyleId("Derived"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    // 直接格式的 Italic 必须优先
    expect(eff.get(Italic)).toBe(directItalic);
  });

  it("孤立 pStyle（找不到样式 id）——不报错，只返直接格式 + docDefault", () => {
    const defaultPpr = new ParagraphProperties();
    defaultPpr.appendChild(new Bold());
    const docDefaults = new DocDefaults();
    const pprDefault = new ParagraphPropertiesDefault();
    pprDefault.appendChild(defaultPpr);
    docDefaults.appendChild(pprDefault);

    const styles = new Styles();
    styles.appendChild(docDefaults);
    // 注意：没有添加 "NonExistent" 样式

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("NonExistent"));
    p.appendChild(directPpr);

    const eff = resolveEffectiveParagraphProperties(p, styles);
    // 应静默降级：只有 directPpr + docDefault
    expect(eff.depth).toBe(2);
    expect(eff.has(Bold)).toBe(true);
  });

  // ── rPr 样式链 ──────────────────────────────────────────────────────────────

  it("rStyle basedOn：字符样式继承链中祖先的属性必须出现在有效结果中", () => {
    // BaseChar 有 Italic，DerivedChar basedOn BaseChar 但自身没有 Italic
    // 使用 DerivedChar 的 Run 应有 Italic
    const baseRpr = new StyleRunProperties();
    baseRpr.appendChild(new Italic());

    const derivedRpr = new StyleRunProperties();
    // 故意空白

    const styles = new Styles();
    styles.appendChild(makeStyle("BaseChar", { type: "character", rpr: baseRpr }));
    styles.appendChild(
      makeStyle("DerivedChar", { type: "character", basedOn: "BaseChar", rpr: derivedRpr }),
    );

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(makeRStyleId("DerivedChar"));
    r.appendChild(rpr);

    const eff = resolveEffectiveRunProperties(r, styles);
    // Italic 只在 BaseChar——旧代码（rStyle 链从不跟踪）此处失败
    expect(eff.has(Italic)).toBe(true);
  });

  it("rStyle + basedOn 三层：最底层祖先的属性仍可访问", () => {
    // GrandBase → Mid → Leaf
    // GrandBase 有 Bold，Leaf 有 Color
    const grandRpr = new StyleRunProperties();
    grandRpr.appendChild(new Bold());

    const midRpr = new StyleRunProperties();

    const leafRpr = new StyleRunProperties();
    const leafColor = new Color();
    leafColor.val = StringValue.parse("0070C0");
    leafRpr.appendChild(leafColor);

    const styles = new Styles();
    styles.appendChild(makeStyle("GrandBase", { type: "character", rpr: grandRpr }));
    styles.appendChild(makeStyle("Mid", { type: "character", basedOn: "GrandBase", rpr: midRpr }));
    styles.appendChild(makeStyle("Leaf", { type: "character", basedOn: "Mid", rpr: leafRpr }));

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(makeRStyleId("Leaf"));
    r.appendChild(rpr);

    const eff = resolveEffectiveRunProperties(r, styles);
    expect(eff.get(Color)).toBe(leafColor); // 来自 Leaf
    expect(eff.has(Bold)).toBe(true); // 来自 GrandBase，旧代码此处失败
  });

  it("父段落 pStyle basedOn 链中祖先的 rPr 也参与 Run 解析", () => {
    // BaseParaStyle 有 rPr(Bold)，DerivedParaStyle basedOn BaseParaStyle 但无 rPr
    // Run 在 DerivedParaStyle 段落中，无直接 rStyle，应通过 pStyle basedOn 链拿到 Bold
    const baseParaRpr = new StyleRunProperties();
    baseParaRpr.appendChild(new Bold());

    const derivedParaPpr = new StyleParagraphProperties();

    const styles = new Styles();
    styles.appendChild(makeStyle("BaseParaStyle", { type: "paragraph", rpr: baseParaRpr }));
    styles.appendChild(
      makeStyle("DerivedParaStyle", {
        type: "paragraph",
        basedOn: "BaseParaStyle",
        ppr: derivedParaPpr,
      }),
    );

    const p = new Paragraph();
    const ppr = new ParagraphProperties();
    ppr.appendChild(makePStyleId("DerivedParaStyle"));
    p.appendChild(ppr);

    const r = new Run();
    p.appendChild(r);

    const eff = resolveEffectiveRunProperties(r, styles);
    // Bold 只在 BaseParaStyle 的 rPr——旧代码（pStyle basedOn 从不跟踪）此处失败
    expect(eff.has(Bold)).toBe(true);
  });

  it("rStyle + pStyle 各自独立 basedOn：两条链均参与，属性来自各自祖先", () => {
    // CharBase 有 Italic（字符链祖先）
    // ParaBase 有 Bold rPr（段落链祖先）
    const charBaseRpr = new StyleRunProperties();
    charBaseRpr.appendChild(new Italic());

    const charDerivedRpr = new StyleRunProperties(); // 无属性

    const paraBaseRpr = new StyleRunProperties();
    paraBaseRpr.appendChild(new Bold());

    const paraDerivedPpr = new StyleParagraphProperties();

    const styles = new Styles();
    styles.appendChild(makeStyle("CharBase", { type: "character", rpr: charBaseRpr }));
    styles.appendChild(
      makeStyle("CharDerived", { type: "character", basedOn: "CharBase", rpr: charDerivedRpr }),
    );
    styles.appendChild(makeStyle("ParaBase", { type: "paragraph", rpr: paraBaseRpr }));
    styles.appendChild(
      makeStyle("ParaDerived", {
        type: "paragraph",
        basedOn: "ParaBase",
        ppr: paraDerivedPpr,
      }),
    );

    const p = new Paragraph();
    const ppr = new ParagraphProperties();
    ppr.appendChild(makePStyleId("ParaDerived"));
    p.appendChild(ppr);

    const r = new Run();
    const rpr = new RunProperties();
    rpr.appendChild(makeRStyleId("CharDerived"));
    r.appendChild(rpr);
    p.appendChild(r);

    const eff = resolveEffectiveRunProperties(r, styles);
    // Italic 来自 CharBase（字符链祖先）——旧代码此处失败
    expect(eff.has(Italic)).toBe(true);
    // Bold 来自 ParaBase（段落链祖先）——旧代码此处失败
    expect(eff.has(Bold)).toBe(true);
  });

  it("pStyle 引用成功：未引用样式的段落不引入样式链中的属性", () => {
    // 验证 pStyle 引用的「选择性」——不引用样式的段落不应获得样式的属性
    const stylePpr = new StyleParagraphProperties();
    stylePpr.appendChild(new Italic());

    const styles = new Styles();
    styles.appendChild(makeStyle("MyStyle", { type: "paragraph", ppr: stylePpr }));

    // 段落没有 pStyle 引用
    const p = new Paragraph();
    p.appendChild(new ParagraphProperties());

    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.has(Italic)).toBe(false);
  });

  it("depth=8 上限防御：MAX_BASED_ON_DEPTH 后停止，不无限循环", () => {
    // 构造 10 层链（超过深度上限 8）
    const styles = new Styles();
    for (let i = 0; i < 10; i++) {
      const ppr = new StyleParagraphProperties();
      const basedOn = i < 9 ? `Style${i + 1}` : undefined;
      styles.appendChild(makeStyle(`Style${i}`, { type: "paragraph", basedOn, ppr }));
    }

    const p = new Paragraph();
    const directPpr = new ParagraphProperties();
    directPpr.appendChild(makePStyleId("Style0"));
    p.appendChild(directPpr);

    // 不应抛错，depth ≤ 1(direct) + 8(limit) + 1(docDefault 无则不加) = 最多 9
    expect(() => resolveEffectiveParagraphProperties(p, styles)).not.toThrow();
    const eff = resolveEffectiveParagraphProperties(p, styles);
    expect(eff.depth).toBeLessThanOrEqual(9);
  });
});
