// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.OleItem

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the OleItem Class.
 *
 * Element: `x14:oleItem` */
export class OleItem extends OpenXmlCompositeElement {
  override readonly localName = "oleItem" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** icon (:icon) */
  icon: BooleanValue | undefined;

  /** advise (:advise) */
  advise: BooleanValue | undefined;

  /** preferPic (:preferPic) */
  preferPicture: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "icon": this.icon = BooleanValue.parse(value); return;
      case "advise": this.advise = BooleanValue.parse(value); return;
      case "preferPic": this.preferPicture = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.icon !== undefined) out.push(["icon", this.icon.toString()]);
    if (this.advise !== undefined) out.push(["advise", this.advise.toString()]);
    if (this.preferPicture !== undefined) out.push(["preferPic", this.preferPicture.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "OleItem" });
  }
}
