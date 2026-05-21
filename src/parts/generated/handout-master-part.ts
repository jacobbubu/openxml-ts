/**
 * `HandoutMasterPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.HandoutMasterPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class HandoutMasterPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/handoutMaster";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.presentationml.handoutMaster+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, HandoutMasterPartRoot);
  }
}

class HandoutMasterPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
