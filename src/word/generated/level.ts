// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Level

import {
  BooleanValue,
  HexBinaryValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Numbering Level Definition.
 *
 * Element: `w:lvl` */
export class Level extends OpenXmlCompositeElement {
  override readonly localName = "lvl" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Numbering Level (w:ilvl) */
  levelIndex: Int32Value | undefined;

  /** Template Code (w:tplc) */
  templateCode: HexBinaryValue | undefined;

  /** Tentative Numbering (w:tentative) */
  tentative: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:ilvl": this.levelIndex = Int32Value.parse(value); return;
      case "w:tplc": this.templateCode = HexBinaryValue.parse(value); return;
      case "w:tentative": this.tentative = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.levelIndex !== undefined) out.push(["w:ilvl", this.levelIndex.toString()]);
    if (this.templateCode !== undefined) out.push(["w:tplc", this.templateCode.toString()]);
    if (this.tentative !== undefined) out.push(["w:tentative", this.tentative.toString()]);
    return out;
  }
}
