/**
 * `InternationalMacroSheetPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.InternationalMacroSheetPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class InternationalMacroSheetPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/xlIntlMacrosheet";
  static readonly contentType = "application/vnd.ms-excel.intlmacrosheet+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, InternationalMacroSheetPartRoot);
  }
}

class InternationalMacroSheetPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
