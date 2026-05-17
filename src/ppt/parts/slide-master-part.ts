/**
 * PresentationML SlideMaster 的 typed Part（part-level 关系 type 为 `.../slideMaster`）。
 *
 * SlideMaster 是 PowerPoint 三级版式继承（Slide → Layout → Master → Theme）的
 * 第三级，承载默认字体/配色/格式以及 themePart + 一组 SlideLayoutPart。
 *
 * @see DocumentFormat.OpenXml.Packaging.SlideMasterPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { ThemePart } from "../../parts/theme-part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { SlideMaster } from "../generated/slide-master.js";
import { resolveManyParts, resolveSinglePart } from "./_helpers.js";
import { SlideLayoutPart } from "./slide-layout-part.js";

export class SlideMasterPart extends TypedXmlPart<SlideMaster> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml";

  private _themePart: ThemePart | null | undefined;
  private _slideLayoutParts: SlideLayoutPart[] | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, SlideMaster);
  }

  /** `<p:sldMaster>` 根元素。 */
  get slideMaster(): SlideMaster {
    return this.root;
  }

  set slideMaster(value: SlideMaster) {
    this.root = value;
  }

  /** 关联的 Theme part；master 不引用 theme 时 undefined（理论上 PowerPoint 不允许，但容错）。 */
  get themePart(): ThemePart | undefined {
    if (this._themePart !== undefined) {
      return this._themePart ?? undefined;
    }
    const resolved = resolveSinglePart(this.part, this.pkg, this.registry, ThemePart);
    this._themePart = resolved ?? null;
    return resolved;
  }

  /**
   * 直接受本 master 管的所有 SlideLayoutPart，按 part-level 关系遍历顺序。
   *
   * 关系顺序通常匹配 PowerPoint UI 中「新建幻灯片」下拉的 layout 顺序，但不保证；
   * 严格的 layout 排序由 Architecture §5 标记为 out-of-scope。
   */
  get slideLayoutParts(): readonly SlideLayoutPart[] {
    if (this._slideLayoutParts !== undefined) return this._slideLayoutParts;
    const out = resolveManyParts(this.part, this.pkg, this.registry, SlideLayoutPart);
    this._slideLayoutParts = out;
    return out;
  }
}
