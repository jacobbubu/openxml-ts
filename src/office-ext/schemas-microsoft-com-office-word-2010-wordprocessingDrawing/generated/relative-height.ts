// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingDrawing.RelativeHeight

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RelativeHeight Class.
 *
 * Element: `wp14:sizeRelV` */
export class RelativeHeight extends OpenXmlCompositeElement {
  override readonly localName = "sizeRelV" as const;
  override readonly prefix = "wp14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** relativeFrom (:relativeFrom) */
  relativeFrom: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "relativeFrom": this.relativeFrom = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.relativeFrom !== undefined) out.push(["relativeFrom", this.relativeFrom.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relativeFrom, { attribute: ":relativeFrom", elementClass: "RelativeHeight" });
  }
}
