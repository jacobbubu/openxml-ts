// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.SlicerCacheHideItemsWithNoData

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Defines the SlicerCacheHideItemsWithNoData Class.
 *
 * Element: `x15:slicerCacheHideItemsWithNoData` */
export class SlicerCacheHideItemsWithNoData extends OpenXmlCompositeElement {
  override readonly localName = "slicerCacheHideItemsWithNoData" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "count": this.count = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

}
