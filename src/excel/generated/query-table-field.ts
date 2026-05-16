// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.QueryTableField

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** QueryTable Field.
 *
 * Element: `x:queryTableField` */
export class QueryTableField extends OpenXmlCompositeElement {
  override readonly localName = "queryTableField" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Id (:id) */
  id: UInt32Value | undefined;

  /** Name (:name) */
  name: StringValue | undefined;

  /** Data Bound Column (:dataBound) */
  dataBound: BooleanValue | undefined;

  /** Row Numbers (:rowNumbers) */
  rowNumbers: BooleanValue | undefined;

  /** Fill This Formula On Refresh (:fillFormulas) */
  fillFormulas: BooleanValue | undefined;

  /** Clipped Column (:clipped) */
  clipped: BooleanValue | undefined;

  /** Table Column Id (:tableColumnId) */
  tableColumnId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":dataBound": this.dataBound = BooleanValue.parse(value); return;
      case ":rowNumbers": this.rowNumbers = BooleanValue.parse(value); return;
      case ":fillFormulas": this.fillFormulas = BooleanValue.parse(value); return;
      case ":clipped": this.clipped = BooleanValue.parse(value); return;
      case ":tableColumnId": this.tableColumnId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.dataBound !== undefined) out.push([":dataBound", this.dataBound.toString()]);
    if (this.rowNumbers !== undefined) out.push([":rowNumbers", this.rowNumbers.toString()]);
    if (this.fillFormulas !== undefined) out.push([":fillFormulas", this.fillFormulas.toString()]);
    if (this.clipped !== undefined) out.push([":clipped", this.clipped.toString()]);
    if (this.tableColumnId !== undefined) out.push([":tableColumnId", this.tableColumnId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "QueryTableField" });
  }
}
