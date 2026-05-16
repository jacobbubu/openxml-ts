// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.IconFilter

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Icon Filter.
 *
 * Element: `x:iconFilter` */
export class IconFilter extends OpenXmlLeafElement {
  override readonly localName = "iconFilter" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Icon Set (:iconSet) */
  iconSet: StringValue | undefined;

  /** Icon Id (:iconId) */
  iconId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":iconSet": this.iconSet = StringValue.parse(value); return;
      case ":iconId": this.iconId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.iconSet !== undefined) out.push([":iconSet", this.iconSet.toString()]);
    if (this.iconId !== undefined) out.push([":iconId", this.iconId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.iconSet, { attribute: ":iconSet", elementClass: "IconFilter" });
  }
}
