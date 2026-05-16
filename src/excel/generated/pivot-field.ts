// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotField

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** PivotTable Field.
 *
 * Element: `x:pivotField` */
export class PivotField extends OpenXmlCompositeElement {
  override readonly localName = "pivotField" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Field Name (:name) */
  name: StringValue | undefined;

  /** Axis (:axis) */
  axis: StringValue | undefined;

  /** Data Field (:dataField) */
  dataField: BooleanValue | undefined;

  /** Custom Subtotal Caption (:subtotalCaption) */
  subtotalCaption: StringValue | undefined;

  /** Show PivotField Header Drop Downs (:showDropDowns) */
  showDropDowns: BooleanValue | undefined;

  /** Hidden Level (:hiddenLevel) */
  hiddenLevel: BooleanValue | undefined;

  /** Unique Member Property (:uniqueMemberProperty) */
  uniqueMemberProperty: StringValue | undefined;

  /** Compact (:compact) */
  compact: BooleanValue | undefined;

  /** All Items Expanded (:allDrilled) */
  allDrilled: BooleanValue | undefined;

  /** Number Format Id (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  /** Outline Items (:outline) */
  outline: BooleanValue | undefined;

  /** Subtotals At Top (:subtotalTop) */
  subtotalTop: BooleanValue | undefined;

  /** Drag To Row (:dragToRow) */
  dragToRow: BooleanValue | undefined;

  /** Drag To Column (:dragToCol) */
  dragToColumn: BooleanValue | undefined;

  /** Multiple Field Filters (:multipleItemSelectionAllowed) */
  multipleItemSelectionAllowed: BooleanValue | undefined;

  /** Drag Field to Page (:dragToPage) */
  dragToPage: BooleanValue | undefined;

  /** Field Can Drag to Data (:dragToData) */
  dragToData: BooleanValue | undefined;

  /** Drag Off (:dragOff) */
  dragOff: BooleanValue | undefined;

  /** Show All Items (:showAll) */
  showAll: BooleanValue | undefined;

  /** Insert Blank Row (:insertBlankRow) */
  insertBlankRow: BooleanValue | undefined;

  /** Server-based Page Field (:serverField) */
  serverField: BooleanValue | undefined;

  /** Insert Item Page Break (:insertPageBreak) */
  insertPageBreak: BooleanValue | undefined;

  /** Auto Show (:autoShow) */
  autoShow: BooleanValue | undefined;

  /** Top Auto Show (:topAutoShow) */
  topAutoShow: BooleanValue | undefined;

  /** Hide New Items (:hideNewItems) */
  hideNewItems: BooleanValue | undefined;

  /** Measure Filter (:measureFilter) */
  measureFilter: BooleanValue | undefined;

  /** Inclusive Manual Filter (:includeNewItemsInFilter) */
  includeNewItemsInFilter: BooleanValue | undefined;

  /** Items Per Page Count (:itemPageCount) */
  itemPageCount: UInt32Value | undefined;

  /** Auto Sort Type (:sortType) */
  sortType: StringValue | undefined;

  /** Data Source Sort (:dataSourceSort) */
  dataSourceSort: BooleanValue | undefined;

  /** Auto Sort (:nonAutoSortDefault) */
  nonAutoSortDefault: BooleanValue | undefined;

  /** Auto Show Rank By (:rankBy) */
  rankBy: UInt32Value | undefined;

  /** Show Default Subtotal (:defaultSubtotal) */
  defaultSubtotal: BooleanValue | undefined;

  /** Sum Subtotal (:sumSubtotal) */
  sumSubtotal: BooleanValue | undefined;

  /** CountA (:countASubtotal) */
  countASubtotal: BooleanValue | undefined;

  /** Average (:avgSubtotal) */
  averageSubTotal: BooleanValue | undefined;

  /** Max Subtotal (:maxSubtotal) */
  maxSubtotal: BooleanValue | undefined;

  /** Min Subtotal (:minSubtotal) */
  minSubtotal: BooleanValue | undefined;

  /** Product Subtotal (:productSubtotal) */
  applyProductInSubtotal: BooleanValue | undefined;

  /** Count (:countSubtotal) */
  countSubtotal: BooleanValue | undefined;

  /** StdDev Subtotal (:stdDevSubtotal) */
  applyStandardDeviationInSubtotal: BooleanValue | undefined;

  /** StdDevP Subtotal (:stdDevPSubtotal) */
  applyStandardDeviationPInSubtotal: BooleanValue | undefined;

  /** Variance Subtotal (:varSubtotal) */
  applyVarianceInSubtotal: BooleanValue | undefined;

  /** VarP Subtotal (:varPSubtotal) */
  applyVariancePInSubtotal: BooleanValue | undefined;

  /** Show Member Property in Cell (:showPropCell) */
  showPropCell: BooleanValue | undefined;

  /** Show Member Property ToolTip (:showPropTip) */
  showPropertyTooltip: BooleanValue | undefined;

  /** Show As Caption (:showPropAsCaption) */
  showPropAsCaption: BooleanValue | undefined;

  /** Drill State (:defaultAttributeDrillState) */
  defaultAttributeDrillState: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":axis": this.axis = StringValue.parse(value); return;
      case ":dataField": this.dataField = BooleanValue.parse(value); return;
      case ":subtotalCaption": this.subtotalCaption = StringValue.parse(value); return;
      case ":showDropDowns": this.showDropDowns = BooleanValue.parse(value); return;
      case ":hiddenLevel": this.hiddenLevel = BooleanValue.parse(value); return;
      case ":uniqueMemberProperty": this.uniqueMemberProperty = StringValue.parse(value); return;
      case ":compact": this.compact = BooleanValue.parse(value); return;
      case ":allDrilled": this.allDrilled = BooleanValue.parse(value); return;
      case ":numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
      case ":outline": this.outline = BooleanValue.parse(value); return;
      case ":subtotalTop": this.subtotalTop = BooleanValue.parse(value); return;
      case ":dragToRow": this.dragToRow = BooleanValue.parse(value); return;
      case ":dragToCol": this.dragToColumn = BooleanValue.parse(value); return;
      case ":multipleItemSelectionAllowed": this.multipleItemSelectionAllowed = BooleanValue.parse(value); return;
      case ":dragToPage": this.dragToPage = BooleanValue.parse(value); return;
      case ":dragToData": this.dragToData = BooleanValue.parse(value); return;
      case ":dragOff": this.dragOff = BooleanValue.parse(value); return;
      case ":showAll": this.showAll = BooleanValue.parse(value); return;
      case ":insertBlankRow": this.insertBlankRow = BooleanValue.parse(value); return;
      case ":serverField": this.serverField = BooleanValue.parse(value); return;
      case ":insertPageBreak": this.insertPageBreak = BooleanValue.parse(value); return;
      case ":autoShow": this.autoShow = BooleanValue.parse(value); return;
      case ":topAutoShow": this.topAutoShow = BooleanValue.parse(value); return;
      case ":hideNewItems": this.hideNewItems = BooleanValue.parse(value); return;
      case ":measureFilter": this.measureFilter = BooleanValue.parse(value); return;
      case ":includeNewItemsInFilter": this.includeNewItemsInFilter = BooleanValue.parse(value); return;
      case ":itemPageCount": this.itemPageCount = UInt32Value.parse(value); return;
      case ":sortType": this.sortType = StringValue.parse(value); return;
      case ":dataSourceSort": this.dataSourceSort = BooleanValue.parse(value); return;
      case ":nonAutoSortDefault": this.nonAutoSortDefault = BooleanValue.parse(value); return;
      case ":rankBy": this.rankBy = UInt32Value.parse(value); return;
      case ":defaultSubtotal": this.defaultSubtotal = BooleanValue.parse(value); return;
      case ":sumSubtotal": this.sumSubtotal = BooleanValue.parse(value); return;
      case ":countASubtotal": this.countASubtotal = BooleanValue.parse(value); return;
      case ":avgSubtotal": this.averageSubTotal = BooleanValue.parse(value); return;
      case ":maxSubtotal": this.maxSubtotal = BooleanValue.parse(value); return;
      case ":minSubtotal": this.minSubtotal = BooleanValue.parse(value); return;
      case ":productSubtotal": this.applyProductInSubtotal = BooleanValue.parse(value); return;
      case ":countSubtotal": this.countSubtotal = BooleanValue.parse(value); return;
      case ":stdDevSubtotal": this.applyStandardDeviationInSubtotal = BooleanValue.parse(value); return;
      case ":stdDevPSubtotal": this.applyStandardDeviationPInSubtotal = BooleanValue.parse(value); return;
      case ":varSubtotal": this.applyVarianceInSubtotal = BooleanValue.parse(value); return;
      case ":varPSubtotal": this.applyVariancePInSubtotal = BooleanValue.parse(value); return;
      case ":showPropCell": this.showPropCell = BooleanValue.parse(value); return;
      case ":showPropTip": this.showPropertyTooltip = BooleanValue.parse(value); return;
      case ":showPropAsCaption": this.showPropAsCaption = BooleanValue.parse(value); return;
      case ":defaultAttributeDrillState": this.defaultAttributeDrillState = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.axis !== undefined) out.push([":axis", this.axis.toString()]);
    if (this.dataField !== undefined) out.push([":dataField", this.dataField.toString()]);
    if (this.subtotalCaption !== undefined) out.push([":subtotalCaption", this.subtotalCaption.toString()]);
    if (this.showDropDowns !== undefined) out.push([":showDropDowns", this.showDropDowns.toString()]);
    if (this.hiddenLevel !== undefined) out.push([":hiddenLevel", this.hiddenLevel.toString()]);
    if (this.uniqueMemberProperty !== undefined) out.push([":uniqueMemberProperty", this.uniqueMemberProperty.toString()]);
    if (this.compact !== undefined) out.push([":compact", this.compact.toString()]);
    if (this.allDrilled !== undefined) out.push([":allDrilled", this.allDrilled.toString()]);
    if (this.numberFormatId !== undefined) out.push([":numFmtId", this.numberFormatId.toString()]);
    if (this.outline !== undefined) out.push([":outline", this.outline.toString()]);
    if (this.subtotalTop !== undefined) out.push([":subtotalTop", this.subtotalTop.toString()]);
    if (this.dragToRow !== undefined) out.push([":dragToRow", this.dragToRow.toString()]);
    if (this.dragToColumn !== undefined) out.push([":dragToCol", this.dragToColumn.toString()]);
    if (this.multipleItemSelectionAllowed !== undefined) out.push([":multipleItemSelectionAllowed", this.multipleItemSelectionAllowed.toString()]);
    if (this.dragToPage !== undefined) out.push([":dragToPage", this.dragToPage.toString()]);
    if (this.dragToData !== undefined) out.push([":dragToData", this.dragToData.toString()]);
    if (this.dragOff !== undefined) out.push([":dragOff", this.dragOff.toString()]);
    if (this.showAll !== undefined) out.push([":showAll", this.showAll.toString()]);
    if (this.insertBlankRow !== undefined) out.push([":insertBlankRow", this.insertBlankRow.toString()]);
    if (this.serverField !== undefined) out.push([":serverField", this.serverField.toString()]);
    if (this.insertPageBreak !== undefined) out.push([":insertPageBreak", this.insertPageBreak.toString()]);
    if (this.autoShow !== undefined) out.push([":autoShow", this.autoShow.toString()]);
    if (this.topAutoShow !== undefined) out.push([":topAutoShow", this.topAutoShow.toString()]);
    if (this.hideNewItems !== undefined) out.push([":hideNewItems", this.hideNewItems.toString()]);
    if (this.measureFilter !== undefined) out.push([":measureFilter", this.measureFilter.toString()]);
    if (this.includeNewItemsInFilter !== undefined) out.push([":includeNewItemsInFilter", this.includeNewItemsInFilter.toString()]);
    if (this.itemPageCount !== undefined) out.push([":itemPageCount", this.itemPageCount.toString()]);
    if (this.sortType !== undefined) out.push([":sortType", this.sortType.toString()]);
    if (this.dataSourceSort !== undefined) out.push([":dataSourceSort", this.dataSourceSort.toString()]);
    if (this.nonAutoSortDefault !== undefined) out.push([":nonAutoSortDefault", this.nonAutoSortDefault.toString()]);
    if (this.rankBy !== undefined) out.push([":rankBy", this.rankBy.toString()]);
    if (this.defaultSubtotal !== undefined) out.push([":defaultSubtotal", this.defaultSubtotal.toString()]);
    if (this.sumSubtotal !== undefined) out.push([":sumSubtotal", this.sumSubtotal.toString()]);
    if (this.countASubtotal !== undefined) out.push([":countASubtotal", this.countASubtotal.toString()]);
    if (this.averageSubTotal !== undefined) out.push([":avgSubtotal", this.averageSubTotal.toString()]);
    if (this.maxSubtotal !== undefined) out.push([":maxSubtotal", this.maxSubtotal.toString()]);
    if (this.minSubtotal !== undefined) out.push([":minSubtotal", this.minSubtotal.toString()]);
    if (this.applyProductInSubtotal !== undefined) out.push([":productSubtotal", this.applyProductInSubtotal.toString()]);
    if (this.countSubtotal !== undefined) out.push([":countSubtotal", this.countSubtotal.toString()]);
    if (this.applyStandardDeviationInSubtotal !== undefined) out.push([":stdDevSubtotal", this.applyStandardDeviationInSubtotal.toString()]);
    if (this.applyStandardDeviationPInSubtotal !== undefined) out.push([":stdDevPSubtotal", this.applyStandardDeviationPInSubtotal.toString()]);
    if (this.applyVarianceInSubtotal !== undefined) out.push([":varSubtotal", this.applyVarianceInSubtotal.toString()]);
    if (this.applyVariancePInSubtotal !== undefined) out.push([":varPSubtotal", this.applyVariancePInSubtotal.toString()]);
    if (this.showPropCell !== undefined) out.push([":showPropCell", this.showPropCell.toString()]);
    if (this.showPropertyTooltip !== undefined) out.push([":showPropTip", this.showPropertyTooltip.toString()]);
    if (this.showPropAsCaption !== undefined) out.push([":showPropAsCaption", this.showPropAsCaption.toString()]);
    if (this.defaultAttributeDrillState !== undefined) out.push([":defaultAttributeDrillState", this.defaultAttributeDrillState.toString()]);
    return out;
  }

}
