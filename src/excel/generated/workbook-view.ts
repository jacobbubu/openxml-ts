// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WorkbookView

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Workbook View.
 *
 * Element: `x:workbookView` */
export class WorkbookView extends OpenXmlCompositeElement {
  override readonly localName = "workbookView" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Visibility (:visibility) */
  visibility: StringValue | undefined;

  /** Minimized (:minimized) */
  minimized: BooleanValue | undefined;

  /** Show Horizontal Scroll (:showHorizontalScroll) */
  showHorizontalScroll: BooleanValue | undefined;

  /** Show Vertical Scroll (:showVerticalScroll) */
  showVerticalScroll: BooleanValue | undefined;

  /** Show Sheet Tabs (:showSheetTabs) */
  showSheetTabs: BooleanValue | undefined;

  /** Upper Left Corner (X Coordinate) (:xWindow) */
  xWindow: Int32Value | undefined;

  /** Upper Left Corner (Y Coordinate) (:yWindow) */
  yWindow: Int32Value | undefined;

  /** Window Width (:windowWidth) */
  windowWidth: UInt32Value | undefined;

  /** Window Height (:windowHeight) */
  windowHeight: UInt32Value | undefined;

  /** Sheet Tab Ratio (:tabRatio) */
  tabRatio: UInt32Value | undefined;

  /** First Sheet (:firstSheet) */
  firstSheet: UInt32Value | undefined;

  /** Active Sheet Index (:activeTab) */
  activeTab: UInt32Value | undefined;

  /** AutoFilter Date Grouping (:autoFilterDateGrouping) */
  autoFilterDateGrouping: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":visibility": this.visibility = StringValue.parse(value); return;
      case ":minimized": this.minimized = BooleanValue.parse(value); return;
      case ":showHorizontalScroll": this.showHorizontalScroll = BooleanValue.parse(value); return;
      case ":showVerticalScroll": this.showVerticalScroll = BooleanValue.parse(value); return;
      case ":showSheetTabs": this.showSheetTabs = BooleanValue.parse(value); return;
      case ":xWindow": this.xWindow = Int32Value.parse(value); return;
      case ":yWindow": this.yWindow = Int32Value.parse(value); return;
      case ":windowWidth": this.windowWidth = UInt32Value.parse(value); return;
      case ":windowHeight": this.windowHeight = UInt32Value.parse(value); return;
      case ":tabRatio": this.tabRatio = UInt32Value.parse(value); return;
      case ":firstSheet": this.firstSheet = UInt32Value.parse(value); return;
      case ":activeTab": this.activeTab = UInt32Value.parse(value); return;
      case ":autoFilterDateGrouping": this.autoFilterDateGrouping = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.visibility !== undefined) out.push([":visibility", this.visibility.toString()]);
    if (this.minimized !== undefined) out.push([":minimized", this.minimized.toString()]);
    if (this.showHorizontalScroll !== undefined) out.push([":showHorizontalScroll", this.showHorizontalScroll.toString()]);
    if (this.showVerticalScroll !== undefined) out.push([":showVerticalScroll", this.showVerticalScroll.toString()]);
    if (this.showSheetTabs !== undefined) out.push([":showSheetTabs", this.showSheetTabs.toString()]);
    if (this.xWindow !== undefined) out.push([":xWindow", this.xWindow.toString()]);
    if (this.yWindow !== undefined) out.push([":yWindow", this.yWindow.toString()]);
    if (this.windowWidth !== undefined) out.push([":windowWidth", this.windowWidth.toString()]);
    if (this.windowHeight !== undefined) out.push([":windowHeight", this.windowHeight.toString()]);
    if (this.tabRatio !== undefined) out.push([":tabRatio", this.tabRatio.toString()]);
    if (this.firstSheet !== undefined) out.push([":firstSheet", this.firstSheet.toString()]);
    if (this.activeTab !== undefined) out.push([":activeTab", this.activeTab.toString()]);
    if (this.autoFilterDateGrouping !== undefined) out.push([":autoFilterDateGrouping", this.autoFilterDateGrouping.toString()]);
    return out;
  }

}
