// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.SupportingPropertyBagArrayValue

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the SupportingPropertyBagArrayValue Class.
 *
 * Element: `xlrd2:v` */
export class SupportingPropertyBagArrayValue extends OpenXmlLeafElement {
  override readonly localName = "v" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** t (:t) */
  t: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "t": this.t = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    return out;
  }

}
