// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordprocessingDrawing.json
// @see DocumentFormat.OpenXml.Word2012WordprocessingDrawing.WebVideoProperty

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../../element/index.js";

/** Defines the WebVideoProperty Class.
 *
 * Element: `wp15:webVideoPr` */
export class WebVideoProperty extends OpenXmlLeafElement {
  override readonly localName = "webVideoPr" as const;
  override readonly prefix = "wp15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordprocessingDrawing" as const;


  /** embeddedHtml (:embeddedHtml) */
  embeddedHtml: StringValue | undefined;

  /** h (:h) */
  height: UInt32Value | undefined;

  /** w (:w) */
  width: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "embeddedHtml": this.embeddedHtml = StringValue.parse(value); return;
      case "h": this.height = UInt32Value.parse(value); return;
      case "w": this.width = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.embeddedHtml !== undefined) out.push(["embeddedHtml", this.embeddedHtml.toString()]);
    if (this.height !== undefined) out.push(["h", this.height.toString()]);
    if (this.width !== undefined) out.push(["w", this.width.toString()]);
    return out;
  }

}
