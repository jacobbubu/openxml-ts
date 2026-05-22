// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.LineReference

import {
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the LineReference Class.
 *
 * Element: `cs:lnRef` */
export class LineReference extends OpenXmlCompositeElement {
  override readonly localName = "lnRef" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** idx (:idx) */
  index: UInt32Value | undefined;

  /** mods (:mods) */
  modifiers: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = UInt32Value.parse(value); return;
      case "mods": this.modifiers = ListValue.parse(value, StringValue.parse); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    if (this.modifiers !== undefined) out.push(["mods", this.modifiers.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":idx", elementClass: "LineReference" });
  }
}
