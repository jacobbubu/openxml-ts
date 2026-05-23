// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_pivot2023Calculation.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023Pivot2023Calculation.SubtotalPivotItemSubtotal

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SubtotalPivotItemSubtotal Class.
 *
 * Element: `xlpcalc:subtotal` */
export class SubtotalPivotItemSubtotal extends OpenXmlLeafElement {
  override readonly localName = "subtotal" as const;
  override readonly prefix = "xlpcalc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation" as const;


  /** subtotalType (:subtotalType) */
  subtotalType: StringValue | undefined;

  /** itemLocation (:itemLocation) */
  itemLocation: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "subtotalType": this.subtotalType = StringValue.parse(value); return;
      case "itemLocation": this.itemLocation = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.subtotalType !== undefined) out.push(["subtotalType", this.subtotalType.toString()]);
    if (this.itemLocation !== undefined) out.push(["itemLocation", this.itemLocation.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.subtotalType, { attribute: ":subtotalType", elementClass: "SubtotalPivotItemSubtotal" });
    assertRequired(this.itemLocation, { attribute: ":itemLocation", elementClass: "SubtotalPivotItemSubtotal" });
  }
}
