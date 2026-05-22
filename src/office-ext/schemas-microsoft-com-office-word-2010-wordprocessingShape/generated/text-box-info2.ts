// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordprocessingShape.json
// @see DocumentFormat.OpenXml.Word2010WordprocessingShape.TextBoxInfo2

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt16Value,
} from "../../../element/index.js";

/** Defines the TextBoxInfo2 Class.
 *
 * Element: `wps:txbx` */
export class TextBoxInfo2 extends OpenXmlCompositeElement {
  override readonly localName = "txbx" as const;
  override readonly prefix = "wps" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordprocessingShape" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt16Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt16Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

}
