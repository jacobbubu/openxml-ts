// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.TabularSlicerCache

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the TabularSlicerCache Class.
 *
 * Element: `x14:tabular` */
export class TabularSlicerCache extends OpenXmlCompositeElement {
  override readonly localName = "tabular" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** pivotCacheId (:pivotCacheId) */
  pivotCacheId: UInt32Value | undefined;

  /** sortOrder (:sortOrder) */
  sortOrder: StringValue | undefined;

  /** customListSort (:customListSort) */
  customListSort: BooleanValue | undefined;

  /** showMissing (:showMissing) */
  showMissing: BooleanValue | undefined;

  /** crossFilter (:crossFilter) */
  crossFilter: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pivotCacheId": this.pivotCacheId = UInt32Value.parse(value); return;
      case "sortOrder": this.sortOrder = StringValue.parse(value); return;
      case "customListSort": this.customListSort = BooleanValue.parse(value); return;
      case "showMissing": this.showMissing = BooleanValue.parse(value); return;
      case "crossFilter": this.crossFilter = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pivotCacheId !== undefined) out.push(["pivotCacheId", this.pivotCacheId.toString()]);
    if (this.sortOrder !== undefined) out.push(["sortOrder", this.sortOrder.toString()]);
    if (this.customListSort !== undefined) out.push(["customListSort", this.customListSort.toString()]);
    if (this.showMissing !== undefined) out.push(["showMissing", this.showMissing.toString()]);
    if (this.crossFilter !== undefined) out.push(["crossFilter", this.crossFilter.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.pivotCacheId, { attribute: ":pivotCacheId", elementClass: "TabularSlicerCache" });
  }
}
