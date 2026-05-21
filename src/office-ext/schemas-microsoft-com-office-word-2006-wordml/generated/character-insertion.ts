// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.CharacterInsertion

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CharacterInsertion Class.
 *
 * Element: `wne:wch` */
export class CharacterInsertion extends OpenXmlLeafElement {
  override readonly localName = "wch" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;


  /** val (wne:val) */
  val: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:val": this.val = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["wne:val", this.val.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "wne:val", elementClass: "CharacterInsertion" });
  }
}
