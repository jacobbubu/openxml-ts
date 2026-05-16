// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CustomSheetView

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Custom Sheet View.
 *
 * Element: `x:customSheetView` */
export class CustomSheetView extends OpenXmlCompositeElement {
  override readonly localName = "customSheetView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** GUID (:guid) */
  guid: StringValue | undefined;

  /** Print Scale (:scale) */
  scale: UInt32Value | undefined;

  /** Color Id (:colorId) */
  colorId: UInt32Value | undefined;

  /** Show Page Breaks (:showPageBreaks) */
  showPageBreaks: BooleanValue | undefined;

  /** Show Formulas (:showFormulas) */
  showFormulas: BooleanValue | undefined;

  /** Show Grid Lines (:showGridLines) */
  showGridLines: BooleanValue | undefined;

  /** Show Headers (:showRowCol) */
  showRowColumn: BooleanValue | undefined;

  /** Show Outline Symbols (:outlineSymbols) */
  outlineSymbols: BooleanValue | undefined;

  /** Show Zero Values (:zeroValues) */
  zeroValues: BooleanValue | undefined;

  /** Fit To Page (:fitToPage) */
  fitToPage: BooleanValue | undefined;

  /** Print Area Defined (:printArea) */
  printArea: BooleanValue | undefined;

  /** Filtered List (:filter) */
  filter: BooleanValue | undefined;

  /** Show AutoFitler Drop Down Controls (:showAutoFilter) */
  showAutoFilter: BooleanValue | undefined;

  /** Hidden Rows (:hiddenRows) */
  hiddenRows: BooleanValue | undefined;

  /** Hidden Columns (:hiddenColumns) */
  hiddenColumns: BooleanValue | undefined;

  /** Visible State (:state) */
  state: StringValue | undefined;

  /** Filter (:filterUnique) */
  filterUnique: BooleanValue | undefined;

  /** View Type (:view) */
  view: StringValue | undefined;

  /** Show Ruler (:showRuler) */
  showRuler: BooleanValue | undefined;

  /** Top Left Visible Cell (:topLeftCell) */
  topLeftCell: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":guid": this.guid = StringValue.parse(value); return;
      case ":scale": this.scale = UInt32Value.parse(value); return;
      case ":colorId": this.colorId = UInt32Value.parse(value); return;
      case ":showPageBreaks": this.showPageBreaks = BooleanValue.parse(value); return;
      case ":showFormulas": this.showFormulas = BooleanValue.parse(value); return;
      case ":showGridLines": this.showGridLines = BooleanValue.parse(value); return;
      case ":showRowCol": this.showRowColumn = BooleanValue.parse(value); return;
      case ":outlineSymbols": this.outlineSymbols = BooleanValue.parse(value); return;
      case ":zeroValues": this.zeroValues = BooleanValue.parse(value); return;
      case ":fitToPage": this.fitToPage = BooleanValue.parse(value); return;
      case ":printArea": this.printArea = BooleanValue.parse(value); return;
      case ":filter": this.filter = BooleanValue.parse(value); return;
      case ":showAutoFilter": this.showAutoFilter = BooleanValue.parse(value); return;
      case ":hiddenRows": this.hiddenRows = BooleanValue.parse(value); return;
      case ":hiddenColumns": this.hiddenColumns = BooleanValue.parse(value); return;
      case ":state": this.state = StringValue.parse(value); return;
      case ":filterUnique": this.filterUnique = BooleanValue.parse(value); return;
      case ":view": this.view = StringValue.parse(value); return;
      case ":showRuler": this.showRuler = BooleanValue.parse(value); return;
      case ":topLeftCell": this.topLeftCell = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.guid !== undefined) out.push([":guid", this.guid.toString()]);
    if (this.scale !== undefined) out.push([":scale", this.scale.toString()]);
    if (this.colorId !== undefined) out.push([":colorId", this.colorId.toString()]);
    if (this.showPageBreaks !== undefined) out.push([":showPageBreaks", this.showPageBreaks.toString()]);
    if (this.showFormulas !== undefined) out.push([":showFormulas", this.showFormulas.toString()]);
    if (this.showGridLines !== undefined) out.push([":showGridLines", this.showGridLines.toString()]);
    if (this.showRowColumn !== undefined) out.push([":showRowCol", this.showRowColumn.toString()]);
    if (this.outlineSymbols !== undefined) out.push([":outlineSymbols", this.outlineSymbols.toString()]);
    if (this.zeroValues !== undefined) out.push([":zeroValues", this.zeroValues.toString()]);
    if (this.fitToPage !== undefined) out.push([":fitToPage", this.fitToPage.toString()]);
    if (this.printArea !== undefined) out.push([":printArea", this.printArea.toString()]);
    if (this.filter !== undefined) out.push([":filter", this.filter.toString()]);
    if (this.showAutoFilter !== undefined) out.push([":showAutoFilter", this.showAutoFilter.toString()]);
    if (this.hiddenRows !== undefined) out.push([":hiddenRows", this.hiddenRows.toString()]);
    if (this.hiddenColumns !== undefined) out.push([":hiddenColumns", this.hiddenColumns.toString()]);
    if (this.state !== undefined) out.push([":state", this.state.toString()]);
    if (this.filterUnique !== undefined) out.push([":filterUnique", this.filterUnique.toString()]);
    if (this.view !== undefined) out.push([":view", this.view.toString()]);
    if (this.showRuler !== undefined) out.push([":showRuler", this.showRuler.toString()]);
    if (this.topLeftCell !== undefined) out.push([":topLeftCell", this.topLeftCell.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.guid, { attribute: ":guid", elementClass: "CustomSheetView" });
  }
}
