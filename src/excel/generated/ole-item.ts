// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.OleItem

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** OLE Link Item.
 *
 * Element: `x:oleItem` */
export class OleItem extends OpenXmlLeafElement {
  override readonly localName = "oleItem" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** OLE Name (:name) */
  name: StringValue | undefined;

  /** Icon (:icon) */
  icon: BooleanValue | undefined;

  /** Advise (:advise) */
  advise: BooleanValue | undefined;

  /** Object is an Image (:preferPic) */
  preferPicture: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":icon": this.icon = BooleanValue.parse(value); return;
      case ":advise": this.advise = BooleanValue.parse(value); return;
      case ":preferPic": this.preferPicture = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.icon !== undefined) out.push([":icon", this.icon.toString()]);
    if (this.advise !== undefined) out.push([":advise", this.advise.toString()]);
    if (this.preferPicture !== undefined) out.push([":preferPic", this.preferPicture.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "OleItem" });
  }
}
