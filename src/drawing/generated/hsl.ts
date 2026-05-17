// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Hsl

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Hue Saturation Luminance Effect.
 *
 * Element: `a:hsl` */
export class Hsl extends OpenXmlLeafElement {
  override readonly localName = "hsl" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Hue (:hue) */
  hue: Int32Value | undefined;

  /** Saturation (:sat) */
  saturation: Int32Value | undefined;

  /** Luminance (:lum) */
  luminance: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":hue": this.hue = Int32Value.parse(value); assertNumber(this.hue, { min: 0 }, { attribute: ":hue", elementClass: "Hsl" }); return;
      case ":sat": this.saturation = Int32Value.parse(value); assertNumber(this.saturation, { min: -100000, max: 100000 }, { attribute: ":sat", elementClass: "Hsl" }); return;
      case ":lum": this.luminance = Int32Value.parse(value); assertNumber(this.luminance, { min: -100000, max: 100000 }, { attribute: ":lum", elementClass: "Hsl" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hue !== undefined) out.push([":hue", this.hue.toString()]);
    if (this.saturation !== undefined) out.push([":sat", this.saturation.toString()]);
    if (this.luminance !== undefined) out.push([":lum", this.luminance.toString()]);
    return out;
  }

}
