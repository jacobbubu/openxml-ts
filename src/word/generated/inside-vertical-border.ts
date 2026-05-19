// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.InsideVerticalBorder

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
  assertString,
} from "../../element/index.js";

/** Table Inside Vertical Edges Border.
 *
 * Element: `w:insideV` */
export class InsideVerticalBorder extends OpenXmlLeafElement {
  override readonly localName = "insideV" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Border Style (w:val) */
  val: StringValue | undefined;

  /** Border Color (w:color) */
  color: StringValue | undefined;

  /** Border Theme Color (w:themeColor) */
  themeColor: StringValue | undefined;

  /** Border Theme Color Tint (w:themeTint) */
  themeTint: StringValue | undefined;

  /** Border Theme Color Shade (w:themeShade) */
  themeShade: StringValue | undefined;

  /** Border Width (w:sz) */
  size: UInt32Value | undefined;

  /** Border Spacing Measurement (w:space) */
  space: UInt32Value | undefined;

  /** Border Shadow (w:shadow) */
  shadow: BooleanValue | undefined;

  /** Create Frame Effect (w:frame) */
  frame: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:val": this.val = StringValue.parse(value); return;
      case "w:color": this.color = StringValue.parse(value); assertString(this.color, { maxLength: 3, minLength: 3 }, { attribute: "w:color", elementClass: "InsideVerticalBorder" }); return;
      case "w:themeColor": this.themeColor = StringValue.parse(value); return;
      case "w:themeTint": this.themeTint = StringValue.parse(value); assertString(this.themeTint, { maxLength: 2, minLength: 1 }, { attribute: "w:themeTint", elementClass: "InsideVerticalBorder" }); return;
      case "w:themeShade": this.themeShade = StringValue.parse(value); assertString(this.themeShade, { maxLength: 2, minLength: 1 }, { attribute: "w:themeShade", elementClass: "InsideVerticalBorder" }); return;
      case "w:sz": this.size = UInt32Value.parse(value); return;
      case "w:space": this.space = UInt32Value.parse(value); assertNumber(this.space, { min: 0, max: 31 }, { attribute: "w:space", elementClass: "InsideVerticalBorder" }); return;
      case "w:shadow": this.shadow = BooleanValue.parse(value); return;
      case "w:frame": this.frame = BooleanValue.parse(value); return;
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
    if (this.size !== undefined) out.push(["w:sz", this.size.toString()]);
    if (this.space !== undefined) out.push(["w:space", this.space.toString()]);
    if (this.shadow !== undefined) out.push(["w:shadow", this.shadow.toString()]);
    if (this.frame !== undefined) out.push(["w:frame", this.frame.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w:val", elementClass: "InsideVerticalBorder" });
  }
}
