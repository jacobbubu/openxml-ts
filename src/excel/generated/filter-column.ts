// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.FilterColumn

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** AutoFilter Column.
 *
 * Element: `x:filterColumn` */
export class FilterColumn extends OpenXmlCompositeElement {
  override readonly localName = "filterColumn" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Filter Column Data (:colId) */
  columnId: UInt32Value | undefined;

  /** Hidden AutoFilter Button (:hiddenButton) */
  hiddenButton: BooleanValue | undefined;

  /** Show Filter Button (:showButton) */
  showButton: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":colId": this.columnId = UInt32Value.parse(value); return;
      case ":hiddenButton": this.hiddenButton = BooleanValue.parse(value); return;
      case ":showButton": this.showButton = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.columnId !== undefined) out.push([":colId", this.columnId.toString()]);
    if (this.hiddenButton !== undefined) out.push([":hiddenButton", this.hiddenButton.toString()]);
    if (this.showButton !== undefined) out.push([":showButton", this.showButton.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.columnId, { attribute: ":colId", elementClass: "FilterColumn" });
  }
}
