// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Blur

import {
  BooleanValue,
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the Blur Class.
 *
 * Element: `a:blur` */
export class Blur extends OpenXmlLeafElement {
  override readonly localName = "blur" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Radius (:rad) */
  radius: Int64Value | undefined;

  /** Grow Bounds (:grow) */
  grow: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rad": this.radius = Int64Value.parse(value); assertNumber(this.radius, { min: 0, max: 2147483647 }, { attribute: ":rad", elementClass: "Blur" }); return;
      case ":grow": this.grow = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.radius !== undefined) out.push([":rad", this.radius.toString()]);
    if (this.grow !== undefined) out.push([":grow", this.grow.toString()]);
    return out;
  }

}
