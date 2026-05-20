// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.OleObject

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Embedded OLE Object.
 *
 * Element: `o:OLEObject` */
export class OleObject extends OpenXmlCompositeElement {
  override readonly localName = "OLEObject" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** OLE Object Type (:Type) */
  type: StringValue | undefined;

  /** OLE Object Application (:ProgID) */
  progId: StringValue | undefined;

  /** OLE Object Shape (:ShapeID) */
  shapeId: StringValue | undefined;

  /** OLE Object Representation (:DrawAspect) */
  drawAspect: StringValue | undefined;

  /** OLE Object Unique ID (:ObjectID) */
  objectId: StringValue | undefined;

  /** Relationship (r:id) */
  id: StringValue | undefined;

  /** OLE Update Mode (:UpdateMode) */
  updateMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "Type": this.type = StringValue.parse(value); return;
      case "ProgID": this.progId = StringValue.parse(value); return;
      case "ShapeID": this.shapeId = StringValue.parse(value); return;
      case "DrawAspect": this.drawAspect = StringValue.parse(value); return;
      case "ObjectID": this.objectId = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
      case "UpdateMode": this.updateMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["Type", this.type.toString()]);
    if (this.progId !== undefined) out.push(["ProgID", this.progId.toString()]);
    if (this.shapeId !== undefined) out.push(["ShapeID", this.shapeId.toString()]);
    if (this.drawAspect !== undefined) out.push(["DrawAspect", this.drawAspect.toString()]);
    if (this.objectId !== undefined) out.push(["ObjectID", this.objectId.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.updateMode !== undefined) out.push(["UpdateMode", this.updateMode.toString()]);
    return out;
  }

}
