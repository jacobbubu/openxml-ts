// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_namedsheetviews.json
// @see DocumentFormat.OpenXml.Spreadsheetml2019Namedsheetviews.NamedSheetView

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the NamedSheetView Class.
 *
 * Element: `xnsv:namedSheetView` */
export class NamedSheetView extends OpenXmlCompositeElement {
  override readonly localName = "namedSheetView" as const;
  override readonly prefix = "xnsv" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "NamedSheetView" });
    assertRequired(this.id, { attribute: ":id", elementClass: "NamedSheetView" });
  }
}
