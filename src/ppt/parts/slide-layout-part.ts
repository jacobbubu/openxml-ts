/**
 * PresentationML SlideLayout 的 typed Part（part-level 关系 type 为 `.../slideLayout`）。
 *
 * 除 typed root（`<p:sldLayout>`）外解出 layout 自己的 part-level 关系：
 * - SlideMasterPart：layout 引用的母版（effective 继承链中间层，Story-4.6 用）。
 *
 * @see DocumentFormat.OpenXml.Packaging.SlideLayoutPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { SlideLayout } from "../generated/slide-layout.js";
import { resolveSinglePart } from "./_helpers.js";
import { SlideMasterPart } from "./slide-master-part.js";

export class SlideLayoutPart extends TypedXmlPart<SlideLayout> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";

  private _slideMasterPart: SlideMasterPart | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, SlideLayout);
  }

  /** `<p:sldLayout>` 根元素。 */
  get slideLayout(): SlideLayout {
    return this.root;
  }

  set slideLayout(value: SlideLayout) {
    this.root = value;
  }

  /** 关联的 SlideMaster part；layout 不引用 master 时 undefined（异常但容错）。 */
  get slideMasterPart(): SlideMasterPart | undefined {
    if (this._slideMasterPart !== undefined) {
      return this._slideMasterPart ?? undefined;
    }
    const resolved = resolveSinglePart(this.part, this.pkg, this.registry, SlideMasterPart);
    this._slideMasterPart = resolved ?? null;
    return resolved;
  }
}
