/**
 * `ExtendedChartPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.ExtendedChartPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class ExtendedChartPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2014/relationships/chartEx";
  static readonly contentType = "application/vnd.ms-office.chartex+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, ExtendedChartPartRoot);
  }
}

class ExtendedChartPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
