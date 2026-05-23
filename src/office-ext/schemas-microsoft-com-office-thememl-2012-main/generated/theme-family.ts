// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_thememl_2012_main.json
// @see DocumentFormat.OpenXml.Thememl2012Main.ThemeFamily

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ThemeFamily Class.
 *
 * Element: `thm15:themeFamily` */
export class ThemeFamily extends OpenXmlCompositeElement {
  override readonly localName = "themeFamily" as const;
  override readonly prefix = "thm15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/thememl/2012/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  /** vid (:vid) */
  vid: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "vid": this.vid = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.vid !== undefined) out.push(["vid", this.vid.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "ThemeFamily" });
    assertRequired(this.id, { attribute: ":id", elementClass: "ThemeFamily" });
    assertRequired(this.vid, { attribute: ":vid", elementClass: "ThemeFamily" });
  }
}
