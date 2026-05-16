// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ServerFormat

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Server Format.
 *
 * Element: `x:serverFormat` */
export class ServerFormat extends OpenXmlLeafElement {
  override readonly localName = "serverFormat" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Culture (:culture) */
  culture: StringValue | undefined;

  /** Format (:format) */
  format: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":culture": this.culture = StringValue.parse(value); return;
      case ":format": this.format = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.culture !== undefined) out.push([":culture", this.culture.toString()]);
    if (this.format !== undefined) out.push([":format", this.format.toString()]);
    return out;
  }

}
