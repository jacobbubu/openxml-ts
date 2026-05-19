// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SortCondition

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the SortCondition Class.
 *
 * Element: `x:sortCondition` */
export class SortCondition extends OpenXmlLeafElement {
  override readonly localName = "sortCondition" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Descending (:descending) */
  descending: BooleanValue | undefined;

  /** Sort By (:sortBy) */
  sortBy: StringValue | undefined;

  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** Custom List (:customList) */
  customList: StringValue | undefined;

  /** Format Id (:dxfId) */
  formatId: UInt32Value | undefined;

  /** Icon Set (:iconSet) */
  iconSet: StringValue | undefined;

  /** Icon Id (:iconId) */
  iconId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
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

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
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
    assertRequired(this.reference, { attribute: ":ref", elementClass: "SortCondition" });
  }
}
