// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Relation

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Diagram Relationship.
 *
 * Element: `o:rel` */
export class Relation extends OpenXmlLeafElement {
  override readonly localName = "rel" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Diagram Relationship Source Shape (:idsrc) */
  sourceId: StringValue | undefined;

  /** Diagram Relationship Destination Shape (:iddest) */
  destinationId: StringValue | undefined;

  /** Diagram Relationship Center Shape (:idcntr) */
  centerShapeId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "idsrc": this.sourceId = StringValue.parse(value); return;
      case "iddest": this.destinationId = StringValue.parse(value); return;
      case "idcntr": this.centerShapeId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.sourceId !== undefined) out.push(["idsrc", this.sourceId.toString()]);
    if (this.destinationId !== undefined) out.push(["iddest", this.destinationId.toString()]);
    if (this.centerShapeId !== undefined) out.push(["idcntr", this.centerShapeId.toString()]);
    return out;
  }

}
