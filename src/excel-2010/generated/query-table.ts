// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.QueryTable

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the QueryTable Class.
 *
 * Element: `x15:queryTable` */
export class QueryTable extends OpenXmlLeafElement {
  override readonly localName = "queryTable" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** clipped (:clipped) */
  clipped: BooleanValue | undefined;

  /** sourceDataName (:sourceDataName) */
  sourceDataName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "clipped": this.clipped = BooleanValue.parse(value); return;
      case "sourceDataName": this.sourceDataName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.clipped !== undefined) out.push(["clipped", this.clipped.toString()]);
    if (this.sourceDataName !== undefined) out.push(["sourceDataName", this.sourceDataName.toString()]);
    return out;
  }

}
