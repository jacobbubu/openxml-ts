// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.HslColor

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** HSL.
 *
 * Element: `p:hsl` */
export class HslColor extends OpenXmlLeafElement {
  override readonly localName = "hsl" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Hue (:h) */
  hue: Int32Value | undefined;

  /** Saturation (:s) */
  saturation: Int32Value | undefined;

  /** Lightness (:l) */
  lightness: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "h": this.hue = Int32Value.parse(value); return;
      case "s": this.saturation = Int32Value.parse(value); assertNumber(this.saturation, { min: -100000, max: 100000 }, { attribute: ":s", elementClass: "HslColor" }); return;
      case "l": this.lightness = Int32Value.parse(value); assertNumber(this.lightness, { min: -100000, max: 100000 }, { attribute: ":l", elementClass: "HslColor" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.hue !== undefined) out.push(["h", this.hue.toString()]);
    if (this.saturation !== undefined) out.push(["s", this.saturation.toString()]);
    if (this.lightness !== undefined) out.push(["l", this.lightness.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.hue, { attribute: ":h", elementClass: "HslColor" });
    assertRequired(this.saturation, { attribute: ":s", elementClass: "HslColor" });
    assertRequired(this.lightness, { attribute: ":l", elementClass: "HslColor" });
  }
}
