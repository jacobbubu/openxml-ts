// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.CacheHierarchy

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the CacheHierarchy Class.
 *
 * Element: `x14:cacheHierarchy` */
export class CacheHierarchy extends OpenXmlCompositeElement {
  override readonly localName = "cacheHierarchy" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** flattenHierarchies (:flattenHierarchies) */
  flattenHierarchies: BooleanValue | undefined;

  /** measuresSet (:measuresSet) */
  measuresSet: BooleanValue | undefined;

  /** hierarchizeDistinct (:hierarchizeDistinct) */
  hierarchizeDistinct: BooleanValue | undefined;

  /** ignore (:ignore) */
  ignore: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "flattenHierarchies": this.flattenHierarchies = BooleanValue.parse(value); return;
      case "measuresSet": this.measuresSet = BooleanValue.parse(value); return;
      case "hierarchizeDistinct": this.hierarchizeDistinct = BooleanValue.parse(value); return;
      case "ignore": this.ignore = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.flattenHierarchies !== undefined) out.push(["flattenHierarchies", this.flattenHierarchies.toString()]);
    if (this.measuresSet !== undefined) out.push(["measuresSet", this.measuresSet.toString()]);
    if (this.hierarchizeDistinct !== undefined) out.push(["hierarchizeDistinct", this.hierarchizeDistinct.toString()]);
    if (this.ignore !== undefined) out.push(["ignore", this.ignore.toString()]);
    return out;
  }

}
