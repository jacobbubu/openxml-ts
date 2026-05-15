import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { Styles } from "../generated/styles.js";
import { TypedXmlPart } from "./typed-xml-part.js";

/** `.../styles` 关系下的 Part；根元素 `<w:styles>`。 */
export class StylesPart extends TypedXmlPart<Styles> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Styles);
  }

  get styles(): Styles {
    return this.root;
  }

  set styles(value: Styles) {
    this.root = value;
  }
}
