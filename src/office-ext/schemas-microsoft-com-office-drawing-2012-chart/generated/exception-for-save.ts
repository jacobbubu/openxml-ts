// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chart.json
// @see DocumentFormat.OpenXml.Drawing2012Chart.ExceptionForSave

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the ExceptionForSave Class.
 *
 * Element: `c15:xForSave` */
export class ExceptionForSave extends OpenXmlLeafElement {
  override readonly localName = "xForSave" as const;
  override readonly prefix = "c15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chart" as const;


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
