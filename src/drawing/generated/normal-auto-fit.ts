// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.NormalAutoFit

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Normal AutoFit.
 *
 * Element: `a:normAutofit` */
export class NormalAutoFit extends OpenXmlLeafElement {
  override readonly localName = "normAutofit" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Font Scale (:fontScale) */
  fontScale: Int32Value | undefined;

  /** Line Space Reduction (:lnSpcReduction) */
  lineSpaceReduction: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fontScale": this.fontScale = Int32Value.parse(value); assertNumber(this.fontScale, { min: 1000, max: 100000 }, { attribute: ":fontScale", elementClass: "NormalAutoFit" }); return;
      case "lnSpcReduction": this.lineSpaceReduction = Int32Value.parse(value); assertNumber(this.lineSpaceReduction, { min: 0, max: 13200000 }, { attribute: ":lnSpcReduction", elementClass: "NormalAutoFit" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.fontScale !== undefined) out.push(["fontScale", this.fontScale.toString()]);
    if (this.lineSpaceReduction !== undefined) out.push(["lnSpcReduction", this.lineSpaceReduction.toString()]);
    return out;
  }

}
