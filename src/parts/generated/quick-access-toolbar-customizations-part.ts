/**
 * `QuickAccessToolbarCustomizationsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.QuickAccessToolbarCustomizationsPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class QuickAccessToolbarCustomizationsPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/ui/userCustomization";
  static readonly contentType = "application/xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, QuickAccessToolbarCustomizationsPartRoot);
  }
}

class QuickAccessToolbarCustomizationsPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
