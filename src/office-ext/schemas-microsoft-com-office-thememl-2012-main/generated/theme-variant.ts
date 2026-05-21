// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_thememl_2012_main.json
// @see DocumentFormat.OpenXml.Thememl2012Main.ThemeVariant

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ThemeVariant Class.
 *
 * Element: `thm15:themeVariant` */
export class ThemeVariant extends OpenXmlCompositeElement {
  override readonly localName = "themeVariant" as const;
  override readonly prefix = "thm15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/thememl/2012/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** cx (:cx) */
  x: Int64Value | undefined;

  /** cy (:cy) */
  y: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "cx": this.x = Int64Value.parse(value); assertNumber(this.x, { min: -27273042329600, max: 27273042316900 }, { attribute: ":cx", elementClass: "ThemeVariant" }); return;
      case "cy": this.y = Int64Value.parse(value); assertNumber(this.y, { min: -27273042329600, max: 27273042316900 }, { attribute: ":cy", elementClass: "ThemeVariant" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.x !== undefined) out.push(["cx", this.x.toString()]);
    if (this.y !== undefined) out.push(["cy", this.y.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "ThemeVariant" });
    assertRequired(this.x, { attribute: ":cx", elementClass: "ThemeVariant" });
    assertRequired(this.y, { attribute: ":cy", elementClass: "ThemeVariant" });
  }
}
