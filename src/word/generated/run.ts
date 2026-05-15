// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Run

import {
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Phonetic Guide Text Run.
 *
 * Element: `w:r` */
export class Run extends OpenXmlCompositeElement {
  override readonly localName = "r" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Identifier for Run Properties (w:rsidRPr) */
  rsidRunProperties: HexBinaryValue | undefined;

  /** Revision Identifier for Run Deletion (w:rsidDel) */
  rsidRunDeletion: HexBinaryValue | undefined;

  /** Revision Identifier for Run (w:rsidR) */
  rsidRunAddition: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:rsidRPr": this.rsidRunProperties = HexBinaryValue.parse(value); return;
      case "w:rsidDel": this.rsidRunDeletion = HexBinaryValue.parse(value); return;
      case "w:rsidR": this.rsidRunAddition = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rsidRunProperties !== undefined) out.push(["w:rsidRPr", this.rsidRunProperties.toString()]);
    if (this.rsidRunDeletion !== undefined) out.push(["w:rsidDel", this.rsidRunDeletion.toString()]);
    if (this.rsidRunAddition !== undefined) out.push(["w:rsidR", this.rsidRunAddition.toString()]);
    return out;
  }

}
