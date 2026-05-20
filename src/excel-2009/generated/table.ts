// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.Table

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Table Class.
 *
 * Element: `x14:table` */
export class Table extends OpenXmlLeafElement {
  override readonly localName = "table" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** altText (:altText) */
  altText: StringValue | undefined;

  /** altTextSummary (:altTextSummary) */
  altTextSummary: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "altText": this.altText = StringValue.parse(value); return;
      case "altTextSummary": this.altTextSummary = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.altText !== undefined) out.push(["altText", this.altText.toString()]);
    if (this.altTextSummary !== undefined) out.push(["altTextSummary", this.altTextSummary.toString()]);
    return out;
  }

}
