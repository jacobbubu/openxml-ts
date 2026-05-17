// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Tile

import {
  Int32Value,
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Tile.
 *
 * Element: `a:tile` */
export class Tile extends OpenXmlLeafElement {
  override readonly localName = "tile" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Horizontal Offset (:tx) */
  horizontalOffset: Int64Value | undefined;

  /** Vertical Offset (:ty) */
  verticalOffset: Int64Value | undefined;

  /** Horizontal Ratio (:sx) */
  horizontalRatio: Int32Value | undefined;

  /** Vertical Ratio (:sy) */
  verticalRatio: Int32Value | undefined;

  /** Tile Flipping (:flip) */
  flip: StringValue | undefined;

  /** Alignment (:algn) */
  alignment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":tx": this.horizontalOffset = Int64Value.parse(value); assertNumber(this.horizontalOffset, { min: -27273042329600, max: 27273042316900 }, { attribute: ":tx", elementClass: "Tile" }); return;
      case ":ty": this.verticalOffset = Int64Value.parse(value); assertNumber(this.verticalOffset, { min: -27273042329600, max: 27273042316900 }, { attribute: ":ty", elementClass: "Tile" }); return;
      case ":sx": this.horizontalRatio = Int32Value.parse(value); return;
      case ":sy": this.verticalRatio = Int32Value.parse(value); return;
      case ":flip": this.flip = StringValue.parse(value); return;
      case ":algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.horizontalOffset !== undefined) out.push([":tx", this.horizontalOffset.toString()]);
    if (this.verticalOffset !== undefined) out.push([":ty", this.verticalOffset.toString()]);
    if (this.horizontalRatio !== undefined) out.push([":sx", this.horizontalRatio.toString()]);
    if (this.verticalRatio !== undefined) out.push([":sy", this.verticalRatio.toString()]);
    if (this.flip !== undefined) out.push([":flip", this.flip.toString()]);
    if (this.alignment !== undefined) out.push([":algn", this.alignment.toString()]);
    return out;
  }

}
