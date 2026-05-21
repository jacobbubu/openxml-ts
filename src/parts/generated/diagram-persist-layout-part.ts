/**
 * `DiagramPersistLayoutPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.DiagramPersistLayoutPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class DiagramPersistLayoutPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/diagramDrawing";
  static readonly contentType = "application/vnd.ms-office.drawingml.diagramDrawing+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, DiagramPersistLayoutPartRoot);
  }
}

class DiagramPersistLayoutPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
