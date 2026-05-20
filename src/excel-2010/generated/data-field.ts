// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.DataField

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the DataField Class.
 *
 * Element: `x15:dataField` */
export class DataField extends OpenXmlLeafElement {
  override readonly localName = "dataField" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** isCountDistinct (:isCountDistinct) */
  isCountDistinct: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isCountDistinct": this.isCountDistinct = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isCountDistinct !== undefined) out.push(["isCountDistinct", this.isCountDistinct.toString()]);
    return out;
  }

}
