// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotArea

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the PivotArea Class.
 *
 * Element: `x14:pivotArea` */
export class PivotArea extends OpenXmlCompositeElement {
  override readonly localName = "pivotArea" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Index (:field) */
  field: Int32Value | undefined;

  /** Rule Type (:type) */
  type: StringValue | undefined;

  /** Data Only (:dataOnly) */
  dataOnly: BooleanValue | undefined;

  /** Labels Only (:labelOnly) */
  labelOnly: BooleanValue | undefined;

  /** Include Row Grand Total (:grandRow) */
  grandRow: BooleanValue | undefined;

  /** Include Column Grand Total (:grandCol) */
  grandColumn: BooleanValue | undefined;

  /** Cache Index (:cacheIndex) */
  cacheIndex: BooleanValue | undefined;

  /** Outline (:outline) */
  outline: BooleanValue | undefined;

  /** Offset Reference (:offset) */
  offset: StringValue | undefined;

  /** Collapsed Levels Are Subtotals (:collapsedLevelsAreSubtotals) */
  collapsedLevelsAreSubtotals: BooleanValue | undefined;

  /** Axis (:axis) */
  axis: StringValue | undefined;

  /** Field Position (:fieldPosition) */
  fieldPosition: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "field": this.field = Int32Value.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "dataOnly": this.dataOnly = BooleanValue.parse(value); return;
      case "labelOnly": this.labelOnly = BooleanValue.parse(value); return;
      case "grandRow": this.grandRow = BooleanValue.parse(value); return;
      case "grandCol": this.grandColumn = BooleanValue.parse(value); return;
      case "cacheIndex": this.cacheIndex = BooleanValue.parse(value); return;
      case "outline": this.outline = BooleanValue.parse(value); return;
      case "offset": this.offset = StringValue.parse(value); return;
      case "collapsedLevelsAreSubtotals": this.collapsedLevelsAreSubtotals = BooleanValue.parse(value); return;
      case "axis": this.axis = StringValue.parse(value); return;
      case "fieldPosition": this.fieldPosition = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.field !== undefined) out.push(["field", this.field.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.dataOnly !== undefined) out.push(["dataOnly", this.dataOnly.toString()]);
    if (this.labelOnly !== undefined) out.push(["labelOnly", this.labelOnly.toString()]);
    if (this.grandRow !== undefined) out.push(["grandRow", this.grandRow.toString()]);
    if (this.grandColumn !== undefined) out.push(["grandCol", this.grandColumn.toString()]);
    if (this.cacheIndex !== undefined) out.push(["cacheIndex", this.cacheIndex.toString()]);
    if (this.outline !== undefined) out.push(["outline", this.outline.toString()]);
    if (this.offset !== undefined) out.push(["offset", this.offset.toString()]);
    if (this.collapsedLevelsAreSubtotals !== undefined) out.push(["collapsedLevelsAreSubtotals", this.collapsedLevelsAreSubtotals.toString()]);
    if (this.axis !== undefined) out.push(["axis", this.axis.toString()]);
    if (this.fieldPosition !== undefined) out.push(["fieldPosition", this.fieldPosition.toString()]);
    return out;
  }

}
