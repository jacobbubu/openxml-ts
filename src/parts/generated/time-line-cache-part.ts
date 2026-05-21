/**
 * `TimeLineCachePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.TimeLineCachePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class TimeLineCachePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2011/relationships/timelineCache";
  static readonly contentType = "application/vnd.ms-excel.timelineCache+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, TimeLineCachePartRoot);
  }
}

class TimeLineCachePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
