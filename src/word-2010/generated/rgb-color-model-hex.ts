// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.RgbColorModelHex

import {
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertRequired,
} from "../../element/index.js";

/** Defines the RgbColorModelHex Class.
 *
 * Element: `w14:srgbClr` */
export class RgbColorModelHex extends OpenXmlCompositeElement {
  override readonly localName = "srgbClr" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** val (w14:val) */
  val: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:val": this.val = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w14:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w14:val", elementClass: "RgbColorModelHex" });
  }
}
