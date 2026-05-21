/**
 * `RdSupportingPropertyBagStructurePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.RdSupportingPropertyBagStructurePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class RdSupportingPropertyBagStructurePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2017/06/relationships/rdSupportingPropertyBagStructure";
  static readonly contentType = "application/vnd.ms-excel.rdsupportingpropertybagstructure+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, RdSupportingPropertyBagStructurePartRoot);
  }
}

class RdSupportingPropertyBagStructurePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
