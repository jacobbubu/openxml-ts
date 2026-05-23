// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_03_chart.json
// @see DocumentFormat.OpenXml.201703Chart.BooleanFalse

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the BooleanFalse Class.
 *
 * Element: `c16r3:dispNaAsBlank` */
export class BooleanFalse extends OpenXmlLeafElement {
  override readonly localName = "dispNaAsBlank" as const;
  override readonly prefix = "c16r3" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/03/chart" as const;


  /** val (c16r3:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "c16r3:val": this.val = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["c16r3:val", this.val.toString()]);
    return out;
  }

}
