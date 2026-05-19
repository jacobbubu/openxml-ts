// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CustomWorkbookView

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Custom Workbook View.
 *
 * Element: `x:customWorkbookView` */
export class CustomWorkbookView extends OpenXmlCompositeElement {
  override readonly localName = "customWorkbookView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Custom View Name (:name) */
  name: StringValue | undefined;

  /** Custom View GUID (:guid) */
  guid: StringValue | undefined;

  /** Auto Update (:autoUpdate) */
  autoUpdate: BooleanValue | undefined;

  /** Merge Interval (:mergeInterval) */
  mergeInterval: UInt32Value | undefined;

  /** Changes Saved Win (:changesSavedWin) */
  changesSavedWin: BooleanValue | undefined;

  /** Only Synch (:onlySync) */
  onlySync: BooleanValue | undefined;

  /** Personal View (:personalView) */
  personalView: BooleanValue | undefined;

  /** Include Print Settings (:includePrintSettings) */
  includePrintSettings: BooleanValue | undefined;

  /** Include Hidden Rows and Columns (:includeHiddenRowCol) */
  includeHiddenRowColumn: BooleanValue | undefined;

  /** Maximized (:maximized) */
  maximized: BooleanValue | undefined;

  /** Minimized (:minimized) */
  minimized: BooleanValue | undefined;

  /** Show Horizontal Scroll (:showHorizontalScroll) */
  showHorizontalScroll: BooleanValue | undefined;

  /** Show Vertical Scroll (:showVerticalScroll) */
  showVerticalScroll: BooleanValue | undefined;

  /** Show Sheet Tabs (:showSheetTabs) */
  showSheetTabs: BooleanValue | undefined;

  /** Top Left Corner (X Coordinate) (:xWindow) */
  xWindow: Int32Value | undefined;

  /** Top Left Corner (Y Coordinate) (:yWindow) */
  yWindow: Int32Value | undefined;

  /** Window Width (:windowWidth) */
  windowWidth: UInt32Value | undefined;

  /** Window Height (:windowHeight) */
  windowHeight: UInt32Value | undefined;

  /** Sheet Tab Ratio (:tabRatio) */
  tabRatio: UInt32Value | undefined;

  /** Active Sheet in Book View (:activeSheetId) */
  activeSheetId: UInt32Value | undefined;

  /** Show Formula Bar (:showFormulaBar) */
  showFormulaBar: BooleanValue | undefined;

  /** Show Status Bar (:showStatusbar) */
  showStatusbar: BooleanValue | undefined;

  /** Show Comments (:showComments) */
  showComments: StringValue | undefined;

  /** Show Objects (:showObjects) */
  showObjects: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "guid": this.guid = StringValue.parse(value); return;
      case "autoUpdate": this.autoUpdate = BooleanValue.parse(value); return;
      case "mergeInterval": this.mergeInterval = UInt32Value.parse(value); return;
      case "changesSavedWin": this.changesSavedWin = BooleanValue.parse(value); return;
      case "onlySync": this.onlySync = BooleanValue.parse(value); return;
      case "personalView": this.personalView = BooleanValue.parse(value); return;
      case "includePrintSettings": this.includePrintSettings = BooleanValue.parse(value); return;
      case "includeHiddenRowCol": this.includeHiddenRowColumn = BooleanValue.parse(value); return;
      case "maximized": this.maximized = BooleanValue.parse(value); return;
      case "minimized": this.minimized = BooleanValue.parse(value); return;
      case "showHorizontalScroll": this.showHorizontalScroll = BooleanValue.parse(value); return;
      case "showVerticalScroll": this.showVerticalScroll = BooleanValue.parse(value); return;
      case "showSheetTabs": this.showSheetTabs = BooleanValue.parse(value); return;
      case "xWindow": this.xWindow = Int32Value.parse(value); return;
      case "yWindow": this.yWindow = Int32Value.parse(value); return;
      case "windowWidth": this.windowWidth = UInt32Value.parse(value); return;
      case "windowHeight": this.windowHeight = UInt32Value.parse(value); return;
      case "tabRatio": this.tabRatio = UInt32Value.parse(value); return;
      case "activeSheetId": this.activeSheetId = UInt32Value.parse(value); return;
      case "showFormulaBar": this.showFormulaBar = BooleanValue.parse(value); return;
      case "showStatusbar": this.showStatusbar = BooleanValue.parse(value); return;
      case "showComments": this.showComments = StringValue.parse(value); return;
      case "showObjects": this.showObjects = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.guid !== undefined) out.push(["guid", this.guid.toString()]);
    if (this.autoUpdate !== undefined) out.push(["autoUpdate", this.autoUpdate.toString()]);
    if (this.mergeInterval !== undefined) out.push(["mergeInterval", this.mergeInterval.toString()]);
    if (this.changesSavedWin !== undefined) out.push(["changesSavedWin", this.changesSavedWin.toString()]);
    if (this.onlySync !== undefined) out.push(["onlySync", this.onlySync.toString()]);
    if (this.personalView !== undefined) out.push(["personalView", this.personalView.toString()]);
    if (this.includePrintSettings !== undefined) out.push(["includePrintSettings", this.includePrintSettings.toString()]);
    if (this.includeHiddenRowColumn !== undefined) out.push(["includeHiddenRowCol", this.includeHiddenRowColumn.toString()]);
    if (this.maximized !== undefined) out.push(["maximized", this.maximized.toString()]);
    if (this.minimized !== undefined) out.push(["minimized", this.minimized.toString()]);
    if (this.showHorizontalScroll !== undefined) out.push(["showHorizontalScroll", this.showHorizontalScroll.toString()]);
    if (this.showVerticalScroll !== undefined) out.push(["showVerticalScroll", this.showVerticalScroll.toString()]);
    if (this.showSheetTabs !== undefined) out.push(["showSheetTabs", this.showSheetTabs.toString()]);
    if (this.xWindow !== undefined) out.push(["xWindow", this.xWindow.toString()]);
    if (this.yWindow !== undefined) out.push(["yWindow", this.yWindow.toString()]);
    if (this.windowWidth !== undefined) out.push(["windowWidth", this.windowWidth.toString()]);
    if (this.windowHeight !== undefined) out.push(["windowHeight", this.windowHeight.toString()]);
    if (this.tabRatio !== undefined) out.push(["tabRatio", this.tabRatio.toString()]);
    if (this.activeSheetId !== undefined) out.push(["activeSheetId", this.activeSheetId.toString()]);
    if (this.showFormulaBar !== undefined) out.push(["showFormulaBar", this.showFormulaBar.toString()]);
    if (this.showStatusbar !== undefined) out.push(["showStatusbar", this.showStatusbar.toString()]);
    if (this.showComments !== undefined) out.push(["showComments", this.showComments.toString()]);
    if (this.showObjects !== undefined) out.push(["showObjects", this.showObjects.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "CustomWorkbookView" });
    assertRequired(this.guid, { attribute: ":guid", elementClass: "CustomWorkbookView" });
    assertRequired(this.activeSheetId, { attribute: ":activeSheetId", elementClass: "CustomWorkbookView" });
  }
}
