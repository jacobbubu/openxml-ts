// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.Shape

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Shape.
 *
 * Element: `dgm:shape` */
export class Shape extends OpenXmlCompositeElement {
  override readonly localName = "shape" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Rotation (:rot) */
  rotation: StringValue | undefined;

  /** Shape Type (:type) */
  type: StringValue | undefined;

  /** Relationship to Image Part (r:blip) */
  blip: StringValue | undefined;

  /** Z-Order Offset (:zOrderOff) */
  zOrderOffset: Int32Value | undefined;

  /** Hide Geometry (:hideGeom) */
  hideGeometry: BooleanValue | undefined;

  /** Prevent Text Editing (:lkTxEntry) */
  lockedText: BooleanValue | undefined;

  /** Image Placeholder (:blipPhldr) */
  blipPlaceholder: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rot": this.rotation = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "r:blip": this.blip = StringValue.parse(value); return;
      case "zOrderOff": this.zOrderOffset = Int32Value.parse(value); return;
      case "hideGeom": this.hideGeometry = BooleanValue.parse(value); return;
      case "lkTxEntry": this.lockedText = BooleanValue.parse(value); return;
      case "blipPhldr": this.blipPlaceholder = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rotation !== undefined) out.push(["rot", this.rotation.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.blip !== undefined) out.push(["r:blip", this.blip.toString()]);
    if (this.zOrderOffset !== undefined) out.push(["zOrderOff", this.zOrderOffset.toString()]);
    if (this.hideGeometry !== undefined) out.push(["hideGeom", this.hideGeometry.toString()]);
    if (this.lockedText !== undefined) out.push(["lkTxEntry", this.lockedText.toString()]);
    if (this.blipPlaceholder !== undefined) out.push(["blipPhldr", this.blipPlaceholder.toString()]);
    return out;
  }

}
