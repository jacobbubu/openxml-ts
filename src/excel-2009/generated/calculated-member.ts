// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.CalculatedMember

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the CalculatedMember Class.
 *
 * Element: `x14:calculatedMember` */
export class CalculatedMember extends OpenXmlCompositeElement {
  override readonly localName = "calculatedMember" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** displayFolder (:displayFolder) */
  displayFolder: StringValue | undefined;

  /** flattenHierarchies (:flattenHierarchies) */
  flattenHierarchies: BooleanValue | undefined;

  /** dynamicSet (:dynamicSet) */
  dynamicSet: BooleanValue | undefined;

  /** hierarchizeDistinct (:hierarchizeDistinct) */
  hierarchizeDistinct: BooleanValue | undefined;

  /** mdxLong (:mdxLong) */
  mdxLong: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "displayFolder": this.displayFolder = StringValue.parse(value); return;
      case "flattenHierarchies": this.flattenHierarchies = BooleanValue.parse(value); return;
      case "dynamicSet": this.dynamicSet = BooleanValue.parse(value); return;
      case "hierarchizeDistinct": this.hierarchizeDistinct = BooleanValue.parse(value); return;
      case "mdxLong": this.mdxLong = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.displayFolder !== undefined) out.push(["displayFolder", this.displayFolder.toString()]);
    if (this.flattenHierarchies !== undefined) out.push(["flattenHierarchies", this.flattenHierarchies.toString()]);
    if (this.dynamicSet !== undefined) out.push(["dynamicSet", this.dynamicSet.toString()]);
    if (this.hierarchizeDistinct !== undefined) out.push(["hierarchizeDistinct", this.hierarchizeDistinct.toString()]);
    if (this.mdxLong !== undefined) out.push(["mdxLong", this.mdxLong.toString()]);
    return out;
  }

}
