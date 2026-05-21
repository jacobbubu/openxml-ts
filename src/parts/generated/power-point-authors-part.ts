/**
 * `PowerPointAuthorsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.PowerPointAuthorsPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class PowerPointAuthorsPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2018/10/relationships/authors";
  static readonly contentType = "application/vnd.ms-powerpoint.authors+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, PowerPointAuthorsPartRoot);
  }
}

class PowerPointAuthorsPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
