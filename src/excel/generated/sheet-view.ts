// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SheetView

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Worksheet View.
 *
 * Element: `x:sheetView` */
export class SheetView extends OpenXmlCompositeElement {
  override readonly localName = "sheetView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Window Protection (:windowProtection) */
  windowProtection: BooleanValue | undefined;

  /** Show Formulas (:showFormulas) */
  showFormulas: BooleanValue | undefined;

  /** Show Grid Lines (:showGridLines) */
  showGridLines: BooleanValue | undefined;

  /** Show Headers (:showRowColHeaders) */
  showRowColHeaders: BooleanValue | undefined;

  /** Show Zero Values (:showZeros) */
  showZeros: BooleanValue | undefined;

  /** Right To Left (:rightToLeft) */
  rightToLeft: BooleanValue | undefined;

  /** Sheet Tab Selected (:tabSelected) */
  tabSelected: BooleanValue | undefined;

  /** Show Ruler (:showRuler) */
  showRuler: BooleanValue | undefined;

  /** Show Outline Symbols (:showOutlineSymbols) */
  showOutlineSymbols: BooleanValue | undefined;

  /** Default Grid Color (:defaultGridColor) */
  defaultGridColor: BooleanValue | undefined;

  /** Show White Space (:showWhiteSpace) */
  showWhiteSpace: BooleanValue | undefined;

  /** View Type (:view) */
  view: StringValue | undefined;

  /** Top Left Visible Cell (:topLeftCell) */
  topLeftCell: StringValue | undefined;

  /** Color Id (:colorId) */
  colorId: UInt32Value | undefined;

  /** Zoom Scale (:zoomScale) */
  zoomScale: UInt32Value | undefined;

  /** Zoom Scale Normal View (:zoomScaleNormal) */
  zoomScaleNormal: UInt32Value | undefined;

  /** Zoom Scale Page Break Preview (:zoomScaleSheetLayoutView) */
  zoomScaleSheetLayoutView: UInt32Value | undefined;

  /** Zoom Scale Page Layout View (:zoomScalePageLayoutView) */
  zoomScalePageLayoutView: UInt32Value | undefined;

  /** Workbook View Index (:workbookViewId) */
  workbookViewId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "windowProtection": this.windowProtection = BooleanValue.parse(value); return;
      case "showFormulas": this.showFormulas = BooleanValue.parse(value); return;
      case "showGridLines": this.showGridLines = BooleanValue.parse(value); return;
      case "showRowColHeaders": this.showRowColHeaders = BooleanValue.parse(value); return;
      case "showZeros": this.showZeros = BooleanValue.parse(value); return;
      case "rightToLeft": this.rightToLeft = BooleanValue.parse(value); return;
      case "tabSelected": this.tabSelected = BooleanValue.parse(value); return;
      case "showRuler": this.showRuler = BooleanValue.parse(value); return;
      case "showOutlineSymbols": this.showOutlineSymbols = BooleanValue.parse(value); return;
      case "defaultGridColor": this.defaultGridColor = BooleanValue.parse(value); return;
      case "showWhiteSpace": this.showWhiteSpace = BooleanValue.parse(value); return;
      case "view": this.view = StringValue.parse(value); return;
      case "topLeftCell": this.topLeftCell = StringValue.parse(value); return;
      case "colorId": this.colorId = UInt32Value.parse(value); return;
      case "zoomScale": this.zoomScale = UInt32Value.parse(value); return;
      case "zoomScaleNormal": this.zoomScaleNormal = UInt32Value.parse(value); return;
      case "zoomScaleSheetLayoutView": this.zoomScaleSheetLayoutView = UInt32Value.parse(value); return;
      case "zoomScalePageLayoutView": this.zoomScalePageLayoutView = UInt32Value.parse(value); return;
      case "workbookViewId": this.workbookViewId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.windowProtection !== undefined) out.push(["windowProtection", this.windowProtection.toString()]);
    if (this.showFormulas !== undefined) out.push(["showFormulas", this.showFormulas.toString()]);
    if (this.showGridLines !== undefined) out.push(["showGridLines", this.showGridLines.toString()]);
    if (this.showRowColHeaders !== undefined) out.push(["showRowColHeaders", this.showRowColHeaders.toString()]);
    if (this.showZeros !== undefined) out.push(["showZeros", this.showZeros.toString()]);
    if (this.rightToLeft !== undefined) out.push(["rightToLeft", this.rightToLeft.toString()]);
    if (this.tabSelected !== undefined) out.push(["tabSelected", this.tabSelected.toString()]);
    if (this.showRuler !== undefined) out.push(["showRuler", this.showRuler.toString()]);
    if (this.showOutlineSymbols !== undefined) out.push(["showOutlineSymbols", this.showOutlineSymbols.toString()]);
    if (this.defaultGridColor !== undefined) out.push(["defaultGridColor", this.defaultGridColor.toString()]);
    if (this.showWhiteSpace !== undefined) out.push(["showWhiteSpace", this.showWhiteSpace.toString()]);
    if (this.view !== undefined) out.push(["view", this.view.toString()]);
    if (this.topLeftCell !== undefined) out.push(["topLeftCell", this.topLeftCell.toString()]);
    if (this.colorId !== undefined) out.push(["colorId", this.colorId.toString()]);
    if (this.zoomScale !== undefined) out.push(["zoomScale", this.zoomScale.toString()]);
    if (this.zoomScaleNormal !== undefined) out.push(["zoomScaleNormal", this.zoomScaleNormal.toString()]);
    if (this.zoomScaleSheetLayoutView !== undefined) out.push(["zoomScaleSheetLayoutView", this.zoomScaleSheetLayoutView.toString()]);
    if (this.zoomScalePageLayoutView !== undefined) out.push(["zoomScalePageLayoutView", this.zoomScalePageLayoutView.toString()]);
    if (this.workbookViewId !== undefined) out.push(["workbookViewId", this.workbookViewId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.workbookViewId, { attribute: ":workbookViewId", elementClass: "SheetView" });
  }
}
