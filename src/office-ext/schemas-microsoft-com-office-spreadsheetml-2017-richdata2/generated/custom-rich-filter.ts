// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.CustomRichFilter

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the CustomRichFilter Class.
 *
 * Element: `xlrd2:customFilter` */
export class CustomRichFilter extends OpenXmlLeafElement {
  override readonly localName = "customFilter" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** Filter Comparison Operator (:operator) */
  operator: StringValue | undefined;

  /** Top or Bottom Value (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "operator": this.operator = StringValue.parse(value); return;
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.operator !== undefined) out.push(["operator", this.operator.toString()]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
