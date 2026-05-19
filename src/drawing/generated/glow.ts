// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Glow

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
} from "../../element/index.js";

/** Glow Effect.
 *
 * Element: `a:glow` */
export class Glow extends OpenXmlCompositeElement {
  override readonly localName = "glow" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Radius (:rad) */
  radius: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rad": this.radius = Int64Value.parse(value); assertNumber(this.radius, { min: 0, max: 2147483647 }, { attribute: ":rad", elementClass: "Glow" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.radius !== undefined) out.push(["rad", this.radius.toString()]);
    return out;
  }

}
