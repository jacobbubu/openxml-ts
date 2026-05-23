// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_pivot2023Calculation.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023Pivot2023Calculation.AggregationInfo

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the AggregationInfo Class.
 *
 * Element: `xlpcalc:aggregationInfo` */
export class AggregationInfo extends OpenXmlLeafElement {
  override readonly localName = "aggregationInfo" as const;
  override readonly prefix = "xlpcalc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation" as const;


  /** aggregationType (:aggregationType) */
  aggregationType: StringValue | undefined;

  /** sourceField (:sourceField) */
  sourceField: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "aggregationType": this.aggregationType = StringValue.parse(value); return;
      case "sourceField": this.sourceField = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.aggregationType !== undefined) out.push(["aggregationType", this.aggregationType.toString()]);
    if (this.sourceField !== undefined) out.push(["sourceField", this.sourceField.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.aggregationType, { attribute: ":aggregationType", elementClass: "AggregationInfo" });
    assertRequired(this.sourceField, { attribute: ":sourceField", elementClass: "AggregationInfo" });
  }
}
