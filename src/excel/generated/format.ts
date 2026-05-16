// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Format

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** PivotTable Format.
 *
 * Element: `x:format` */
export class Format extends OpenXmlCompositeElement {
  override readonly localName = "format" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Format Action (:action) */
  action: StringValue | undefined;

  /** Format Id (:dxfId) */
  formatId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":action": this.action = StringValue.parse(value); return;
      case ":dxfId": this.formatId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.action !== undefined) out.push([":action", this.action.toString()]);
    if (this.formatId !== undefined) out.push([":dxfId", this.formatId.toString()]);
    return out;
  }

}
