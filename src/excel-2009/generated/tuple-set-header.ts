// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.TupleSetHeader

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the TupleSetHeader Class.
 *
 * Element: `x14:header` */
export class TupleSetHeader extends OpenXmlLeafElement {
  override readonly localName = "header" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** uniqueName (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** hierarchyName (:hierarchyName) */
  hierarchyName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "hierarchyName": this.hierarchyName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.hierarchyName !== undefined) out.push(["hierarchyName", this.hierarchyName.toString()]);
    return out;
  }

}
