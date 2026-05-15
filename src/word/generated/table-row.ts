// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.TableRow

import {
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Table Row.
 *
 * Element: `w:tr` */
export class TableRow extends OpenXmlCompositeElement {
  override readonly localName = "tr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Identifier for Table Row Glyph Formatting (w:rsidRPr) */
  rsidTableRowMarkRevision: HexBinaryValue | undefined;

  /** Revision Identifier for Table Row (w:rsidR) */
  rsidTableRowAddition: HexBinaryValue | undefined;

  /** Revision Identifier for Table Row Deletion (w:rsidDel) */
  rsidTableRowDeletion: HexBinaryValue | undefined;

  /** Revision Identifier for Table Row Properties (w:rsidTr) */
  rsidTableRowProperties: HexBinaryValue | undefined;

  /** paraId (w14:paraId) */
  paragraphId: HexBinaryValue | undefined;

  /** textId (w14:textId) */
  textId: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:rsidRPr": this.rsidTableRowMarkRevision = HexBinaryValue.parse(value); return;
      case "w:rsidR": this.rsidTableRowAddition = HexBinaryValue.parse(value); return;
      case "w:rsidDel": this.rsidTableRowDeletion = HexBinaryValue.parse(value); return;
      case "w:rsidTr": this.rsidTableRowProperties = HexBinaryValue.parse(value); return;
      case "w14:paraId": this.paragraphId = HexBinaryValue.parse(value); return;
      case "w14:textId": this.textId = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rsidTableRowMarkRevision !== undefined) out.push(["w:rsidRPr", this.rsidTableRowMarkRevision.toString()]);
    if (this.rsidTableRowAddition !== undefined) out.push(["w:rsidR", this.rsidTableRowAddition.toString()]);
    if (this.rsidTableRowDeletion !== undefined) out.push(["w:rsidDel", this.rsidTableRowDeletion.toString()]);
    if (this.rsidTableRowProperties !== undefined) out.push(["w:rsidTr", this.rsidTableRowProperties.toString()]);
    if (this.paragraphId !== undefined) out.push(["w14:paraId", this.paragraphId.toString()]);
    if (this.textId !== undefined) out.push(["w14:textId", this.textId.toString()]);
    return out;
  }
}
