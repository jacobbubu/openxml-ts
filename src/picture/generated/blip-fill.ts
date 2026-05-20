// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_picture.json
// @see DocumentFormat.OpenXml.Picture.BlipFill

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Picture Fill.
 *
 * Element: `pic:blipFill` */
export class BlipFill extends OpenXmlCompositeElement {
  override readonly localName = "blipFill" as const;
  override readonly prefix = "pic" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/picture" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** DPI Setting (:dpi) */
  dpi: UInt32Value | undefined;

  /** Rotate With Shape (:rotWithShape) */
  rotateWithShape: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "dpi": this.dpi = UInt32Value.parse(value); return;
      case "rotWithShape": this.rotateWithShape = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dpi !== undefined) out.push(["dpi", this.dpi.toString()]);
    if (this.rotateWithShape !== undefined) out.push(["rotWithShape", this.rotateWithShape.toString()]);
    return out;
  }

}
