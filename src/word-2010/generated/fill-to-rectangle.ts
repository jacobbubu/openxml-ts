// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.FillToRectangle

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the FillToRectangle Class.
 *
 * Element: `w14:fillToRect` */
export class FillToRectangle extends OpenXmlLeafElement {
  override readonly localName = "fillToRect" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** l (w14:l) */
  left: Int32Value | undefined;

  /** t (w14:t) */
  top: Int32Value | undefined;

  /** r (w14:r) */
  right: Int32Value | undefined;

  /** b (w14:b) */
  bottom: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:l": this.left = Int32Value.parse(value); return;
      case "w14:t": this.top = Int32Value.parse(value); return;
      case "w14:r": this.right = Int32Value.parse(value); return;
      case "w14:b": this.bottom = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push(["w14:l", this.left.toString()]);
    if (this.top !== undefined) out.push(["w14:t", this.top.toString()]);
    if (this.right !== undefined) out.push(["w14:r", this.right.toString()]);
    if (this.bottom !== undefined) out.push(["w14:b", this.bottom.toString()]);
    return out;
  }

}
