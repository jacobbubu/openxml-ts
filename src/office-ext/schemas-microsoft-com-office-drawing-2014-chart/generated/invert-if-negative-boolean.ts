// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chart.json
// @see DocumentFormat.OpenXml.Drawing2014Chart.InvertIfNegativeBoolean

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the InvertIfNegativeBoolean Class.
 *
 * Element: `c16:invertIfNegative` */
export class InvertIfNegativeBoolean extends OpenXmlLeafElement {
  override readonly localName = "invertIfNegative" as const;
  override readonly prefix = "c16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/chart" as const;


  /** Boolean Value (:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
