/**
 * `DiagramLayoutDefinitionPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.DiagramLayoutDefinitionPart.
 *
 * Root element is an opaque `OpenXmlUnknownElement` placeholder;
 * bytes round-trip transparently without a typed schema binding.
 */
import type { ElementRegistry } from "../../element/index.js";
import { OpenXmlUnknownElement } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class DiagramLayoutDefinitionPart extends TypedXmlPart<OpenXmlUnknownElement> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramLayout";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, DiagramLayoutDefinitionPartRoot);
  }
}

class DiagramLayoutDefinitionPartRoot extends OpenXmlUnknownElement {
  constructor() {
    super("", "root", "");
  }
}
