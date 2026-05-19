// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.RgbColor

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** RGB.
 *
 * Element: `p:rgb` */
export class RgbColor extends OpenXmlLeafElement {
  override readonly localName = "rgb" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Red (:r) */
  red: Int32Value | undefined;

  /** Green (:g) */
  green: Int32Value | undefined;

  /** Blue (:b) */
  blue: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r": this.red = Int32Value.parse(value); assertNumber(this.red, { min: -100000, max: 100000 }, { attribute: ":r", elementClass: "RgbColor" }); return;
      case "g": this.green = Int32Value.parse(value); assertNumber(this.green, { min: -100000, max: 100000 }, { attribute: ":g", elementClass: "RgbColor" }); return;
      case "b": this.blue = Int32Value.parse(value); assertNumber(this.blue, { min: -100000, max: 100000 }, { attribute: ":b", elementClass: "RgbColor" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.red !== undefined) out.push(["r", this.red.toString()]);
    if (this.green !== undefined) out.push(["g", this.green.toString()]);
    if (this.blue !== undefined) out.push(["b", this.blue.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.red, { attribute: ":r", elementClass: "RgbColor" });
    assertRequired(this.green, { attribute: ":g", elementClass: "RgbColor" });
    assertRequired(this.blue, { attribute: ":b", elementClass: "RgbColor" });
  }
}
