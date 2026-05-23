// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_featurepropertybag.json
// @see DocumentFormat.OpenXml.Spreadsheetml2022Featurepropertybag.XfComplement

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the XfComplement Class.
 *
 * Element: `xfpb:xfComplement` */
export class XfComplement extends OpenXmlLeafElement {
  override readonly localName = "xfComplement" as const;
  override readonly prefix = "xfpb" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag" as const;


  /** i (:i) */
  i: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "i": this.i = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.i !== undefined) out.push(["i", this.i.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.i, { attribute: ":i", elementClass: "XfComplement" });
  }
}
