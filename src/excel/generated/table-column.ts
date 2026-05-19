// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TableColumn

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Table Column.
 *
 * Element: `x:tableColumn` */
export class TableColumn extends OpenXmlCompositeElement {
  override readonly localName = "tableColumn" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Field Id (:id) */
  id: UInt32Value | undefined;

  /** Unique Name (:uniqueName) */
  uniqueName: StringValue | undefined;

  /** Column name (:name) */
  name: StringValue | undefined;

  /** Totals Row Function (:totalsRowFunction) */
  totalsRowFunction: StringValue | undefined;

  /** Totals Row Label (:totalsRowLabel) */
  totalsRowLabel: StringValue | undefined;

  /** Query Table Field Id (:queryTableFieldId) */
  queryTableFieldId: UInt32Value | undefined;

  /** Header Row Cell Format Id (:headerRowDxfId) */
  headerRowDifferentialFormattingId: UInt32Value | undefined;

  /** Data and Insert Row Format Id (:dataDxfId) */
  dataFormatId: UInt32Value | undefined;

  /** Totals Row Format Id (:totalsRowDxfId) */
  totalsRowDifferentialFormattingId: UInt32Value | undefined;

  /** Header Row Cell Style (:headerRowCellStyle) */
  headerRowCellStyle: StringValue | undefined;

  /** Data Area Style Name (:dataCellStyle) */
  dataCellStyle: StringValue | undefined;

  /** Totals Row Style Name (:totalsRowCellStyle) */
  totalsRowCellStyle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "uniqueName": this.uniqueName = StringValue.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "totalsRowFunction": this.totalsRowFunction = StringValue.parse(value); return;
      case "totalsRowLabel": this.totalsRowLabel = StringValue.parse(value); return;
      case "queryTableFieldId": this.queryTableFieldId = UInt32Value.parse(value); return;
      case "headerRowDxfId": this.headerRowDifferentialFormattingId = UInt32Value.parse(value); return;
      case "dataDxfId": this.dataFormatId = UInt32Value.parse(value); return;
      case "totalsRowDxfId": this.totalsRowDifferentialFormattingId = UInt32Value.parse(value); return;
      case "headerRowCellStyle": this.headerRowCellStyle = StringValue.parse(value); return;
      case "dataCellStyle": this.dataCellStyle = StringValue.parse(value); return;
      case "totalsRowCellStyle": this.totalsRowCellStyle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.uniqueName !== undefined) out.push(["uniqueName", this.uniqueName.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.totalsRowFunction !== undefined) out.push(["totalsRowFunction", this.totalsRowFunction.toString()]);
    if (this.totalsRowLabel !== undefined) out.push(["totalsRowLabel", this.totalsRowLabel.toString()]);
    if (this.queryTableFieldId !== undefined) out.push(["queryTableFieldId", this.queryTableFieldId.toString()]);
    if (this.headerRowDifferentialFormattingId !== undefined) out.push(["headerRowDxfId", this.headerRowDifferentialFormattingId.toString()]);
    if (this.dataFormatId !== undefined) out.push(["dataDxfId", this.dataFormatId.toString()]);
    if (this.totalsRowDifferentialFormattingId !== undefined) out.push(["totalsRowDxfId", this.totalsRowDifferentialFormattingId.toString()]);
    if (this.headerRowCellStyle !== undefined) out.push(["headerRowCellStyle", this.headerRowCellStyle.toString()]);
    if (this.dataCellStyle !== undefined) out.push(["dataCellStyle", this.dataCellStyle.toString()]);
    if (this.totalsRowCellStyle !== undefined) out.push(["totalsRowCellStyle", this.totalsRowCellStyle.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "TableColumn" });
    assertRequired(this.name, { attribute: ":name", elementClass: "TableColumn" });
  }
}
