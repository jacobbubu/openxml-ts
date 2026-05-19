// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WorkbookProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the WorkbookProperties Class.
 *
 * Element: `x:workbookPr` */
export class WorkbookProperties extends OpenXmlLeafElement {
  override readonly localName = "workbookPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Date 1904 (:date1904) */
  date1904: BooleanValue | undefined;

  /** dateCompatibility (:dateCompatibility) */
  dateCompatibility: BooleanValue | undefined;

  /** Show Objects (:showObjects) */
  showObjects: StringValue | undefined;

  /** Show Border Unselected Table (:showBorderUnselectedTables) */
  showBorderUnselectedTables: BooleanValue | undefined;

  /** Filter Privacy (:filterPrivacy) */
  filterPrivacy: BooleanValue | undefined;

  /** Prompted Solutions (:promptedSolutions) */
  promptedSolutions: BooleanValue | undefined;

  /** Show Ink Annotations (:showInkAnnotation) */
  showInkAnnotation: BooleanValue | undefined;

  /** Create Backup File (:backupFile) */
  backupFile: BooleanValue | undefined;

  /** Save External Link Values (:saveExternalLinkValues) */
  saveExternalLinkValues: BooleanValue | undefined;

  /** Update Links Behavior (:updateLinks) */
  updateLinks: StringValue | undefined;

  /** Code Name (:codeName) */
  codeName: StringValue | undefined;

  /** Hide Pivot Field List (:hidePivotFieldList) */
  hidePivotFieldList: BooleanValue | undefined;

  /** Show Pivot Chart Filter (:showPivotChartFilter) */
  showPivotChartFilter: BooleanValue | undefined;

  /** Allow Refresh Query (:allowRefreshQuery) */
  allowRefreshQuery: BooleanValue | undefined;

  /** Publish Items (:publishItems) */
  publishItems: BooleanValue | undefined;

  /** Check Compatibility On Save (:checkCompatibility) */
  checkCompatibility: BooleanValue | undefined;

  /** Auto Compress Pictures (:autoCompressPictures) */
  autoCompressPictures: BooleanValue | undefined;

  /** Refresh all Connections on Open (:refreshAllConnections) */
  refreshAllConnections: BooleanValue | undefined;

  /** Default Theme Version (:defaultThemeVersion) */
  defaultThemeVersion: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "date1904": this.date1904 = BooleanValue.parse(value); return;
      case "dateCompatibility": this.dateCompatibility = BooleanValue.parse(value); return;
      case "showObjects": this.showObjects = StringValue.parse(value); return;
      case "showBorderUnselectedTables": this.showBorderUnselectedTables = BooleanValue.parse(value); return;
      case "filterPrivacy": this.filterPrivacy = BooleanValue.parse(value); return;
      case "promptedSolutions": this.promptedSolutions = BooleanValue.parse(value); return;
      case "showInkAnnotation": this.showInkAnnotation = BooleanValue.parse(value); return;
      case "backupFile": this.backupFile = BooleanValue.parse(value); return;
      case "saveExternalLinkValues": this.saveExternalLinkValues = BooleanValue.parse(value); return;
      case "updateLinks": this.updateLinks = StringValue.parse(value); return;
      case "codeName": this.codeName = StringValue.parse(value); return;
      case "hidePivotFieldList": this.hidePivotFieldList = BooleanValue.parse(value); return;
      case "showPivotChartFilter": this.showPivotChartFilter = BooleanValue.parse(value); return;
      case "allowRefreshQuery": this.allowRefreshQuery = BooleanValue.parse(value); return;
      case "publishItems": this.publishItems = BooleanValue.parse(value); return;
      case "checkCompatibility": this.checkCompatibility = BooleanValue.parse(value); return;
      case "autoCompressPictures": this.autoCompressPictures = BooleanValue.parse(value); return;
      case "refreshAllConnections": this.refreshAllConnections = BooleanValue.parse(value); return;
      case "defaultThemeVersion": this.defaultThemeVersion = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.date1904 !== undefined) out.push(["date1904", this.date1904.toString()]);
    if (this.dateCompatibility !== undefined) out.push(["dateCompatibility", this.dateCompatibility.toString()]);
    if (this.showObjects !== undefined) out.push(["showObjects", this.showObjects.toString()]);
    if (this.showBorderUnselectedTables !== undefined) out.push(["showBorderUnselectedTables", this.showBorderUnselectedTables.toString()]);
    if (this.filterPrivacy !== undefined) out.push(["filterPrivacy", this.filterPrivacy.toString()]);
    if (this.promptedSolutions !== undefined) out.push(["promptedSolutions", this.promptedSolutions.toString()]);
    if (this.showInkAnnotation !== undefined) out.push(["showInkAnnotation", this.showInkAnnotation.toString()]);
    if (this.backupFile !== undefined) out.push(["backupFile", this.backupFile.toString()]);
    if (this.saveExternalLinkValues !== undefined) out.push(["saveExternalLinkValues", this.saveExternalLinkValues.toString()]);
    if (this.updateLinks !== undefined) out.push(["updateLinks", this.updateLinks.toString()]);
    if (this.codeName !== undefined) out.push(["codeName", this.codeName.toString()]);
    if (this.hidePivotFieldList !== undefined) out.push(["hidePivotFieldList", this.hidePivotFieldList.toString()]);
    if (this.showPivotChartFilter !== undefined) out.push(["showPivotChartFilter", this.showPivotChartFilter.toString()]);
    if (this.allowRefreshQuery !== undefined) out.push(["allowRefreshQuery", this.allowRefreshQuery.toString()]);
    if (this.publishItems !== undefined) out.push(["publishItems", this.publishItems.toString()]);
    if (this.checkCompatibility !== undefined) out.push(["checkCompatibility", this.checkCompatibility.toString()]);
    if (this.autoCompressPictures !== undefined) out.push(["autoCompressPictures", this.autoCompressPictures.toString()]);
    if (this.refreshAllConnections !== undefined) out.push(["refreshAllConnections", this.refreshAllConnections.toString()]);
    if (this.defaultThemeVersion !== undefined) out.push(["defaultThemeVersion", this.defaultThemeVersion.toString()]);
    return out;
  }

}
