// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CustomFilter

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Custom Filter Criteria.
 *
 * Element: `x:customFilter` */
export class CustomFilter extends OpenXmlLeafElement {
  override readonly localName = "customFilter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Filter Comparison Operator (:operator) */
  operator: StringValue | undefined;

  /** Top or Bottom Value (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":operator": this.operator = StringValue.parse(value); return;
      case ":val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.operator !== undefined) out.push([":operator", this.operator.toString()]);
    if (this.val !== undefined) out.push([":val", this.val.toString()]);
    return out;
  }

}
