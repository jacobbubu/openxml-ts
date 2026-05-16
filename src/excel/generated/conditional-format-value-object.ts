// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.ConditionalFormatValueObject

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Conditional Format Value Object.
 *
 * Element: `x:cfvo` */
export class ConditionalFormatValueObject extends OpenXmlCompositeElement {
  override readonly localName = "cfvo" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Type (:type) */
  type: StringValue | undefined;

  /** Value (:val) */
  val: StringValue | undefined;

  /** Greater Than Or Equal (:gte) */
  greaterThanOrEqual: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":type": this.type = StringValue.parse(value); return;
      case ":val": this.val = StringValue.parse(value); return;
      case ":gte": this.greaterThanOrEqual = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.val !== undefined) out.push([":val", this.val.toString()]);
    if (this.greaterThanOrEqual !== undefined) out.push([":gte", this.greaterThanOrEqual.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.type, { attribute: ":type", elementClass: "ConditionalFormatValueObject" });
  }
}
