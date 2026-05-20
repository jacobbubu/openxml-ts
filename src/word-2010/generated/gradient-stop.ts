// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.GradientStop

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the GradientStop Class.
 *
 * Element: `w14:gs` */
export class GradientStop extends OpenXmlCompositeElement {
  override readonly localName = "gs" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** pos (w14:pos) */
  stopPosition: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:pos": this.stopPosition = Int32Value.parse(value); assertNumber(this.stopPosition, { min: 0, max: 100000 }, { attribute: "w14:pos", elementClass: "GradientStop" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.stopPosition !== undefined) out.push(["w14:pos", this.stopPosition.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.stopPosition, { attribute: "w14:pos", elementClass: "GradientStop" });
  }
}
