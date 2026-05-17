// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AdjustHandlePolar

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Polar Adjust Handle.
 *
 * Element: `a:ahPolar` */
export class AdjustHandlePolar extends OpenXmlCompositeElement {
  override readonly localName = "ahPolar" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Radial Adjustment Guide (:gdRefR) */
  radialAdjustmentGuide: StringValue | undefined;

  /** Minimum Radial Adjustment (:minR) */
  minRadial: StringValue | undefined;

  /** Maximum Radial Adjustment (:maxR) */
  maxRadial: StringValue | undefined;

  /** Angle Adjustment Guide (:gdRefAng) */
  angleAdjustmentGuide: StringValue | undefined;

  /** Minimum Angle Adjustment (:minAng) */
  minAngle: StringValue | undefined;

  /** Maximum Angle Adjustment (:maxAng) */
  maxAngle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":gdRefR": this.radialAdjustmentGuide = StringValue.parse(value); return;
      case ":minR": this.minRadial = StringValue.parse(value); return;
      case ":maxR": this.maxRadial = StringValue.parse(value); return;
      case ":gdRefAng": this.angleAdjustmentGuide = StringValue.parse(value); return;
      case ":minAng": this.minAngle = StringValue.parse(value); return;
      case ":maxAng": this.maxAngle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.radialAdjustmentGuide !== undefined) out.push([":gdRefR", this.radialAdjustmentGuide.toString()]);
    if (this.minRadial !== undefined) out.push([":minR", this.minRadial.toString()]);
    if (this.maxRadial !== undefined) out.push([":maxR", this.maxRadial.toString()]);
    if (this.angleAdjustmentGuide !== undefined) out.push([":gdRefAng", this.angleAdjustmentGuide.toString()]);
    if (this.minAngle !== undefined) out.push([":minAng", this.minAngle.toString()]);
    if (this.maxAngle !== undefined) out.push([":maxAng", this.maxAngle.toString()]);
    return out;
  }

}
