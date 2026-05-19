// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Members

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Members.
 *
 * Element: `x:members` */
export class Members extends OpenXmlCompositeElement {
  override readonly localName = "members" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Item Count (:count) */
  count: UInt32Value | undefined;

  /** Hierarchy Level (:level) */
  level: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "count": this.count = UInt32Value.parse(value); return;
      case "level": this.level = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    if (this.level !== undefined) out.push(["level", this.level.toString()]);
    return out;
  }

}
