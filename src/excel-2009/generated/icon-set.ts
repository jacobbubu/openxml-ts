// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.IconSet

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the IconSet Class.
 *
 * Element: `x14:iconSet` */
export class IconSet extends OpenXmlCompositeElement {
  override readonly localName = "iconSet" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** iconSet (:iconSet) */
  iconSetTypes: StringValue | undefined;

  /** showValue (:showValue) */
  showValue: BooleanValue | undefined;

  /** percent (:percent) */
  percent: BooleanValue | undefined;

  /** reverse (:reverse) */
  reverse: BooleanValue | undefined;

  /** custom (:custom) */
  custom: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "iconSet": this.iconSetTypes = StringValue.parse(value); return;
      case "showValue": this.showValue = BooleanValue.parse(value); return;
      case "percent": this.percent = BooleanValue.parse(value); return;
      case "reverse": this.reverse = BooleanValue.parse(value); return;
      case "custom": this.custom = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.iconSetTypes !== undefined) out.push(["iconSet", this.iconSetTypes.toString()]);
    if (this.showValue !== undefined) out.push(["showValue", this.showValue.toString()]);
    if (this.percent !== undefined) out.push(["percent", this.percent.toString()]);
    if (this.reverse !== undefined) out.push(["reverse", this.reverse.toString()]);
    if (this.custom !== undefined) out.push(["custom", this.custom.toString()]);
    return out;
  }

}
