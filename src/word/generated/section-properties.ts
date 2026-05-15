// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.SectionProperties

import {
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Section Properties.
 *
 * Element: `w:sectPr` */
export class SectionProperties extends OpenXmlCompositeElement {
  override readonly localName = "sectPr" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Physical Section Mark Character Revision ID (w:rsidRPr) */
  rsidRPr: HexBinaryValue | undefined;

  /** Section Deletion Revision ID (w:rsidDel) */
  rsidDel: HexBinaryValue | undefined;

  /** Section Addition Revision ID (w:rsidR) */
  rsidR: HexBinaryValue | undefined;

  /** Section Properties Revision ID (w:rsidSect) */
  rsidSect: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:rsidRPr": this.rsidRPr = HexBinaryValue.parse(value); return;
      case "w:rsidDel": this.rsidDel = HexBinaryValue.parse(value); return;
      case "w:rsidR": this.rsidR = HexBinaryValue.parse(value); return;
      case "w:rsidSect": this.rsidSect = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rsidRPr !== undefined) out.push(["w:rsidRPr", this.rsidRPr.toString()]);
    if (this.rsidDel !== undefined) out.push(["w:rsidDel", this.rsidDel.toString()]);
    if (this.rsidR !== undefined) out.push(["w:rsidR", this.rsidR.toString()]);
    if (this.rsidSect !== undefined) out.push(["w:rsidSect", this.rsidSect.toString()]);
    return out;
  }
}
