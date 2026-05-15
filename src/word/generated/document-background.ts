// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.DocumentBackground

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../element/index.js";

/** Document Background.
 *
 * Element: `w:background` */
export class DocumentBackground extends OpenXmlCompositeElement {
  override readonly localName = "background" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** color (w:color) */
  color: StringValue | undefined;

  /** themeColor (w:themeColor) */
  themeColor: StringValue | undefined;

  /** themeTint (w:themeTint) */
  themeTint: StringValue | undefined;

  /** themeShade (w:themeShade) */
  themeShade: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:color": this.color = StringValue.parse(value); assertString(this.color, { maxLength: 3, minLength: 3 }, { attribute: "w:color", elementClass: "DocumentBackground" }); return;
      case "w:themeColor": this.themeColor = StringValue.parse(value); return;
      case "w:themeTint": this.themeTint = StringValue.parse(value); assertString(this.themeTint, { maxLength: 2, minLength: 1 }, { attribute: "w:themeTint", elementClass: "DocumentBackground" }); return;
      case "w:themeShade": this.themeShade = StringValue.parse(value); assertString(this.themeShade, { maxLength: 2, minLength: 1 }, { attribute: "w:themeShade", elementClass: "DocumentBackground" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.color !== undefined) out.push(["w:color", this.color.toString()]);
    if (this.themeColor !== undefined) out.push(["w:themeColor", this.themeColor.toString()]);
    if (this.themeTint !== undefined) out.push(["w:themeTint", this.themeTint.toString()]);
    if (this.themeShade !== undefined) out.push(["w:themeShade", this.themeShade.toString()]);
    return out;
  }

}
