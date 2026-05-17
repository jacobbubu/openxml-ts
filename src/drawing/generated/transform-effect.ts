// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TransformEffect

import {
  Int32Value,
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Transform Effect.
 *
 * Element: `a:xfrm` */
export class TransformEffect extends OpenXmlLeafElement {
  override readonly localName = "xfrm" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Horizontal Ratio (:sx) */
  horizontalRatio: Int32Value | undefined;

  /** Vertical Ratio (:sy) */
  verticalRatio: Int32Value | undefined;

  /** Horizontal Skew (:kx) */
  horizontalSkew: Int32Value | undefined;

  /** Vertical Skew (:ky) */
  verticalSkew: Int32Value | undefined;

  /** Horizontal Shift (:tx) */
  horizontalShift: Int64Value | undefined;

  /** Vertical Shift (:ty) */
  verticalShift: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":sx": this.horizontalRatio = Int32Value.parse(value); return;
      case ":sy": this.verticalRatio = Int32Value.parse(value); return;
      case ":kx": this.horizontalSkew = Int32Value.parse(value); return;
      case ":ky": this.verticalSkew = Int32Value.parse(value); return;
      case ":tx": this.horizontalShift = Int64Value.parse(value); assertNumber(this.horizontalShift, { min: -27273042329600, max: 27273042316900 }, { attribute: ":tx", elementClass: "TransformEffect" }); return;
      case ":ty": this.verticalShift = Int64Value.parse(value); assertNumber(this.verticalShift, { min: -27273042329600, max: 27273042316900 }, { attribute: ":ty", elementClass: "TransformEffect" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.horizontalRatio !== undefined) out.push([":sx", this.horizontalRatio.toString()]);
    if (this.verticalRatio !== undefined) out.push([":sy", this.verticalRatio.toString()]);
    if (this.horizontalSkew !== undefined) out.push([":kx", this.horizontalSkew.toString()]);
    if (this.verticalSkew !== undefined) out.push([":ky", this.verticalSkew.toString()]);
    if (this.horizontalShift !== undefined) out.push([":tx", this.horizontalShift.toString()]);
    if (this.verticalShift !== undefined) out.push([":ty", this.verticalShift.toString()]);
    return out;
  }

}
