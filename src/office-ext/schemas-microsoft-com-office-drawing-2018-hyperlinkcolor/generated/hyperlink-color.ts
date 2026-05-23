// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2018_hyperlinkcolor.json
// @see DocumentFormat.OpenXml.Drawing2018Hyperlinkcolor.HyperlinkColor

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the HyperlinkColor Class.
 *
 * Element: `ahyp:hlinkClr` */
export class HyperlinkColor extends OpenXmlLeafElement {
  override readonly localName = "hlinkClr" as const;
  override readonly prefix = "ahyp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2018/hyperlinkcolor" as const;


  /** val (:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: ":val", elementClass: "HyperlinkColor" });
  }
}
