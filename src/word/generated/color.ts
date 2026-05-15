// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Color

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Color Class.
 *
 * Element: `w:color` */
export class Color extends OpenXmlLeafElement {
  override readonly localName = "color" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Run Content Color (w:val) */
  val: StringValue | undefined;

  /** Run Content Theme Color (w:themeColor) */
  themeColor: StringValue | undefined;

  /** Run Content Theme Color Tint (w:themeTint) */
  themeTint: StringValue | undefined;

  /** Run Content Theme Color Shade (w:themeShade) */
  themeShade: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:themeColor": this.themeColor = StringValue.parse(value); return;
      case "w:themeTint": this.themeTint = StringValue.parse(value); return;
      case "w:themeShade": this.themeShade = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.themeColor !== undefined) out.push(["w:themeColor", this.themeColor.toString()]);
    if (this.themeTint !== undefined) out.push(["w:themeTint", this.themeTint.toString()]);
    if (this.themeShade !== undefined) out.push(["w:themeShade", this.themeShade.toString()]);
    return out;
  }
}
