// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AlphaOutset

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Alpha Inset/Outset Effect.
 *
 * Element: `a:alphaOutset` */
export class AlphaOutset extends OpenXmlLeafElement {
  override readonly localName = "alphaOutset" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Radius (:rad) */
  radius: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rad": this.radius = Int64Value.parse(value); assertNumber(this.radius, { min: -27273042329600, max: 27273042316900 }, { attribute: ":rad", elementClass: "AlphaOutset" }); return;
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
