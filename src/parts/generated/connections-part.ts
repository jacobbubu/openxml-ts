/**
 * `ConnectionsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.ConnectionsPart.
 *
 * Root element: `x:connections` (DocumentFormat.OpenXml.Spreadsheet.Connections).
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { Connections } from "../../excel/generated/connections.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class ConnectionsPart extends TypedXmlPart<Connections> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/connections";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Connections);
  }

  /** `<x:connections>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.ConnectionsPart.Connections */
  get connections(): Connections {
    return this.root;
  }

  set connections(value: Connections) {
    this.root = value;
  }
}
