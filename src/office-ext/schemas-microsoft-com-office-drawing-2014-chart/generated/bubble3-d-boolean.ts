// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chart.json
// @see DocumentFormat.OpenXml.Drawing2014Chart.Bubble3DBoolean

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the Bubble3DBoolean Class.
 *
 * Element: `c16:bubble3D` */
export class Bubble3DBoolean extends OpenXmlLeafElement {
  override readonly localName = "bubble3D" as const;
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

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
