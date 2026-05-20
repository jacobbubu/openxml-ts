// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotCacheDecoupled

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the PivotCacheDecoupled Class.
 *
 * Element: `x15:pivotCacheDecoupled` */
export class PivotCacheDecoupled extends OpenXmlLeafElement {
  override readonly localName = "pivotCacheDecoupled" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** decoupled (:decoupled) */
  decoupled: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "decoupled": this.decoupled = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.decoupled !== undefined) out.push(["decoupled", this.decoupled.toString()]);
    return out;
  }

}
