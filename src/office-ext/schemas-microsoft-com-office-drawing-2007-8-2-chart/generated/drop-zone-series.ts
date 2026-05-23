// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2007_8_2_chart.json
// @see DocumentFormat.OpenXml.82Chart.DropZoneSeries

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the DropZoneSeries Class.
 *
 * Element: `c14:dropZoneSeries` */
export class DropZoneSeries extends OpenXmlLeafElement {
  override readonly localName = "dropZoneSeries" as const;
  override readonly prefix = "c14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2007/8/2/chart" as const;


  /** val (:val) */
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
