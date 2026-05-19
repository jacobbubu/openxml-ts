// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Miter

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Miter Line Join.
 *
 * Element: `a:miter` */
export class Miter extends OpenXmlLeafElement {
  override readonly localName = "miter" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Miter Join Limit (:lim) */
  limit: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "lim": this.limit = Int32Value.parse(value); assertNumber(this.limit, { min: 0 }, { attribute: ":lim", elementClass: "Miter" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.limit !== undefined) out.push(["lim", this.limit.toString()]);
    return out;
  }

}
