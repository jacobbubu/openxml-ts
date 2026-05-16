// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RangeSet

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Range Set.
 *
 * Element: `x:rangeSet` */
export class RangeSet extends OpenXmlLeafElement {
  override readonly localName = "rangeSet" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Field Item Index Page 1 (:i1) */
  fieldItemIndexPage1: UInt32Value | undefined;

  /** Field Item Index Page 2 (:i2) */
  fieldItemIndexPage2: UInt32Value | undefined;

  /** Field Item index Page 3 (:i3) */
  fieldItemIndexPage3: UInt32Value | undefined;

  /** Field Item Index Page 4 (:i4) */
  fieldItemIndexPage4: UInt32Value | undefined;

  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** Named Range (:name) */
  name: StringValue | undefined;

  /** Sheet Name (:sheet) */
  sheet: StringValue | undefined;

  /** Relationship Id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":i1": this.fieldItemIndexPage1 = UInt32Value.parse(value); return;
      case ":i2": this.fieldItemIndexPage2 = UInt32Value.parse(value); return;
      case ":i3": this.fieldItemIndexPage3 = UInt32Value.parse(value); return;
      case ":i4": this.fieldItemIndexPage4 = UInt32Value.parse(value); return;
      case ":ref": this.reference = StringValue.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":sheet": this.sheet = StringValue.parse(value); return;
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fieldItemIndexPage1 !== undefined) out.push([":i1", this.fieldItemIndexPage1.toString()]);
    if (this.fieldItemIndexPage2 !== undefined) out.push([":i2", this.fieldItemIndexPage2.toString()]);
    if (this.fieldItemIndexPage3 !== undefined) out.push([":i3", this.fieldItemIndexPage3.toString()]);
    if (this.fieldItemIndexPage4 !== undefined) out.push([":i4", this.fieldItemIndexPage4.toString()]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.sheet !== undefined) out.push([":sheet", this.sheet.toString()]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

}
