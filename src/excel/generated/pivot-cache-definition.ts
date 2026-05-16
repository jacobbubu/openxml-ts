// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotCacheDefinition

import {
  BooleanValue,
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** PivotCache Definition.
 *
 * Element: `x:pivotCacheDefinition` */
export class PivotCacheDefinition extends OpenXmlCompositeElement {
  override readonly localName = "pivotCacheDefinition" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (r:id) */
  id: StringValue | undefined;

  /** invalid (:invalid) */
  invalid: BooleanValue | undefined;

  /** saveData (:saveData) */
  saveData: BooleanValue | undefined;

  /** refreshOnLoad (:refreshOnLoad) */
  refreshOnLoad: BooleanValue | undefined;

  /** optimizeMemory (:optimizeMemory) */
  optimizeMemory: BooleanValue | undefined;

  /** enableRefresh (:enableRefresh) */
  enableRefresh: BooleanValue | undefined;

  /** refreshedBy (:refreshedBy) */
  refreshedBy: StringValue | undefined;

  /** refreshedDateIso (:refreshedDateIso) */
  lastRefreshedDateIso: DateTimeValue | undefined;

  /** refreshedDate (:refreshedDate) */
  refreshedDate: StringValue | undefined;

  /** backgroundQuery (:backgroundQuery) */
  backgroundQuery: BooleanValue | undefined;

  /** missingItemsLimit (:missingItemsLimit) */
  missingItemsLimit: UInt32Value | undefined;

  /** createdVersion (:createdVersion) */
  createdVersion: StringValue | undefined;

  /** refreshedVersion (:refreshedVersion) */
  refreshedVersion: StringValue | undefined;

  /** minRefreshableVersion (:minRefreshableVersion) */
  minRefreshableVersion: StringValue | undefined;

  /** recordCount (:recordCount) */
  recordCount: UInt32Value | undefined;

  /** upgradeOnRefresh (:upgradeOnRefresh) */
  upgradeOnRefresh: BooleanValue | undefined;

  /** tupleCache (:tupleCache) */
  isTupleCache: BooleanValue | undefined;

  /** supportSubquery (:supportSubquery) */
  supportSubquery: BooleanValue | undefined;

  /** supportAdvancedDrill (:supportAdvancedDrill) */
  supportAdvancedDrill: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
      case ":invalid": this.invalid = BooleanValue.parse(value); return;
      case ":saveData": this.saveData = BooleanValue.parse(value); return;
      case ":refreshOnLoad": this.refreshOnLoad = BooleanValue.parse(value); return;
      case ":optimizeMemory": this.optimizeMemory = BooleanValue.parse(value); return;
      case ":enableRefresh": this.enableRefresh = BooleanValue.parse(value); return;
      case ":refreshedBy": this.refreshedBy = StringValue.parse(value); return;
      case ":refreshedDateIso": this.lastRefreshedDateIso = DateTimeValue.parse(value); return;
      case ":refreshedDate": this.refreshedDate = StringValue.parse(value); return;
      case ":backgroundQuery": this.backgroundQuery = BooleanValue.parse(value); return;
      case ":missingItemsLimit": this.missingItemsLimit = UInt32Value.parse(value); return;
      case ":createdVersion": this.createdVersion = StringValue.parse(value); return;
      case ":refreshedVersion": this.refreshedVersion = StringValue.parse(value); return;
      case ":minRefreshableVersion": this.minRefreshableVersion = StringValue.parse(value); return;
      case ":recordCount": this.recordCount = UInt32Value.parse(value); return;
      case ":upgradeOnRefresh": this.upgradeOnRefresh = BooleanValue.parse(value); return;
      case ":tupleCache": this.isTupleCache = BooleanValue.parse(value); return;
      case ":supportSubquery": this.supportSubquery = BooleanValue.parse(value); return;
      case ":supportAdvancedDrill": this.supportAdvancedDrill = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    if (this.invalid !== undefined) out.push([":invalid", this.invalid.toString()]);
    if (this.saveData !== undefined) out.push([":saveData", this.saveData.toString()]);
    if (this.refreshOnLoad !== undefined) out.push([":refreshOnLoad", this.refreshOnLoad.toString()]);
    if (this.optimizeMemory !== undefined) out.push([":optimizeMemory", this.optimizeMemory.toString()]);
    if (this.enableRefresh !== undefined) out.push([":enableRefresh", this.enableRefresh.toString()]);
    if (this.refreshedBy !== undefined) out.push([":refreshedBy", this.refreshedBy.toString()]);
    if (this.lastRefreshedDateIso !== undefined) out.push([":refreshedDateIso", this.lastRefreshedDateIso.toString()]);
    if (this.refreshedDate !== undefined) out.push([":refreshedDate", this.refreshedDate.toString()]);
    if (this.backgroundQuery !== undefined) out.push([":backgroundQuery", this.backgroundQuery.toString()]);
    if (this.missingItemsLimit !== undefined) out.push([":missingItemsLimit", this.missingItemsLimit.toString()]);
    if (this.createdVersion !== undefined) out.push([":createdVersion", this.createdVersion.toString()]);
    if (this.refreshedVersion !== undefined) out.push([":refreshedVersion", this.refreshedVersion.toString()]);
    if (this.minRefreshableVersion !== undefined) out.push([":minRefreshableVersion", this.minRefreshableVersion.toString()]);
    if (this.recordCount !== undefined) out.push([":recordCount", this.recordCount.toString()]);
    if (this.upgradeOnRefresh !== undefined) out.push([":upgradeOnRefresh", this.upgradeOnRefresh.toString()]);
    if (this.isTupleCache !== undefined) out.push([":tupleCache", this.isTupleCache.toString()]);
    if (this.supportSubquery !== undefined) out.push([":supportSubquery", this.supportSubquery.toString()]);
    if (this.supportAdvancedDrill !== undefined) out.push([":supportAdvancedDrill", this.supportAdvancedDrill.toString()]);
    return out;
  }

}
