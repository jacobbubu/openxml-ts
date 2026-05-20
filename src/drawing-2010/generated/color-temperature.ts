// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.ColorTemperature

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Defines the ColorTemperature Class.
 *
 * Element: `a14:colorTemperature` */
export class ColorTemperature extends OpenXmlLeafElement {
  override readonly localName = "colorTemperature" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;


  /** colorTemp (:colorTemp) */
  colorTemperatureValue: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "colorTemp": this.colorTemperatureValue = Int32Value.parse(value); assertNumber(this.colorTemperatureValue, { min: 1500, max: 11500 }, { attribute: ":colorTemp", elementClass: "ColorTemperature" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.colorTemperatureValue !== undefined) out.push(["colorTemp", this.colorTemperatureValue.toString()]);
    return out;
  }

}
