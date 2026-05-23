// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2017_richdata.json
// @see DocumentFormat.OpenXml.Spreadsheetml2017Richdata.RichValue

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RichValue Class.
 *
 * Element: `xlrd:rv` */
export class RichValue extends OpenXmlCompositeElement {
  override readonly localName = "rv" as const;
  override readonly prefix = "xlrd" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2017/richdata" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** s (:s) */
  s: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "s": this.s = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.s !== undefined) out.push(["s", this.s.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.s, { attribute: ":s", elementClass: "RichValue" });
  }
}
