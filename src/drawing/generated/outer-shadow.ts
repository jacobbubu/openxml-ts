// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.OuterShadow

import {
  BooleanValue,
  Int32Value,
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Outer Shadow Effect.
 *
 * Element: `a:outerShdw` */
export class OuterShadow extends OpenXmlCompositeElement {
  override readonly localName = "outerShdw" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Blur Radius (:blurRad) */
  blurRadius: Int64Value | undefined;

  /** Shadow Offset Distance (:dist) */
  distance: Int64Value | undefined;

  /** Shadow Direction (:dir) */
  direction: Int32Value | undefined;

  /** Horizontal Scaling Factor (:sx) */
  horizontalRatio: Int32Value | undefined;

  /** Vertical Scaling Factor (:sy) */
  verticalRatio: Int32Value | undefined;

  /** Horizontal Skew (:kx) */
  horizontalSkew: Int32Value | undefined;

  /** Vertical Skew (:ky) */
  verticalSkew: Int32Value | undefined;

  /** Shadow Alignment (:algn) */
  alignment: StringValue | undefined;

  /** Rotate With Shape (:rotWithShape) */
  rotateWithShape: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "blurRad": this.blurRadius = Int64Value.parse(value); assertNumber(this.blurRadius, { min: 0, max: 2147483647 }, { attribute: ":blurRad", elementClass: "OuterShadow" }); return;
      case "dist": this.distance = Int64Value.parse(value); assertNumber(this.distance, { min: 0, max: 2147483647 }, { attribute: ":dist", elementClass: "OuterShadow" }); return;
      case "dir": this.direction = Int32Value.parse(value); assertNumber(this.direction, { min: 0 }, { attribute: ":dir", elementClass: "OuterShadow" }); return;
      case "sx": this.horizontalRatio = Int32Value.parse(value); return;
      case "sy": this.verticalRatio = Int32Value.parse(value); return;
      case "kx": this.horizontalSkew = Int32Value.parse(value); return;
      case "ky": this.verticalSkew = Int32Value.parse(value); return;
      case "algn": this.alignment = StringValue.parse(value); return;
      case "rotWithShape": this.rotateWithShape = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blurRadius !== undefined) out.push(["blurRad", this.blurRadius.toString()]);
    if (this.distance !== undefined) out.push(["dist", this.distance.toString()]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    if (this.horizontalRatio !== undefined) out.push(["sx", this.horizontalRatio.toString()]);
    if (this.verticalRatio !== undefined) out.push(["sy", this.verticalRatio.toString()]);
    if (this.horizontalSkew !== undefined) out.push(["kx", this.horizontalSkew.toString()]);
    if (this.verticalSkew !== undefined) out.push(["ky", this.verticalSkew.toString()]);
    if (this.alignment !== undefined) out.push(["algn", this.alignment.toString()]);
    if (this.rotateWithShape !== undefined) out.push(["rotWithShape", this.rotateWithShape.toString()]);
    return out;
  }

}
