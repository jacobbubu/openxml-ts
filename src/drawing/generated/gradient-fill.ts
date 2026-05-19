// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.GradientFill

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the GradientFill Class.
 *
 * Element: `a:gradFill` */
export class GradientFill extends OpenXmlCompositeElement {
  override readonly localName = "gradFill" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Tile Flip (:flip) */
  flip: StringValue | undefined;

  /** Rotate With Shape (:rotWithShape) */
  rotateWithShape: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "flip": this.flip = StringValue.parse(value); return;
      case "rotWithShape": this.rotateWithShape = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.flip !== undefined) out.push(["flip", this.flip.toString()]);
    if (this.rotateWithShape !== undefined) out.push(["rotWithShape", this.rotateWithShape.toString()]);
    return out;
  }

}
