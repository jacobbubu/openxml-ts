// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_vml.json
// @see DocumentFormat.OpenXml.Vml.ShapeHandle

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Shape Handle.
 *
 * Element: `v:h` */
export class ShapeHandle extends OpenXmlLeafElement {
  override readonly localName = "h" as const;
  override readonly prefix = "v" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:vml" as const;


  /** Handle Position (:position) */
  position: StringValue | undefined;

  /** Handle Polar Center (:polar) */
  polar: StringValue | undefined;

  /** Handle Coordinate Mapping (:map) */
  map: StringValue | undefined;

  /** Invert Handle's X Position (:invx) */
  invertX: StringValue | undefined;

  /** Invert Handle's Y Position (:invy) */
  invertY: StringValue | undefined;

  /** Handle Inversion Toggle (:switch) */
  switch: StringValue | undefined;

  /** Handle X Position Range (:xrange) */
  xRange: StringValue | undefined;

  /** Handle Y Position Range (:yrange) */
  yRange: StringValue | undefined;

  /** Handle Polar Radius Range (:radiusrange) */
  radiusRange: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "position": this.position = StringValue.parse(value); return;
      case "polar": this.polar = StringValue.parse(value); return;
      case "map": this.map = StringValue.parse(value); return;
      case "invx": this.invertX = StringValue.parse(value); return;
      case "invy": this.invertY = StringValue.parse(value); return;
      case "switch": this.switch = StringValue.parse(value); return;
      case "xrange": this.xRange = StringValue.parse(value); return;
      case "yrange": this.yRange = StringValue.parse(value); return;
      case "radiusrange": this.radiusRange = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    if (this.polar !== undefined) out.push(["polar", this.polar.toString()]);
    if (this.map !== undefined) out.push(["map", this.map.toString()]);
    if (this.invertX !== undefined) out.push(["invx", this.invertX.toString()]);
    if (this.invertY !== undefined) out.push(["invy", this.invertY.toString()]);
    if (this.switch !== undefined) out.push(["switch", this.switch.toString()]);
    if (this.xRange !== undefined) out.push(["xrange", this.xRange.toString()]);
    if (this.yRange !== undefined) out.push(["yrange", this.yRange.toString()]);
    if (this.radiusRange !== undefined) out.push(["radiusrange", this.radiusRange.toString()]);
    return out;
  }

}
