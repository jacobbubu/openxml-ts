// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.BrightnessContrast

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the BrightnessContrast Class.
 *
 * Element: `a14:brightnessContrast` */
export class BrightnessContrast extends OpenXmlLeafElement {
  override readonly localName = "brightnessContrast" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** bright (:bright) */
  bright: Int32Value | undefined;

  /** contrast (:contrast) */
  contrast: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bright": this.bright = Int32Value.parse(value); assertNumber(this.bright, { min: -100000, max: 100000 }, { attribute: ":bright", elementClass: "BrightnessContrast" }); return;
      case "contrast": this.contrast = Int32Value.parse(value); assertNumber(this.contrast, { min: -100000, max: 100000 }, { attribute: ":contrast", elementClass: "BrightnessContrast" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.bright !== undefined) out.push(["bright", this.bright.toString()]);
    if (this.contrast !== undefined) out.push(["contrast", this.contrast.toString()]);
    return out;
  }

}
