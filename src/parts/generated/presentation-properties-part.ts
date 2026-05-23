/**
 * `PresentationPropertiesPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.PresentationPropertiesPart.
 *
 * Root element is the typed `PresentationProperties` (`<p:presentationPr>`) element.
 * Epic-118b: upgraded from opaque placeholder to typed root.
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { PresentationProperties } from "../../ppt/generated/presentation-properties.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class PresentationPropertiesPart extends TypedXmlPart<PresentationProperties> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.presentationml.presProps+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, PresentationProperties);
  }

  get presentationProperties(): PresentationProperties {
    return this.root;
  }

  set presentationProperties(value: PresentationProperties) {
    this.root = value;
  }
}
