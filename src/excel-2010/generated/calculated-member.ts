// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.CalculatedMember

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the CalculatedMember Class.
 *
 * Element: `x15:calculatedMember` */
export class CalculatedMember extends OpenXmlLeafElement {
  override readonly localName = "calculatedMember" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** measureGroup (:measureGroup) */
  measureGroup: StringValue | undefined;

  /** numberFormat (:numberFormat) */
  numberFormat: StringValue | undefined;

  /** measure (:measure) */
  measure: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "measureGroup": this.measureGroup = StringValue.parse(value); return;
      case "numberFormat": this.numberFormat = StringValue.parse(value); return;
      case "measure": this.measure = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.measureGroup !== undefined) out.push(["measureGroup", this.measureGroup.toString()]);
    if (this.numberFormat !== undefined) out.push(["numberFormat", this.numberFormat.toString()]);
    if (this.measure !== undefined) out.push(["measure", this.measure.toString()]);
    return out;
  }

}
