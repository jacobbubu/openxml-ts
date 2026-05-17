/**
 * PresentationML SlideLayout 的 typed Part（part-level 关系 type 为 `.../slideLayout`）。
 *
 * Story-4.3 提供最小骨架，仅暴露 typed root；Story-4.4 扩充 SlideMasterPart 等同级关系。
 *
 * @see DocumentFormat.OpenXml.Packaging.SlideLayoutPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { SlideLayout } from "../generated/slide-layout.js";

export class SlideLayoutPart extends TypedXmlPart<SlideLayout> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, SlideLayout);
  }

  /** `<p:sldLayout>` 根元素。 */
  get slideLayout(): SlideLayout {
    return this.root;
  }

  set slideLayout(value: SlideLayout) {
    this.root = value;
  }
}
