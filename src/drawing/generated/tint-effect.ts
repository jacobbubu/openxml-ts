// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TintEffect

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the TintEffect Class.
 *
 * Element: `a:tint` */
export class TintEffect extends OpenXmlLeafElement {
  override readonly localName = "tint" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Hue (:hue) */
  hue: Int32Value | undefined;

  /** Amount (:amt) */
  amount: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "hue": this.hue = Int32Value.parse(value); assertNumber(this.hue, { min: 0 }, { attribute: ":hue", elementClass: "TintEffect" }); return;
      case "amt": this.amount = Int32Value.parse(value); assertNumber(this.amount, { min: -100000, max: 100000 }, { attribute: ":amt", elementClass: "TintEffect" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hue !== undefined) out.push(["hue", this.hue.toString()]);
    if (this.amount !== undefined) out.push(["amt", this.amount.toString()]);
    return out;
  }

}
