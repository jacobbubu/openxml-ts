// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Break

import {
  BooleanValue,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Break.
 *
 * Element: `x:brk` */
export class Break extends OpenXmlLeafElement {
  override readonly localName = "brk" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Id (:id) */
  id: UInt32Value | undefined;

  /** Minimum (:min) */
  min: UInt32Value | undefined;

  /** Maximum (:max) */
  max: UInt32Value | undefined;

  /** Manual Page Break (:man) */
  manualPageBreak: BooleanValue | undefined;

  /** Pivot-Created Page Break (:pt) */
  pivotTablePageBreak: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "min": this.min = UInt32Value.parse(value); return;
      case "max": this.max = UInt32Value.parse(value); return;
      case "man": this.manualPageBreak = BooleanValue.parse(value); return;
      case "pt": this.pivotTablePageBreak = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.min !== undefined) out.push(["min", this.min.toString()]);
    if (this.max !== undefined) out.push(["max", this.max.toString()]);
    if (this.manualPageBreak !== undefined) out.push(["man", this.manualPageBreak.toString()]);
    if (this.pivotTablePageBreak !== undefined) out.push(["pt", this.pivotTablePageBreak.toString()]);
    return out;
  }

}
