// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.ServerFormat

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the ServerFormat Class.
 *
 * Element: `x15:serverFormat` */
export class ServerFormat extends OpenXmlLeafElement {
  override readonly localName = "serverFormat" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** Culture (:culture) */
  culture: StringValue | undefined;

  /** Format (:format) */
  format: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "culture": this.culture = StringValue.parse(value); return;
      case "format": this.format = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.culture !== undefined) out.push(["culture", this.culture.toString()]);
    if (this.format !== undefined) out.push(["format", this.format.toString()]);
    return out;
  }

}
