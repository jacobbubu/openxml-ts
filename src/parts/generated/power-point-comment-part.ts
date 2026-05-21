/**
 * `PowerPointCommentPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.PowerPointCommentPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class PowerPointCommentPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2018/10/relationships/comments";
  static readonly contentType = "application/vnd.ms-powerpoint.comments+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, PowerPointCommentPartRoot);
  }
}

class PowerPointCommentPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
