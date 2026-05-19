// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.BooleanItem

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Boolean.
 *
 * Element: `x:b` */
export class BooleanItem extends OpenXmlCompositeElement {
  override readonly localName = "b" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Value (:v) */
  val: BooleanValue | undefined;

  /** Unused Item (:u) */
  unused: BooleanValue | undefined;

  /** Calculated Item (:f) */
  calculated: BooleanValue | undefined;

  /** Caption (:c) */
  caption: StringValue | undefined;

  /** Member Property Count (:cp) */
  propertyCount: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v": this.val = BooleanValue.parse(value); return;
      case "u": this.unused = BooleanValue.parse(value); return;
      case "f": this.calculated = BooleanValue.parse(value); return;
      case "c": this.caption = StringValue.parse(value); return;
      case "cp": this.propertyCount = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["v", this.val.toString()]);
    if (this.unused !== undefined) out.push(["u", this.unused.toString()]);
    if (this.calculated !== undefined) out.push(["f", this.calculated.toString()]);
    if (this.caption !== undefined) out.push(["c", this.caption.toString()]);
    if (this.propertyCount !== undefined) out.push(["cp", this.propertyCount.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":v", elementClass: "BooleanItem" });
  }
}
