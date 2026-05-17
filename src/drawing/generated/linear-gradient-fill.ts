// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.LinearGradientFill

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Linear Gradient Fill.
 *
 * Element: `a:lin` */
export class LinearGradientFill extends OpenXmlLeafElement {
  override readonly localName = "lin" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Angle (:ang) */
  angle: Int32Value | undefined;

  /** Scaled (:scaled) */
  scaled: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":ang": this.angle = Int32Value.parse(value); assertNumber(this.angle, { min: 0 }, { attribute: ":ang", elementClass: "LinearGradientFill" }); return;
      case ":scaled": this.scaled = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.angle !== undefined) out.push([":ang", this.angle.toString()]);
    if (this.scaled !== undefined) out.push([":scaled", this.scaled.toString()]);
    return out;
  }

}
