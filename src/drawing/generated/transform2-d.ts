// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Transform2D

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the Transform2D Class.
 *
 * Element: `a:xfrm` */
export class Transform2D extends OpenXmlCompositeElement {
  override readonly localName = "xfrm" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Rotation (:rot) */
  rotation: Int32Value | undefined;

  /** Horizontal Flip (:flipH) */
  horizontalFlip: BooleanValue | undefined;

  /** Vertical Flip (:flipV) */
  verticalFlip: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rot": this.rotation = Int32Value.parse(value); return;
      case "flipH": this.horizontalFlip = BooleanValue.parse(value); return;
      case "flipV": this.verticalFlip = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rotation !== undefined) out.push(["rot", this.rotation.toString()]);
    if (this.horizontalFlip !== undefined) out.push(["flipH", this.horizontalFlip.toString()]);
    if (this.verticalFlip !== undefined) out.push(["flipV", this.verticalFlip.toString()]);
    return out;
  }

}
