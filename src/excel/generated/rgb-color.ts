// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RgbColor

import {
  HexBinaryValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** RGB Color.
 *
 * Element: `x:rgbColor` */
export class RgbColor extends OpenXmlLeafElement {
  override readonly localName = "rgbColor" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Alpha Red Green Blue (:rgb) */
  rgb: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rgb": this.rgb = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rgb !== undefined) out.push(["rgb", this.rgb.toString()]);
    return out;
  }

}
