// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Table

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Table.
 *
 * Element: `x:table` */
export class Table extends OpenXmlCompositeElement {
  override readonly localName = "table" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Table Id (:id) */
  id: UInt32Value | undefined;

  /** Name (:name) */
  name: StringValue | undefined;

  /** Table Name (:displayName) */
  displayName: StringValue | undefined;

  /** Table Comment (:comment) */
  comment: StringValue | undefined;

  /** Reference (:ref) */
  reference: StringValue | undefined;

  /** Table Type (:tableType) */
  tableType: StringValue | undefined;

  /** Header Row Count (:headerRowCount) */
  headerRowCount: UInt32Value | undefined;

  /** Insert Row Showing (:insertRow) */
  insertRow: BooleanValue | undefined;

  /** Insert Row Shift (:insertRowShift) */
  insertRowShift: BooleanValue | undefined;

  /** Totals Row Count (:totalsRowCount) */
  totalsRowCount: UInt32Value | undefined;

  /** Totals Row Shown (:totalsRowShown) */
  totalsRowShown: BooleanValue | undefined;

  /** Published (:published) */
  published: BooleanValue | undefined;

  /** Header Row Format Id (:headerRowDxfId) */
  headerRowFormatId: UInt32Value | undefined;

  /** Data Area Format Id (:dataDxfId) */
  dataFormatId: UInt32Value | undefined;

  /** Totals Row Format Id (:totalsRowDxfId) */
  totalsRowFormatId: UInt32Value | undefined;

  /** Header Row Border Format Id (:headerRowBorderDxfId) */
  headerRowBorderFormatId: UInt32Value | undefined;

  /** Table Border Format Id (:tableBorderDxfId) */
  borderFormatId: UInt32Value | undefined;

  /** Totals Row Border Format Id (:totalsRowBorderDxfId) */
  totalsRowBorderFormatId: UInt32Value | undefined;

  /** Header Row Style (:headerRowCellStyle) */
  headerRowCellStyle: StringValue | undefined;

  /** Data Style Name (:dataCellStyle) */
  dataCellStyle: StringValue | undefined;

  /** Totals Row Style (:totalsRowCellStyle) */
  totalsRowCellStyle: StringValue | undefined;

  /** Connection ID (:connectionId) */
  connectionId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); return;
      case ":name": this.name = StringValue.parse(value); return;
      case ":displayName": this.displayName = StringValue.parse(value); return;
      case ":comment": this.comment = StringValue.parse(value); return;
      case ":ref": this.reference = StringValue.parse(value); return;
      case ":tableType": this.tableType = StringValue.parse(value); return;
      case ":headerRowCount": this.headerRowCount = UInt32Value.parse(value); return;
      case ":insertRow": this.insertRow = BooleanValue.parse(value); return;
      case ":insertRowShift": this.insertRowShift = BooleanValue.parse(value); return;
      case ":totalsRowCount": this.totalsRowCount = UInt32Value.parse(value); return;
      case ":totalsRowShown": this.totalsRowShown = BooleanValue.parse(value); return;
      case ":published": this.published = BooleanValue.parse(value); return;
      case ":headerRowDxfId": this.headerRowFormatId = UInt32Value.parse(value); return;
      case ":dataDxfId": this.dataFormatId = UInt32Value.parse(value); return;
      case ":totalsRowDxfId": this.totalsRowFormatId = UInt32Value.parse(value); return;
      case ":headerRowBorderDxfId": this.headerRowBorderFormatId = UInt32Value.parse(value); return;
      case ":tableBorderDxfId": this.borderFormatId = UInt32Value.parse(value); return;
      case ":totalsRowBorderDxfId": this.totalsRowBorderFormatId = UInt32Value.parse(value); return;
      case ":headerRowCellStyle": this.headerRowCellStyle = StringValue.parse(value); return;
      case ":dataCellStyle": this.dataCellStyle = StringValue.parse(value); return;
      case ":totalsRowCellStyle": this.totalsRowCellStyle = StringValue.parse(value); return;
      case ":connectionId": this.connectionId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.displayName !== undefined) out.push([":displayName", this.displayName.toString()]);
    if (this.comment !== undefined) out.push([":comment", this.comment.toString()]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    if (this.tableType !== undefined) out.push([":tableType", this.tableType.toString()]);
    if (this.headerRowCount !== undefined) out.push([":headerRowCount", this.headerRowCount.toString()]);
    if (this.insertRow !== undefined) out.push([":insertRow", this.insertRow.toString()]);
    if (this.insertRowShift !== undefined) out.push([":insertRowShift", this.insertRowShift.toString()]);
    if (this.totalsRowCount !== undefined) out.push([":totalsRowCount", this.totalsRowCount.toString()]);
    if (this.totalsRowShown !== undefined) out.push([":totalsRowShown", this.totalsRowShown.toString()]);
    if (this.published !== undefined) out.push([":published", this.published.toString()]);
    if (this.headerRowFormatId !== undefined) out.push([":headerRowDxfId", this.headerRowFormatId.toString()]);
    if (this.dataFormatId !== undefined) out.push([":dataDxfId", this.dataFormatId.toString()]);
    if (this.totalsRowFormatId !== undefined) out.push([":totalsRowDxfId", this.totalsRowFormatId.toString()]);
    if (this.headerRowBorderFormatId !== undefined) out.push([":headerRowBorderDxfId", this.headerRowBorderFormatId.toString()]);
    if (this.borderFormatId !== undefined) out.push([":tableBorderDxfId", this.borderFormatId.toString()]);
    if (this.totalsRowBorderFormatId !== undefined) out.push([":totalsRowBorderDxfId", this.totalsRowBorderFormatId.toString()]);
    if (this.headerRowCellStyle !== undefined) out.push([":headerRowCellStyle", this.headerRowCellStyle.toString()]);
    if (this.dataCellStyle !== undefined) out.push([":dataCellStyle", this.dataCellStyle.toString()]);
    if (this.totalsRowCellStyle !== undefined) out.push([":totalsRowCellStyle", this.totalsRowCellStyle.toString()]);
    if (this.connectionId !== undefined) out.push([":connectionId", this.connectionId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Table" });
    assertRequired(this.displayName, { attribute: ":displayName", elementClass: "Table" });
    assertRequired(this.reference, { attribute: ":ref", elementClass: "Table" });
  }
}
