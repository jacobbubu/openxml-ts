// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.InnerShadow

import {
  Int32Value,
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Inner Shadow Effect.
 *
 * Element: `a:innerShdw` */
export class InnerShadow extends OpenXmlCompositeElement {
  override readonly localName = "innerShdw" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Blur Radius (:blurRad) */
  blurRadius: Int64Value | undefined;

  /** Distance (:dist) */
  distance: Int64Value | undefined;

  /** Direction (:dir) */
  direction: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":blurRad": this.blurRadius = Int64Value.parse(value); assertNumber(this.blurRadius, { min: 0, max: 2147483647 }, { attribute: ":blurRad", elementClass: "InnerShadow" }); return;
      case ":dist": this.distance = Int64Value.parse(value); assertNumber(this.distance, { min: 0, max: 2147483647 }, { attribute: ":dist", elementClass: "InnerShadow" }); return;
      case ":dir": this.direction = Int32Value.parse(value); assertNumber(this.direction, { min: 0 }, { attribute: ":dir", elementClass: "InnerShadow" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blurRadius !== undefined) out.push([":blurRad", this.blurRadius.toString()]);
    if (this.distance !== undefined) out.push([":dist", this.distance.toString()]);
    if (this.direction !== undefined) out.push([":dir", this.direction.toString()]);
    return out;
  }

}
