// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingDrawing.RelativeWidth

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the RelativeWidth Class.
 *
 * Element: `wp14:sizeRelH` */
export class RelativeWidth extends OpenXmlCompositeElement {
  override readonly localName = "sizeRelH" as const;
  override readonly prefix = "wp14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** relativeFrom (:relativeFrom) */
  objectId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "relativeFrom": this.objectId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.objectId !== undefined) out.push(["relativeFrom", this.objectId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.objectId, { attribute: ":relativeFrom", elementClass: "RelativeWidth" });
  }
}
