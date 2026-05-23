// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata2.RichSortCondition

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RichSortCondition Class.
 *
 * Element: `xlrd2:richSortCondition` */
export class RichSortCondition extends OpenXmlLeafElement {
  override readonly localName = "richSortCondition" as const;
  override readonly prefix = "xlrd2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata2" as const;


  /** richSortKey (:richSortKey) */
  richSortKey: StringValue | undefined;

  /** descending (:descending) */
  descending: BooleanValue | undefined;

  /** sortBy (:sortBy) */
  sortBy: StringValue | undefined;

  /** ref (:ref) */
  reference: StringValue | undefined;

  /** customList (:customList) */
  customList: StringValue | undefined;

  /** dxfId (:dxfId) */
  formatId: UInt32Value | undefined;

  /** iconSet (:iconSet) */
  iconSet: StringValue | undefined;

  /** iconId (:iconId) */
  iconId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "richSortKey": this.richSortKey = StringValue.parse(value); return;
      case "descending": this.descending = BooleanValue.parse(value); return;
      case "sortBy": this.sortBy = StringValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
      case "customList": this.customList = StringValue.parse(value); return;
      case "dxfId": this.formatId = UInt32Value.parse(value); return;
      case "iconSet": this.iconSet = StringValue.parse(value); return;
      case "iconId": this.iconId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.richSortKey !== undefined) out.push(["richSortKey", this.richSortKey.toString()]);
    if (this.descending !== undefined) out.push(["descending", this.descending.toString()]);
    if (this.sortBy !== undefined) out.push(["sortBy", this.sortBy.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    if (this.customList !== undefined) out.push(["customList", this.customList.toString()]);
    if (this.formatId !== undefined) out.push(["dxfId", this.formatId.toString()]);
    if (this.iconSet !== undefined) out.push(["iconSet", this.iconSet.toString()]);
    if (this.iconId !== undefined) out.push(["iconId", this.iconId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.reference, { attribute: ":ref", elementClass: "RichSortCondition" });
  }
}
