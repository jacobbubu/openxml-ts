// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.FreezePanes

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the FreezePanes Class.
 *
 * Element: `xr:freezePanes` */
export class FreezePanes extends OpenXmlLeafElement {
  override readonly localName = "freezePanes" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** sheetViewUid (:sheetViewUid) */
  sheetViewUid: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sheetViewUid": this.sheetViewUid = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetViewUid !== undefined) out.push(["sheetViewUid", this.sheetViewUid.toString()]);
    return out;
  }

}
