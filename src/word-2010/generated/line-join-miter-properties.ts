// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.LineJoinMiterProperties

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the LineJoinMiterProperties Class.
 *
 * Element: `w14:miter` */
export class LineJoinMiterProperties extends OpenXmlLeafElement {
  override readonly localName = "miter" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** lim (w14:lim) */
  limit: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:lim": this.limit = Int32Value.parse(value); assertNumber(this.limit, { min: 0 }, { attribute: "w14:lim", elementClass: "LineJoinMiterProperties" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.limit !== undefined) out.push(["w14:lim", this.limit.toString()]);
    return out;
  }

}
