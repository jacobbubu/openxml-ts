// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Reflection

import {
  BooleanValue,
  Int32Value,
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Reflection Effect.
 *
 * Element: `a:reflection` */
export class Reflection extends OpenXmlLeafElement {
  override readonly localName = "reflection" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Blur Radius (:blurRad) */
  blurRadius: Int64Value | undefined;

  /** Start Opacity (:stA) */
  startOpacity: Int32Value | undefined;

  /** Start Position (:stPos) */
  startPosition: Int32Value | undefined;

  /** End Alpha (:endA) */
  endAlpha: Int32Value | undefined;

  /** End Position (:endPos) */
  endPosition: Int32Value | undefined;

  /** Distance (:dist) */
  distance: Int64Value | undefined;

  /** Direction (:dir) */
  direction: Int32Value | undefined;

  /** Fade Direction (:fadeDir) */
  fadeDirection: Int32Value | undefined;

  /** Horizontal Ratio (:sx) */
  horizontalRatio: Int32Value | undefined;

  /** Vertical Ratio (:sy) */
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
      case ":blurRad": this.blurRadius = Int64Value.parse(value); assertNumber(this.blurRadius, { min: 0, max: 2147483647 }, { attribute: ":blurRad", elementClass: "Reflection" }); return;
      case ":stA": this.startOpacity = Int32Value.parse(value); assertNumber(this.startOpacity, { min: 0, max: 100000 }, { attribute: ":stA", elementClass: "Reflection" }); return;
      case ":stPos": this.startPosition = Int32Value.parse(value); assertNumber(this.startPosition, { min: 0, max: 100000 }, { attribute: ":stPos", elementClass: "Reflection" }); return;
      case ":endA": this.endAlpha = Int32Value.parse(value); assertNumber(this.endAlpha, { min: 0, max: 100000 }, { attribute: ":endA", elementClass: "Reflection" }); return;
      case ":endPos": this.endPosition = Int32Value.parse(value); assertNumber(this.endPosition, { min: 0, max: 100000 }, { attribute: ":endPos", elementClass: "Reflection" }); return;
      case ":dist": this.distance = Int64Value.parse(value); assertNumber(this.distance, { min: 0, max: 2147483647 }, { attribute: ":dist", elementClass: "Reflection" }); return;
      case ":dir": this.direction = Int32Value.parse(value); assertNumber(this.direction, { min: 0 }, { attribute: ":dir", elementClass: "Reflection" }); return;
      case ":fadeDir": this.fadeDirection = Int32Value.parse(value); assertNumber(this.fadeDirection, { min: 0 }, { attribute: ":fadeDir", elementClass: "Reflection" }); return;
      case ":sx": this.horizontalRatio = Int32Value.parse(value); return;
      case ":sy": this.verticalRatio = Int32Value.parse(value); return;
      case ":kx": this.horizontalSkew = Int32Value.parse(value); return;
      case ":ky": this.verticalSkew = Int32Value.parse(value); return;
      case ":algn": this.alignment = StringValue.parse(value); return;
      case ":rotWithShape": this.rotateWithShape = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blurRadius !== undefined) out.push([":blurRad", this.blurRadius.toString()]);
    if (this.startOpacity !== undefined) out.push([":stA", this.startOpacity.toString()]);
    if (this.startPosition !== undefined) out.push([":stPos", this.startPosition.toString()]);
    if (this.endAlpha !== undefined) out.push([":endA", this.endAlpha.toString()]);
    if (this.endPosition !== undefined) out.push([":endPos", this.endPosition.toString()]);
    if (this.distance !== undefined) out.push([":dist", this.distance.toString()]);
    if (this.direction !== undefined) out.push([":dir", this.direction.toString()]);
    if (this.fadeDirection !== undefined) out.push([":fadeDir", this.fadeDirection.toString()]);
    if (this.horizontalRatio !== undefined) out.push([":sx", this.horizontalRatio.toString()]);
    if (this.verticalRatio !== undefined) out.push([":sy", this.verticalRatio.toString()]);
    if (this.horizontalSkew !== undefined) out.push([":kx", this.horizontalSkew.toString()]);
    if (this.verticalSkew !== undefined) out.push([":ky", this.verticalSkew.toString()]);
    if (this.alignment !== undefined) out.push([":algn", this.alignment.toString()]);
    if (this.rotateWithShape !== undefined) out.push([":rotWithShape", this.rotateWithShape.toString()]);
    return out;
  }

}
