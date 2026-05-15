// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Shading

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Shading Class.
 *
 * Element: `w:shd` */
export class Shading extends OpenXmlLeafElement {
  override readonly localName = "shd" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Shading Pattern (w:val) */
  val: StringValue | undefined;

  /** Shading Pattern Color (w:color) */
  color: StringValue | undefined;

  /** Shading Pattern Theme Color (w:themeColor) */
  themeColor: StringValue | undefined;

  /** Shading Pattern Theme Color Tint (w:themeTint) */
  themeTint: StringValue | undefined;

  /** Shading Pattern Theme Color Shade (w:themeShade) */
  themeShade: StringValue | undefined;

  /** Shading Background Color (w:fill) */
  fill: StringValue | undefined;

  /** Shading Background Theme Color (w:themeFill) */
  themeFill: StringValue | undefined;

  /** Shading Background Theme Color Tint (w:themeFillTint) */
  themeFillTint: StringValue | undefined;

  /** Shading Background Theme Color Shade (w:themeFillShade) */
  themeFillShade: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:color": this.color = StringValue.parse(value); return;
      case "w:themeColor": this.themeColor = StringValue.parse(value); return;
      case "w:themeTint": this.themeTint = StringValue.parse(value); return;
      case "w:themeShade": this.themeShade = StringValue.parse(value); return;
      case "w:fill": this.fill = StringValue.parse(value); return;
      case "w:themeFill": this.themeFill = StringValue.parse(value); return;
      case "w:themeFillTint": this.themeFillTint = StringValue.parse(value); return;
      case "w:themeFillShade": this.themeFillShade = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.color !== undefined) out.push(["w:color", this.color.toString()]);
    if (this.themeColor !== undefined) out.push(["w:themeColor", this.themeColor.toString()]);
    if (this.themeTint !== undefined) out.push(["w:themeTint", this.themeTint.toString()]);
    if (this.themeShade !== undefined) out.push(["w:themeShade", this.themeShade.toString()]);
    if (this.fill !== undefined) out.push(["w:fill", this.fill.toString()]);
    if (this.themeFill !== undefined) out.push(["w:themeFill", this.themeFill.toString()]);
    if (this.themeFillTint !== undefined) out.push(["w:themeFillTint", this.themeFillTint.toString()]);
    if (this.themeFillShade !== undefined) out.push(["w:themeFillShade", this.themeFillShade.toString()]);
    return out;
  }
}
