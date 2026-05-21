/**
 * PresentationML Slide 的 typed Part（part-level 关系 type 为 `.../slide`）。
 *
 * 除 typed root（`<p:sld>`）之外，再解出 slide 自己的 part-level 关系：
 * - SlideLayoutPart：单层版式（Story-4.6 effective 继承的中间层）；
 * - NotesSlidePart：可选的「演讲者备注」slide；
 * - ThemePart：可选 theme override（Story-4.6 effective* resolver 用）。
 *
 * 三者 lazy 加载：首次访问时解关系 + 实例化 typed Part；重复访问返回同一引用。
 * effective* getter（color/font/format scheme）沿 slide → layout → master → theme
 * 链查找，命中即返回，结果在本 Part 缓存；显式 invalidateEffectiveCache() 清。
 *
 * @see DocumentFormat.OpenXml.Packaging.SlidePart
 */

import type { ColorScheme } from "../../drawing/generated/color-scheme.js";
import type { FontScheme } from "../../drawing/generated/font-scheme.js";
import type { FormatScheme } from "../../drawing/generated/format-scheme.js";
import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { ThemePart } from "../../parts/theme-part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import {
  resolveEffectiveColorScheme,
  resolveEffectiveFontScheme,
  resolveEffectiveFormatScheme,
} from "../effective-resolver.js";
import { Slide } from "../generated/slide.js";
import { resolveSinglePart } from "./_helpers.js";
import { NotesSlidePart } from "./notes-slide-part.js";
import { SlideLayoutPart } from "./slide-layout-part.js";

export class SlidePart extends TypedXmlPart<Slide> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";

  /** `slideLayoutPart` 解析结果缓存——`null` 表示无关系（已查过），`undefined` 表示未查。 */
  private _slideLayoutPart: SlideLayoutPart | null | undefined;
  /** `notesSlidePart` 解析结果缓存（语义同上）。 */
  private _notesSlidePart: NotesSlidePart | null | undefined;
  /** `themePart` 解析结果缓存。Slide 直接挂 theme 是 theme-override 场景。 */
  private _themePart: ThemePart | null | undefined;
  /** effective* 缓存。三档独立 lazy。 */
  private _effectiveColorScheme: ColorScheme | null | undefined;
  private _effectiveFontScheme: FontScheme | null | undefined;
  private _effectiveFormatScheme: FormatScheme | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    /** 暴露给 _helpers + effective-resolver；门面外不依赖。 */
    readonly pkg: IPackage,
  ) {
    super(part, registry, Slide);
  }

  /** `<p:sld>` 根元素。 */
  get slide(): Slide {
    return this.root;
  }

  set slide(value: Slide) {
    this.root = value;
  }

  /** 关联的 SlideLayout part；slide 没引用版式时为 undefined。 */
  get slideLayoutPart(): SlideLayoutPart | undefined {
    if (this._slideLayoutPart !== undefined) {
      return this._slideLayoutPart ?? undefined;
    }
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      SlideLayoutPart,
      this.mcSettings,
    );
    this._slideLayoutPart = resolved ?? null;
    return resolved;
  }

  /** 关联的 NotesSlide part；slide 没演讲者备注时为 undefined。 */
  get notesSlidePart(): NotesSlidePart | undefined {
    if (this._notesSlidePart !== undefined) {
      return this._notesSlidePart ?? undefined;
    }
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      NotesSlidePart,
      this.mcSettings,
    );
    this._notesSlidePart = resolved ?? null;
    return resolved;
  }

  /**
   * Slide 自己直接挂的 ThemePart（theme override 场景）。多数模板无此关系 → undefined。
   * Story-4.6 effective* resolver 用：链路第一档命中即返回。
   */
  get themePart(): ThemePart | undefined {
    if (this._themePart !== undefined) {
      return this._themePart ?? undefined;
    }
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      ThemePart,
      this.mcSettings,
    );
    this._themePart = resolved ?? null;
    return resolved;
  }

  /**
   * 沿 slide → layout → master → theme 链解析有效 color scheme。
   * 命中即返回；全程无命中 undefined（含 master 无 theme / 链路深度越界 / 闭环）。
   */
  get effectiveColorScheme(): ColorScheme | undefined {
    if (this._effectiveColorScheme !== undefined) {
      return this._effectiveColorScheme ?? undefined;
    }
    const resolved = resolveEffectiveColorScheme(this);
    this._effectiveColorScheme = resolved ?? null;
    return resolved;
  }

  get effectiveFontScheme(): FontScheme | undefined {
    if (this._effectiveFontScheme !== undefined) {
      return this._effectiveFontScheme ?? undefined;
    }
    const resolved = resolveEffectiveFontScheme(this);
    this._effectiveFontScheme = resolved ?? null;
    return resolved;
  }

  get effectiveFormatScheme(): FormatScheme | undefined {
    if (this._effectiveFormatScheme !== undefined) {
      return this._effectiveFormatScheme ?? undefined;
    }
    const resolved = resolveEffectiveFormatScheme(this);
    this._effectiveFormatScheme = resolved ?? null;
    return resolved;
  }

  /**
   * 显式失效 effective* 缓存。
   * 用户在 Layout / Master / Theme typed 树上做出会影响 scheme 解析的修改后调用
   * （目前 SDK 无法可靠自动检测跨 Part mutation；ADR-023 接受用户显式失效）。
   */
  invalidateEffectiveCache(): void {
    this._effectiveColorScheme = undefined;
    this._effectiveFontScheme = undefined;
    this._effectiveFormatScheme = undefined;
  }
}
