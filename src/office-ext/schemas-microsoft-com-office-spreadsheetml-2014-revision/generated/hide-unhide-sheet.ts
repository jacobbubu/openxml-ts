// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.HideUnhideSheet

import {
  BooleanValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the HideUnhideSheet Class.
 *
 * Element: `xr:hideUnhideSheet` */
export class HideUnhideSheet extends OpenXmlLeafElement {
  override readonly localName = "hideUnhideSheet" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;


  /** hide (:hide) */
  hide: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "hide": this.hide = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hide !== undefined) out.push(["hide", this.hide.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.hide, { attribute: ":hide", elementClass: "HideUnhideSheet" });
  }
}
