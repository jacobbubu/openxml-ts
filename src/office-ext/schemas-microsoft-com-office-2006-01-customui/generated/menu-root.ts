// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_01_customui.json
// @see DocumentFormat.OpenXml.200601Customui.MenuRoot

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertString,
} from "../../../element/index.js";

/** Defines the MenuRoot Class.
 *
 * Element: `mso:menu` */
export class MenuRoot extends OpenXmlCompositeElement {
  override readonly localName = "menu" as const;
  override readonly prefix = "mso" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/01/customui" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** title (:title) */
  title: StringValue | undefined;

  /** getTitle (:getTitle) */
  getTitle: StringValue | undefined;

  /** itemSize (:itemSize) */
  itemSize: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "title": this.title = StringValue.parse(value); assertString(this.title, { maxLength: 1024, minLength: 1 }, { attribute: ":title", elementClass: "MenuRoot" }); return;
      case "getTitle": this.getTitle = StringValue.parse(value); assertString(this.getTitle, { maxLength: 1024, minLength: 1 }, { attribute: ":getTitle", elementClass: "MenuRoot" }); return;
      case "itemSize": this.itemSize = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.title !== undefined) out.push(["title", this.title.toString()]);
    if (this.getTitle !== undefined) out.push(["getTitle", this.getTitle.toString()]);
    if (this.itemSize !== undefined) out.push(["itemSize", this.itemSize.toString()]);
    return out;
  }

}
