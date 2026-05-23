// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2019_namedsheetviews.json
// @see DocumentFormat.OpenXml.Spreadsheetml2019Namedsheetviews.SortRule

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the SortRule Class.
 *
 * Element: `xnsv:sortRule` */
export class SortRule extends OpenXmlCompositeElement {
  override readonly localName = "sortRule" as const;
  override readonly prefix = "xnsv" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2019/namedsheetviews" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** colId (:colId) */
  colId: UInt32Value | undefined;

  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "colId": this.colId = UInt32Value.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.colId !== undefined) out.push(["colId", this.colId.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.colId, { attribute: ":colId", elementClass: "SortRule" });
  }
}
