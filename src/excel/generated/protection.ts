// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Protection

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Protection.
 *
 * Element: `x:protection` */
export class Protection extends OpenXmlLeafElement {
  override readonly localName = "protection" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Cell Locked (:locked) */
  locked: BooleanValue | undefined;

  /** Hidden Cell (:hidden) */
  hidden: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":locked": this.locked = BooleanValue.parse(value); return;
      case ":hidden": this.hidden = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.locked !== undefined) out.push([":locked", this.locked.toString()]);
    if (this.hidden !== undefined) out.push([":hidden", this.hidden.toString()]);
    return out;
  }

}
