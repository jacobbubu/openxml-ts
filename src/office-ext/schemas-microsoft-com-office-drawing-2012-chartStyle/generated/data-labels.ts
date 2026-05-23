// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.DataLabels

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the DataLabels Class.
 *
 * Element: `cs:dataLabels` */
export class DataLabels extends OpenXmlLeafElement {
  override readonly localName = "dataLabels" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** position (:position) */
  position: StringValue | undefined;

  /** value (:value) */
  value: StringValue | undefined;

  /** seriesName (:seriesName) */
  seriesName: StringValue | undefined;

  /** categoryName (:categoryName) */
  categoryName: StringValue | undefined;

  /** legendKey (:legendKey) */
  legendKey: StringValue | undefined;

  /** percentage (:percentage) */
  percentage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "position": this.position = StringValue.parse(value); return;
      case "value": this.value = StringValue.parse(value); return;
      case "seriesName": this.seriesName = StringValue.parse(value); return;
      case "categoryName": this.categoryName = StringValue.parse(value); return;
      case "legendKey": this.legendKey = StringValue.parse(value); return;
      case "percentage": this.percentage = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    if (this.seriesName !== undefined) out.push(["seriesName", this.seriesName.toString()]);
    if (this.categoryName !== undefined) out.push(["categoryName", this.categoryName.toString()]);
    if (this.legendKey !== undefined) out.push(["legendKey", this.legendKey.toString()]);
    if (this.percentage !== undefined) out.push(["percentage", this.percentage.toString()]);
    return out;
  }

}
