// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Fonts

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Defines the Fonts Class.
 *
 * Element: `x:fonts` */
export class Fonts extends OpenXmlCompositeElement {
  override readonly localName = "fonts" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Font Count (:count) */
  count: UInt32Value | undefined;

  /** knownFonts (x14ac:knownFonts) */
  knownFonts: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":count": this.count = UInt32Value.parse(value); return;
      case "x14ac:knownFonts": this.knownFonts = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.count !== undefined) out.push([":count", this.count.toString()]);
    if (this.knownFonts !== undefined) out.push(["x14ac:knownFonts", this.knownFonts.toString()]);
    return out;
  }

}
