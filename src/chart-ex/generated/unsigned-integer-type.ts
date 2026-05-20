// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chartex.json
// @see DocumentFormat.OpenXml.ChartEx.UnsignedIntegerType

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Index of subtotal data point.
 *
 * Element: `cx:idx` */
export class UnsignedIntegerType extends OpenXmlLeafElement {
  override readonly localName = "idx" as const;
  override readonly prefix = "cx" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/chartex" as const;


  /** Integer Value (:val) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "UnsignedIntegerType" });
  }
}
