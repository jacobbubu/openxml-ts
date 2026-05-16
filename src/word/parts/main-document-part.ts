import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Document } from "../generated/document.js";

/**
 * Word 主文档 Part（包级关系 type 为 `.../officeDocument`）。
 *
 * @see DocumentFormat.OpenXml.Packaging.MainDocumentPart
 */
export class MainDocumentPart extends TypedXmlPart<Document> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Document);
  }

  /** `<w:document>` 根元素。 */
  get document(): Document {
    return this.root;
  }

  set document(value: Document) {
    this.root = value;
  }
}
