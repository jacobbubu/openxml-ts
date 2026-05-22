// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.FontReference

import {
  ListValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the FontReference Class.
 *
 * Element: `cs:fontRef` */
export class FontReference extends OpenXmlCompositeElement {
  override readonly localName = "fontRef" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** idx (:idx) */
  index: StringValue | undefined;

  /** mods (:mods) */
  modifiers: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = StringValue.parse(value); return;
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
    assertRequired(this.index, { attribute: ":idx", elementClass: "FontReference" });
  }
}
