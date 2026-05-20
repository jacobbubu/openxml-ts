// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotTableData

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the PivotTableData Class.
 *
 * Element: `x15:pivotTableData` */
export class PivotTableData extends OpenXmlCompositeElement {
  override readonly localName = "pivotTableData" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rowCount (:rowCount) */
  rowCount: UInt32Value | undefined;

  /** columnCount (:columnCount) */
  columnCount: UInt32Value | undefined;

  /** cacheId (:cacheId) */
  cacheId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rowCount": this.rowCount = UInt32Value.parse(value); return;
      case "columnCount": this.columnCount = UInt32Value.parse(value); return;
      case "cacheId": this.cacheId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rowCount !== undefined) out.push(["rowCount", this.rowCount.toString()]);
    if (this.columnCount !== undefined) out.push(["columnCount", this.columnCount.toString()]);
    if (this.cacheId !== undefined) out.push(["cacheId", this.cacheId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cacheId, { attribute: ":cacheId", elementClass: "PivotTableData" });
  }
}
