// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.RecordIncluded

import {
  OnOffValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the RecordIncluded Class.
 *
 * Element: `wne:active` */
export class RecordIncluded extends OpenXmlLeafElement {
  override readonly localName = "active" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** val (wne:val) */
  val: OnOffValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:val": this.val = OnOffValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["wne:val", this.val.toString()]);
    return out;
  }

}
