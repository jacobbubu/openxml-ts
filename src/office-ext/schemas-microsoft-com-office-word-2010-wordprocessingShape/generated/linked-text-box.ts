// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingShape.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingShape.LinkedTextBox

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt16Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the LinkedTextBox Class.
 *
 * Element: `wps:linkedTxbx` */
export class LinkedTextBox extends OpenXmlCompositeElement {
  override readonly localName = "linkedTxbx" as const;
  override readonly prefix = "wps" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt16Value | undefined;

  /** seq (:seq) */
  sequence: UInt16Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt16Value.parse(value); return;
      case "seq": this.sequence = UInt16Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.sequence !== undefined) out.push(["seq", this.sequence.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "LinkedTextBox" });
    assertRequired(this.sequence, { attribute: ":seq", elementClass: "LinkedTextBox" });
  }
}
