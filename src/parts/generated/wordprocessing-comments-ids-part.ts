/**
 * `WordprocessingCommentsIdsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.WordprocessingCommentsIdsPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class WordprocessingCommentsIdsPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2016/09/relationships/commentsIds";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.commentsIds+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, WordprocessingCommentsIdsPartRoot);
  }
}

class WordprocessingCommentsIdsPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
