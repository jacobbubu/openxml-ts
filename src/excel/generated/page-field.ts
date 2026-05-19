// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PageField

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Page Field.
 *
 * Element: `x:pageField` */
export class PageField extends OpenXmlCompositeElement {
  override readonly localName = "pageField" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field (:fld) */
  field: Int32Value | undefined;

  /** Item Index (:item) */
  item: UInt32Value | undefined;

  /** OLAP Hierarchy Index (:hier) */
  hierarchy: Int32Value | undefined;

  /** Hierarchy Unique Name (:name) */
  name: StringValue | undefined;

  /** Hierarchy Display Name (:cap) */
  caption: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "fld": this.field = Int32Value.parse(value); return;
      case "item": this.item = UInt32Value.parse(value); return;
      case "hier": this.hierarchy = Int32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "cap": this.caption = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push(["fld", this.field.toString()]);
    if (this.item !== undefined) out.push(["item", this.item.toString()]);
    if (this.hierarchy !== undefined) out.push(["hier", this.hierarchy.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.caption !== undefined) out.push(["cap", this.caption.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.field, { attribute: ":fld", elementClass: "PageField" });
  }
}
