/**
 * `LabelInfoPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.LabelInfoPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class LabelInfoPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2020/02/relationships/classificationlabels";
  static readonly contentType = "application/vnd.ms-office.classificationlabels+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, LabelInfoPartRoot);
  }
}

class LabelInfoPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
