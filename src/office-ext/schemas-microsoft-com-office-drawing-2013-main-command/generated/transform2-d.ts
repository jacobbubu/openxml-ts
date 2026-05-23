// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.Transform2D

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the Transform2D Class.
 *
 * Element: `oac:xfrm` */
export class Transform2D extends OpenXmlCompositeElement {
  override readonly localName = "xfrm" as const;
  override readonly prefix = "oac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2013/main/command" as const;
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

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rotation !== undefined) out.push(["rot", this.rotation.toString()]);
    if (this.horizontalFlip !== undefined) out.push(["flipH", this.horizontalFlip.toString()]);
    if (this.verticalFlip !== undefined) out.push(["flipV", this.verticalFlip.toString()]);
    return out;
  }

}
