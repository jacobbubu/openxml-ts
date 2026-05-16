// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Item

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** PivotTable Field Item.
 *
 * Element: `x:item` */
export class Item extends OpenXmlLeafElement {
  override readonly localName = "item" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Item User Caption (:n) */
  itemName: StringValue | undefined;

  /** Item Type (:t) */
  itemType: StringValue | undefined;

  /** Hidden (:h) */
  hidden: BooleanValue | undefined;

  /** Character (:s) */
  hasStringVlue: BooleanValue | undefined;

  /** Hide Details (:sd) */
  hideDetails: BooleanValue | undefined;

  /** Calculated Member (:f) */
  calculated: BooleanValue | undefined;

  /** Missing (:m) */
  missing: BooleanValue | undefined;

  /** Child Items (:c) */
  childItems: BooleanValue | undefined;

  /** Item Index (:x) */
  index: UInt32Value | undefined;

  /** Expanded (:d) */
  expanded: BooleanValue | undefined;

  /** Drill Across Attributes (:e) */
  drillAcrossAttributes: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":n": this.itemName = StringValue.parse(value); return;
      case ":t": this.itemType = StringValue.parse(value); return;
      case ":h": this.hidden = BooleanValue.parse(value); return;
      case ":s": this.hasStringVlue = BooleanValue.parse(value); return;
      case ":sd": this.hideDetails = BooleanValue.parse(value); return;
      case ":f": this.calculated = BooleanValue.parse(value); return;
      case ":m": this.missing = BooleanValue.parse(value); return;
      case ":c": this.childItems = BooleanValue.parse(value); return;
      case ":x": this.index = UInt32Value.parse(value); return;
      case ":d": this.expanded = BooleanValue.parse(value); return;
      case ":e": this.drillAcrossAttributes = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.itemName !== undefined) out.push([":n", this.itemName.toString()]);
    if (this.itemType !== undefined) out.push([":t", this.itemType.toString()]);
    if (this.hidden !== undefined) out.push([":h", this.hidden.toString()]);
    if (this.hasStringVlue !== undefined) out.push([":s", this.hasStringVlue.toString()]);
    if (this.hideDetails !== undefined) out.push([":sd", this.hideDetails.toString()]);
    if (this.calculated !== undefined) out.push([":f", this.calculated.toString()]);
    if (this.missing !== undefined) out.push([":m", this.missing.toString()]);
    if (this.childItems !== undefined) out.push([":c", this.childItems.toString()]);
    if (this.index !== undefined) out.push([":x", this.index.toString()]);
    if (this.expanded !== undefined) out.push([":d", this.expanded.toString()]);
    if (this.drillAcrossAttributes !== undefined) out.push([":e", this.drillAcrossAttributes.toString()]);
    return out;
  }

}
