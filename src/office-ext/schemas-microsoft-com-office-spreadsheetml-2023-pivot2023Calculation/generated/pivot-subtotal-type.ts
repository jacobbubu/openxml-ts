// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_pivot2023Calculation.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023Pivot2023Calculation.PivotSubtotalType

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PivotSubtotalType Class.
 *
 * Element: `xlpcalc:subtotal` */
export class PivotSubtotalType extends OpenXmlLeafElement {
  override readonly localName = "subtotal" as const;
  override readonly prefix = "xlpcalc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation" as const;


  /** subtotalType (:subtotalType) */
  subtotalType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "subtotalType": this.subtotalType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.subtotalType !== undefined) out.push(["subtotalType", this.subtotalType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.subtotalType, { attribute: ":subtotalType", elementClass: "PivotSubtotalType" });
  }
}
