// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CellFormula

import {
  BooleanValue,
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Formula.
 *
 * Element: `x:f` */
export class CellFormula extends OpenXmlLeafElement {
  override readonly localName = "f" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Formula Type (:t) */
  formulaType: StringValue | undefined;

  /** Always Calculate Array (:aca) */
  alwaysCalculateArray: BooleanValue | undefined;

  /** Range of Cells (:ref) */
  reference: StringValue | undefined;

  /** Data Table 2-D (:dt2D) */
  dataTable2D: BooleanValue | undefined;

  /** Data Table Row (:dtr) */
  dataTableRow: BooleanValue | undefined;

  /** Input 1 Deleted (:del1) */
  input1Deleted: BooleanValue | undefined;

  /** Input 2 Deleted (:del2) */
  input2Deleted: BooleanValue | undefined;

  /** Data Table Cell 1 (:r1) */
  r1: StringValue | undefined;

  /** Input Cell 2 (:r2) */
  r2: StringValue | undefined;

  /** Calculate Cell (:ca) */
  calculateCell: BooleanValue | undefined;

  /** Shared Group Index (:si) */
  sharedIndex: UInt32Value | undefined;

  /** Assigns Value to Name (:bx) */
  bx: BooleanValue | undefined;

  /** Content Contains Significant Whitespace (xml:space) */
  space: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":t": this.formulaType = StringValue.parse(value); return;
      case ":aca": this.alwaysCalculateArray = BooleanValue.parse(value); return;
      case ":ref": this.reference = StringValue.parse(value); return;
      case ":dt2D": this.dataTable2D = BooleanValue.parse(value); return;
      case ":dtr": this.dataTableRow = BooleanValue.parse(value); return;
      case ":del1": this.input1Deleted = BooleanValue.parse(value); return;
      case ":del2": this.input2Deleted = BooleanValue.parse(value); return;
      case ":r1": this.r1 = StringValue.parse(value); return;
      case ":r2": this.r2 = StringValue.parse(value); return;
      case ":ca": this.calculateCell = BooleanValue.parse(value); return;
      case ":si": this.sharedIndex = UInt32Value.parse(value); return;
      case ":bx": this.bx = BooleanValue.parse(value); return;
      case "xml:space": this.space = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formulaType !== undefined) out.push([":t", this.formulaType.toString()]);
    if (this.alwaysCalculateArray !== undefined) out.push([":aca", this.alwaysCalculateArray.toString()]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    if (this.dataTable2D !== undefined) out.push([":dt2D", this.dataTable2D.toString()]);
    if (this.dataTableRow !== undefined) out.push([":dtr", this.dataTableRow.toString()]);
    if (this.input1Deleted !== undefined) out.push([":del1", this.input1Deleted.toString()]);
    if (this.input2Deleted !== undefined) out.push([":del2", this.input2Deleted.toString()]);
    if (this.r1 !== undefined) out.push([":r1", this.r1.toString()]);
    if (this.r2 !== undefined) out.push([":r2", this.r2.toString()]);
    if (this.calculateCell !== undefined) out.push([":ca", this.calculateCell.toString()]);
    if (this.sharedIndex !== undefined) out.push([":si", this.sharedIndex.toString()]);
    if (this.bx !== undefined) out.push([":bx", this.bx.toString()]);
    if (this.space !== undefined) out.push(["xml:space", this.space.toString()]);
    return out;
  }

}
