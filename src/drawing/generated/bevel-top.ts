// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.BevelTop

import {
  Int64Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Top Bevel.
 *
 * Element: `a:bevelT` */
export class BevelTop extends OpenXmlLeafElement {
  override readonly localName = "bevelT" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Width (:w) */
  width: Int64Value | undefined;

  /** Height (:h) */
  height: Int64Value | undefined;

  /** Preset Bevel (:prst) */
  preset: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w": this.width = Int64Value.parse(value); assertNumber(this.width, { min: 0, max: 2147483647 }, { attribute: ":w", elementClass: "BevelTop" }); return;
      case "h": this.height = Int64Value.parse(value); assertNumber(this.height, { min: 0, max: 2147483647 }, { attribute: ":h", elementClass: "BevelTop" }); return;
      case "prst": this.preset = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.width !== undefined) out.push(["w", this.width.toString()]);
    if (this.height !== undefined) out.push(["h", this.height.toString()]);
    if (this.preset !== undefined) out.push(["prst", this.preset.toString()]);
    return out;
  }

}
