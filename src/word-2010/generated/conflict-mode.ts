// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.ConflictMode

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the ConflictMode Class.
 *
 * Element: `w14:conflictMode` */
export class ConflictMode extends OpenXmlLeafElement {
  override readonly localName = "conflictMode" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;


  /** val (w14:val) */
  val: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:val": this.val = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w14:val", this.val.toString()]);
    return out;
  }

}
