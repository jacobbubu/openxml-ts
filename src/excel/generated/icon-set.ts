// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.IconSet

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Icon Set.
 *
 * Element: `x:iconSet` */
export class IconSet extends OpenXmlCompositeElement {
  override readonly localName = "iconSet" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Icon Set (:iconSet) */
  iconSetValue: StringValue | undefined;

  /** Show Value (:showValue) */
  showValue: BooleanValue | undefined;

  /** Percent (:percent) */
  percent: BooleanValue | undefined;

  /** Reverse Icons (:reverse) */
  reverse: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":iconSet": this.iconSetValue = StringValue.parse(value); return;
      case ":showValue": this.showValue = BooleanValue.parse(value); return;
      case ":percent": this.percent = BooleanValue.parse(value); return;
      case ":reverse": this.reverse = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.iconSetValue !== undefined) out.push([":iconSet", this.iconSetValue.toString()]);
    if (this.showValue !== undefined) out.push([":showValue", this.showValue.toString()]);
    if (this.percent !== undefined) out.push([":percent", this.percent.toString()]);
    if (this.reverse !== undefined) out.push([":reverse", this.reverse.toString()]);
    return out;
  }

}
