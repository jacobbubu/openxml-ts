// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TableStyle

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Table Style.
 *
 * Element: `x:tableStyle` */
export class TableStyle extends OpenXmlCompositeElement {
  override readonly localName = "tableStyle" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Style Name (:name) */
  name: StringValue | undefined;

  /** Pivot Style (:pivot) */
  pivot: BooleanValue | undefined;

  /** Table (:table) */
  table: BooleanValue | undefined;

  /** Table Style Count (:count) */
  count: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "pivot": this.pivot = BooleanValue.parse(value); return;
      case "table": this.table = BooleanValue.parse(value); return;
      case "count": this.count = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.pivot !== undefined) out.push(["pivot", this.pivot.toString()]);
    if (this.table !== undefined) out.push(["table", this.table.toString()]);
    if (this.count !== undefined) out.push(["count", this.count.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "TableStyle" });
  }
}
