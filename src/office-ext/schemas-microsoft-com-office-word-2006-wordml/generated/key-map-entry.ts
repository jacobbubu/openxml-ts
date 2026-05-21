// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2006_wordml.json
// @see DocumentFormat.OpenXml.Word2006Wordml.KeyMapEntry

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the KeyMapEntry Class.
 *
 * Element: `wne:keymap` */
export class KeyMapEntry extends OpenXmlCompositeElement {
  override readonly localName = "keymap" as const;
  override readonly prefix = "wne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2006/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** chmPrimary (wne:chmPrimary) */
  characterMapPrimary: HexBinaryValue | undefined;

  /** chmSecondary (wne:chmSecondary) */
  characterMapSecondary: HexBinaryValue | undefined;

  /** kcmPrimary (wne:kcmPrimary) */
  keyCodePrimary: HexBinaryValue | undefined;

  /** kcmSecondary (wne:kcmSecondary) */
  keyCodeSecondary: HexBinaryValue | undefined;

  /** mask (wne:mask) */
  mask: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "wne:chmPrimary": this.characterMapPrimary = HexBinaryValue.parse(value); return;
      case "wne:chmSecondary": this.characterMapSecondary = HexBinaryValue.parse(value); return;
      case "wne:kcmPrimary": this.keyCodePrimary = HexBinaryValue.parse(value); return;
      case "wne:kcmSecondary": this.keyCodeSecondary = HexBinaryValue.parse(value); return;
      case "wne:mask": this.mask = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.characterMapPrimary !== undefined) out.push(["wne:chmPrimary", this.characterMapPrimary.toString()]);
    if (this.characterMapSecondary !== undefined) out.push(["wne:chmSecondary", this.characterMapSecondary.toString()]);
    if (this.keyCodePrimary !== undefined) out.push(["wne:kcmPrimary", this.keyCodePrimary.toString()]);
    if (this.keyCodeSecondary !== undefined) out.push(["wne:kcmSecondary", this.keyCodeSecondary.toString()]);
    if (this.mask !== undefined) out.push(["wne:mask", this.mask.toString()]);
    return out;
  }

}
