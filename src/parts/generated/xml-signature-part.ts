/**
 * `XmlSignaturePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.XmlSignaturePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class XmlSignaturePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/package/2006/relationships/digital-signature/signature";
  static readonly contentType = "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, XmlSignaturePartRoot);
  }
}

class XmlSignaturePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
