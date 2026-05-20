// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.TableSlicerCache

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the TableSlicerCache Class.
 *
 * Element: `x15:tableSlicerCache` */
export class TableSlicerCache extends OpenXmlCompositeElement {
  override readonly localName = "tableSlicerCache" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** tableId (:tableId) */
  tableId: UInt32Value | undefined;

  /** column (:column) */
  column: UInt32Value | undefined;

  /** sortOrder (:sortOrder) */
  sortOrder: StringValue | undefined;

  /** customListSort (:customListSort) */
  customListSort: BooleanValue | undefined;

  /** crossFilter (:crossFilter) */
  crossFilter: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "tableId": this.tableId = UInt32Value.parse(value); return;
      case "column": this.column = UInt32Value.parse(value); return;
      case "sortOrder": this.sortOrder = StringValue.parse(value); return;
      case "customListSort": this.customListSort = BooleanValue.parse(value); return;
      case "crossFilter": this.crossFilter = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.tableId !== undefined) out.push(["tableId", this.tableId.toString()]);
    if (this.column !== undefined) out.push(["column", this.column.toString()]);
    if (this.sortOrder !== undefined) out.push(["sortOrder", this.sortOrder.toString()]);
    if (this.customListSort !== undefined) out.push(["customListSort", this.customListSort.toString()]);
    if (this.crossFilter !== undefined) out.push(["crossFilter", this.crossFilter.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.tableId, { attribute: ":tableId", elementClass: "TableSlicerCache" });
    assertRequired(this.column, { attribute: ":column", elementClass: "TableSlicerCache" });
  }
}
