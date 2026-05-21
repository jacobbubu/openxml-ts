/**
 * `SlicerCachePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.SlicerCachePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class SlicerCachePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/slicerCache";
  static readonly contentType = "application/vnd.ms-excel.slicerCache+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, SlicerCachePartRoot);
  }
}

class SlicerCachePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
