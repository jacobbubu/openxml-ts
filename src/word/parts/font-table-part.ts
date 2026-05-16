import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Fonts } from "../generated/fonts.js";

/** `.../fontTable` 关系下的 Part；根元素 `<w:fonts>`。 */
export class FontTablePart extends TypedXmlPart<Fonts> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/fontTable";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Fonts);
  }

  get fonts(): Fonts {
    return this.root;
  }

  set fonts(value: Fonts) {
    this.root = value;
  }
}
