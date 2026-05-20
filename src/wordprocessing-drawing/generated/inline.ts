// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.WordprocessingDrawing.Inline

import {
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Inline DrawingML Object.
 *
 * Element: `wp:inline` */
export class Inline extends OpenXmlCompositeElement {
  override readonly localName = "inline" as const;
  override readonly prefix = "wp" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Distance From Text on Top Edge (:distT) */
  distanceFromTop: UInt32Value | undefined;

  /** Distance From Text on Bottom Edge (:distB) */
  distanceFromBottom: UInt32Value | undefined;

  /** Distance From Text on Left Edge (:distL) */
  distanceFromLeft: UInt32Value | undefined;

  /** Distance From Text on Right Edge (:distR) */
  distanceFromRight: UInt32Value | undefined;

  /** editId (wp14:editId) */
  editId: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "distT": this.distanceFromTop = UInt32Value.parse(value); return;
      case "distB": this.distanceFromBottom = UInt32Value.parse(value); return;
      case "distL": this.distanceFromLeft = UInt32Value.parse(value); return;
      case "distR": this.distanceFromRight = UInt32Value.parse(value); return;
      case "wp14:editId": this.editId = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.distanceFromTop !== undefined) out.push(["distT", this.distanceFromTop.toString()]);
    if (this.distanceFromBottom !== undefined) out.push(["distB", this.distanceFromBottom.toString()]);
    if (this.distanceFromLeft !== undefined) out.push(["distL", this.distanceFromLeft.toString()]);
    if (this.distanceFromRight !== undefined) out.push(["distR", this.distanceFromRight.toString()]);
    if (this.editId !== undefined) out.push(["wp14:editId", this.editId.toString()]);
    return out;
  }

}
