/**
 * `RdRichValueStructurePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.RdRichValueStructurePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class RdRichValueStructurePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2017/06/relationships/rdRichValueStructure";
  static readonly contentType = "application/vnd.ms-excel.rdrichvaluestructure+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, RdRichValueStructurePartRoot);
  }
}

class RdRichValueStructurePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
