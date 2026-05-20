// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.TimelineState

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the TimelineState Class.
 *
 * Element: `x15:state` */
export class TimelineState extends OpenXmlCompositeElement {
  override readonly localName = "state" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** singleRangeFilterState (:singleRangeFilterState) */
  singleRangeFilterState: BooleanValue | undefined;

  /** minimalRefreshVersion (:minimalRefreshVersion) */
  minimalRefreshVersion: UInt32Value | undefined;

  /** lastRefreshVersion (:lastRefreshVersion) */
  lastRefreshVersion: UInt32Value | undefined;

  /** pivotCacheId (:pivotCacheId) */
  pivotCacheId: UInt32Value | undefined;

  /** filterType (:filterType) */
  filterType: StringValue | undefined;

  /** filterId (:filterId) */
  filterId: UInt32Value | undefined;

  /** filterTabId (:filterTabId) */
  filterTabId: UInt32Value | undefined;

  /** filterPivotName (:filterPivotName) */
  filterPivotName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "singleRangeFilterState": this.singleRangeFilterState = BooleanValue.parse(value); return;
      case "minimalRefreshVersion": this.minimalRefreshVersion = UInt32Value.parse(value); return;
      case "lastRefreshVersion": this.lastRefreshVersion = UInt32Value.parse(value); return;
      case "pivotCacheId": this.pivotCacheId = UInt32Value.parse(value); return;
      case "filterType": this.filterType = StringValue.parse(value); return;
      case "filterId": this.filterId = UInt32Value.parse(value); return;
      case "filterTabId": this.filterTabId = UInt32Value.parse(value); return;
      case "filterPivotName": this.filterPivotName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.singleRangeFilterState !== undefined) out.push(["singleRangeFilterState", this.singleRangeFilterState.toString()]);
    if (this.minimalRefreshVersion !== undefined) out.push(["minimalRefreshVersion", this.minimalRefreshVersion.toString()]);
    if (this.lastRefreshVersion !== undefined) out.push(["lastRefreshVersion", this.lastRefreshVersion.toString()]);
    if (this.pivotCacheId !== undefined) out.push(["pivotCacheId", this.pivotCacheId.toString()]);
    if (this.filterType !== undefined) out.push(["filterType", this.filterType.toString()]);
    if (this.filterId !== undefined) out.push(["filterId", this.filterId.toString()]);
    if (this.filterTabId !== undefined) out.push(["filterTabId", this.filterTabId.toString()]);
    if (this.filterPivotName !== undefined) out.push(["filterPivotName", this.filterPivotName.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.minimalRefreshVersion, { attribute: ":minimalRefreshVersion", elementClass: "TimelineState" });
    assertRequired(this.lastRefreshVersion, { attribute: ":lastRefreshVersion", elementClass: "TimelineState" });
    assertRequired(this.pivotCacheId, { attribute: ":pivotCacheId", elementClass: "TimelineState" });
    assertRequired(this.filterType, { attribute: ":filterType", elementClass: "TimelineState" });
  }
}
