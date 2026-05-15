// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Paragraph

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the Paragraph Class.
 *
 * Element: `w:p` */
export class Paragraph extends OpenXmlCompositeElement {
  override readonly localName = "p" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Identifier for Paragraph Glyph Formatting (w:rsidRPr) */
  rsidParagraphMarkRevision: HexBinaryValue | undefined;

  /** Revision Identifier for Paragraph (w:rsidR) */
  rsidParagraphAddition: HexBinaryValue | undefined;

  /** Revision Identifier for Paragraph Deletion (w:rsidDel) */
  rsidParagraphDeletion: HexBinaryValue | undefined;

  /** Revision Identifier for Paragraph Properties (w:rsidP) */
  rsidParagraphProperties: HexBinaryValue | undefined;

  /** Default Revision Identifier for Runs (w:rsidRDefault) */
  rsidRunAdditionDefault: HexBinaryValue | undefined;

  /** paraId (w14:paraId) */
  paragraphId: HexBinaryValue | undefined;

  /** textId (w14:textId) */
  textId: HexBinaryValue | undefined;

  /** noSpellErr (w14:noSpellErr) */
  noSpellError: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:rsidRPr": this.rsidParagraphMarkRevision = HexBinaryValue.parse(value); return;
      case "w:rsidR": this.rsidParagraphAddition = HexBinaryValue.parse(value); return;
      case "w:rsidDel": this.rsidParagraphDeletion = HexBinaryValue.parse(value); return;
      case "w:rsidP": this.rsidParagraphProperties = HexBinaryValue.parse(value); return;
      case "w:rsidRDefault": this.rsidRunAdditionDefault = HexBinaryValue.parse(value); return;
      case "w14:paraId": this.paragraphId = HexBinaryValue.parse(value); return;
      case "w14:textId": this.textId = HexBinaryValue.parse(value); return;
      case "w14:noSpellErr": this.noSpellError = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rsidParagraphMarkRevision !== undefined) out.push(["w:rsidRPr", this.rsidParagraphMarkRevision.toString()]);
    if (this.rsidParagraphAddition !== undefined) out.push(["w:rsidR", this.rsidParagraphAddition.toString()]);
    if (this.rsidParagraphDeletion !== undefined) out.push(["w:rsidDel", this.rsidParagraphDeletion.toString()]);
    if (this.rsidParagraphProperties !== undefined) out.push(["w:rsidP", this.rsidParagraphProperties.toString()]);
    if (this.rsidRunAdditionDefault !== undefined) out.push(["w:rsidRDefault", this.rsidRunAdditionDefault.toString()]);
    if (this.paragraphId !== undefined) out.push(["w14:paraId", this.paragraphId.toString()]);
    if (this.textId !== undefined) out.push(["w14:textId", this.textId.toString()]);
    if (this.noSpellError !== undefined) out.push(["w14:noSpellErr", this.noSpellError.toString()]);
    return out;
  }
}
