// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.TupleSetRowItem

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the TupleSetRowItem Class.
 *
 * Element: `x14:rowItem` */
export class TupleSetRowItem extends OpenXmlLeafElement {
  override readonly localName = "rowItem" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** u (:u) */
  uniqueName: StringValue | undefined;

  /** d (:d) */
  displayName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "u": this.uniqueName = StringValue.parse(value); return;
      case "d": this.displayName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueName !== undefined) out.push(["u", this.uniqueName.toString()]);
    if (this.displayName !== undefined) out.push(["d", this.displayName.toString()]);
    return out;
  }

}
