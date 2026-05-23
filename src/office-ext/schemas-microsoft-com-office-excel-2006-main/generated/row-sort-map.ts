// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2006_main.json
// @see DocumentFormat.OpenXml.Excel2006Main.RowSortMap

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Row Sort Map.
 *
 * Element: `xne:rowSortMap` */
export class RowSortMap extends OpenXmlCompositeElement {
  override readonly localName = "rowSortMap" as const;
  override readonly prefix = "xne" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/excel/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference (:ref) */
  ref: StringValue | undefined;

  /** Count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ref": this.ref = StringValue.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); assertNumber(this.count, { max: 536870910 }, { attribute: ":count", elementClass: "RowSortMap" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ref !== undefined) out.push(["ref", this.ref.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.ref, { attribute: ":ref", elementClass: "RowSortMap" });
  }
}
