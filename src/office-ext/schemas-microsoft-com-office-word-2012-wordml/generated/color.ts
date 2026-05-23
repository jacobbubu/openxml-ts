// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json
// @see DocumentFormat.OpenXml.Word2012Wordml.Color

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
  assertString,
} from "../../../element/index.js";

/** Defines the Color Class.
 *
 * Element: `w15:color` */
export class Color extends OpenXmlLeafElement {
  override readonly localName = "color" as const;
  override readonly prefix = "w15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordml" as const;


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
      case "w:val": this.val = StringValue.parse(value); assertString(this.val, { maxLength: 3, minLength: 3 }, { attribute: "w:val", elementClass: "Color" }); return;
      case "w:themeColor": this.themeColor = StringValue.parse(value); return;
      case "w:themeTint": this.themeTint = StringValue.parse(value); assertString(this.themeTint, { maxLength: 2, minLength: 1 }, { attribute: "w:themeTint", elementClass: "Color" }); return;
      case "w:themeShade": this.themeShade = StringValue.parse(value); assertString(this.themeShade, { maxLength: 2, minLength: 1 }, { attribute: "w:themeShade", elementClass: "Color" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["w:val", this.val.toString()]);
    if (this.themeColor !== undefined) out.push(["w:themeColor", this.themeColor.toString()]);
    if (this.themeTint !== undefined) out.push(["w:themeTint", this.themeTint.toString()]);
    if (this.themeShade !== undefined) out.push(["w:themeShade", this.themeShade.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.val, { attribute: "w:val", elementClass: "Color" });
  }
}
