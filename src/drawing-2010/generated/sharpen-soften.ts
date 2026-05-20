// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.SharpenSoften

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the SharpenSoften Class.
 *
 * Element: `a14:sharpenSoften` */
export class SharpenSoften extends OpenXmlLeafElement {
  override readonly localName = "sharpenSoften" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** amount (:amount) */
  amount: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "amount": this.amount = Int32Value.parse(value); assertNumber(this.amount, { min: -100000, max: 100000 }, { attribute: ":amount", elementClass: "SharpenSoften" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.amount !== undefined) out.push(["amount", this.amount.toString()]);
    return out;
  }

}
