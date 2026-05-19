// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.AlphaModulationFixed

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the AlphaModulationFixed Class.
 *
 * Element: `a:alphaModFix` */
export class AlphaModulationFixed extends OpenXmlLeafElement {
  override readonly localName = "alphaModFix" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Amount (:amt) */
  amount: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "amt": this.amount = Int32Value.parse(value); assertNumber(this.amount, { min: 0 }, { attribute: ":amt", elementClass: "AlphaModulationFixed" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.amount !== undefined) out.push(["amt", this.amount.toString()]);
    return out;
  }

}
