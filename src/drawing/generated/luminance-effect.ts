// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.LuminanceEffect

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Luminance.
 *
 * Element: `a:lum` */
export class LuminanceEffect extends OpenXmlLeafElement {
  override readonly localName = "lum" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Brightness (:bright) */
  brightness: Int32Value | undefined;

  /** Contrast (:contrast) */
  contrast: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bright": this.brightness = Int32Value.parse(value); assertNumber(this.brightness, { min: -100000, max: 100000 }, { attribute: ":bright", elementClass: "LuminanceEffect" }); return;
      case "contrast": this.contrast = Int32Value.parse(value); assertNumber(this.contrast, { min: -100000, max: 100000 }, { attribute: ":contrast", elementClass: "LuminanceEffect" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.brightness !== undefined) out.push(["bright", this.brightness.toString()]);
    if (this.contrast !== undefined) out.push(["contrast", this.contrast.toString()]);
    return out;
  }

}
