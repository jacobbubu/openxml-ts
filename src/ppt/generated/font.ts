// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Font

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Embedded Font Name.
 *
 * Element: `p:font` */
export class Font extends OpenXmlLeafElement {
  override readonly localName = "font" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Text Typeface (:typeface) */
  typeface: StringValue | undefined;

  /** Panose Setting (:panose) */
  panose: HexBinaryValue | undefined;

  /** Similar Font Family (:pitchFamily) */
  pitchFamily: StringValue | undefined;

  /** Similar Character Set (:charset) */
  characterSet: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "typeface": this.typeface = StringValue.parse(value); return;
      case "panose": this.panose = HexBinaryValue.parse(value); return;
      case "pitchFamily": this.pitchFamily = StringValue.parse(value); return;
      case "charset": this.characterSet = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.typeface !== undefined) out.push(["typeface", this.typeface.toString()]);
    if (this.panose !== undefined) out.push(["panose", this.panose.toString()]);
    if (this.pitchFamily !== undefined) out.push(["pitchFamily", this.pitchFamily.toString()]);
    if (this.characterSet !== undefined) out.push(["charset", this.characterSet.toString()]);
    return out;
  }

}
