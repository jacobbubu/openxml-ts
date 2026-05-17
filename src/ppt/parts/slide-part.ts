/**
 * PresentationML Slide 的 typed Part（part-level 关系 type 为 `.../slide`）。
 *
 * 除 typed root（`<p:sld>`）之外，再解出 slide 自己的 part-level 关系：
 * - SlideLayoutPart：单层版式（Story-4.6 effective 继承的中间层）；
 * - NotesSlidePart：可选的「演讲者备注」slide。
 *
 * 两者 lazy 加载：首次访问时解关系 + 实例化 typed Part；重复访问返回同一引用。
 *
 * @see DocumentFormat.OpenXml.Packaging.SlidePart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Slide } from "../generated/slide.js";
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

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
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
    const resolved = this.resolveSinglePartLevel(SlideLayoutPart);
    this._slideLayoutPart = resolved ?? null;
    return resolved;
  }

  /** 关联的 NotesSlide part；slide 没演讲者备注时为 undefined。 */
  get notesSlidePart(): NotesSlidePart | undefined {
    if (this._notesSlidePart !== undefined) {
      return this._notesSlidePart ?? undefined;
    }
    const resolved = this.resolveSinglePartLevel(NotesSlidePart);
    this._notesSlidePart = resolved ?? null;
    return resolved;
  }

  /** 从 slide 自己的 part-level 关系中找 type 匹配的单个 typed Part；无则返回 undefined。 */
  private resolveSinglePartLevel<T>(Ctor: PartCtor<T>): T | undefined {
    for (const rel of this.part.relationships) {
      if (rel.type !== Ctor.relationshipType || rel.targetMode !== "internal") continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      return new Ctor(this.pkg.getPart(targetUri), this.registry);
    }
    return undefined;
  }
}

interface PartCtor<T> {
  new (part: IPackagePart, registry: ElementRegistry): T;
  readonly relationshipType: string;
}
