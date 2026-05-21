/**
 * `PivotTablePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.PivotTablePart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class PivotTablePart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/pivotTable";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, PivotTablePartRoot);
  }
}

class PivotTablePartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
