// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_word.json
// @see DocumentFormat.OpenXml.VmlWord.TextWrap

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Text Wrapping.
 *
 * Element: `w10:wrap` */
export class TextWrap extends OpenXmlLeafElement {
  override readonly localName = "wrap" as const;
  override readonly prefix = "w10" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:word" as const;


  /** Wrapping type (:type) */
  type: StringValue | undefined;

  /** Wrapping side (:side) */
  side: StringValue | undefined;

  /** Horizontal Positioning Base (:anchorx) */
  anchorX: StringValue | undefined;

  /** Vertical Positioning Base (:anchory) */
  anchorY: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "side": this.side = StringValue.parse(value); return;
      case "anchorx": this.anchorX = StringValue.parse(value); return;
      case "anchory": this.anchorY = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.side !== undefined) out.push(["side", this.side.toString()]);
    if (this.anchorX !== undefined) out.push(["anchorx", this.anchorX.toString()]);
    if (this.anchorY !== undefined) out.push(["anchory", this.anchorY.toString()]);
    return out;
  }

}
