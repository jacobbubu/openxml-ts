// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2014_revision.json
// @see DocumentFormat.OpenXml.Spreadsheetml2014Revision.pivotTableDefinition

import {
  BooleanValue,
  ByteValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Represents a PivotTable View..
 *
 * Element: `xr:pivotTableDefinition` */
export class pivotTableDefinition extends OpenXmlCompositeElement {
  override readonly localName = "pivotTableDefinition" as const;
  override readonly prefix = "xr" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2014/revision" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** cacheId (:cacheId) */
  cacheId: UInt32Value | undefined;

  /** dataOnRows (:dataOnRows) */
  dataOnRows: BooleanValue | undefined;

  /** dataPosition (:dataPosition) */
  dataPosition: UInt32Value | undefined;

  /** Auto Format Id (:autoFormatId) */
  autoFormatId: UInt32Value | undefined;

  /** Apply Number Formats (:applyNumberFormats) */
  applyNumberFormats: BooleanValue | undefined;

  /** Apply Border Formats (:applyBorderFormats) */
  applyBorderFormats: BooleanValue | undefined;

  /** Apply Font Formats (:applyFontFormats) */
  applyFontFormats: BooleanValue | undefined;

  /** Apply Pattern Formats (:applyPatternFormats) */
  applyPatternFormats: BooleanValue | undefined;

  /** Apply Alignment Formats (:applyAlignmentFormats) */
  applyAlignmentFormats: BooleanValue | undefined;

  /** Apply Width / Height Formats (:applyWidthHeightFormats) */
  applyWidthHeightFormats: BooleanValue | undefined;

  /** dataCaption (:dataCaption) */
  dataCaption: StringValue | undefined;

  /** grandTotalCaption (:grandTotalCaption) */
  grandTotalCaption: StringValue | undefined;

  /** errorCaption (:errorCaption) */
  errorCaption: StringValue | undefined;

  /** showError (:showError) */
  showError: BooleanValue | undefined;

  /** missingCaption (:missingCaption) */
  missingCaption: StringValue | undefined;

  /** showMissing (:showMissing) */
  showMissing: BooleanValue | undefined;

  /** pageStyle (:pageStyle) */
  pageStyle: StringValue | undefined;

  /** pivotTableStyle (:pivotTableStyle) */
  pivotTableStyleName: StringValue | undefined;

  /** vacatedStyle (:vacatedStyle) */
  vacatedStyle: StringValue | undefined;

  /** tag (:tag) */
  tag: StringValue | undefined;

  /** updatedVersion (:updatedVersion) */
  updatedVersion: ByteValue | undefined;

  /** minRefreshableVersion (:minRefreshableVersion) */
  minRefreshableVersion: ByteValue | undefined;

  /** asteriskTotals (:asteriskTotals) */
  asteriskTotals: BooleanValue | undefined;

  /** showItems (:showItems) */
  showItems: BooleanValue | undefined;

  /** editData (:editData) */
  editData: BooleanValue | undefined;

  /** disableFieldList (:disableFieldList) */
  disableFieldList: BooleanValue | undefined;

  /** showCalcMbrs (:showCalcMbrs) */
  showCalculatedMembers: BooleanValue | undefined;

  /** visualTotals (:visualTotals) */
  visualTotals: BooleanValue | undefined;

  /** showMultipleLabel (:showMultipleLabel) */
  showMultipleLabel: BooleanValue | undefined;

  /** showDataDropDown (:showDataDropDown) */
  showDataDropDown: BooleanValue | undefined;

  /** showDrill (:showDrill) */
  showDrill: BooleanValue | undefined;

  /** printDrill (:printDrill) */
  printDrill: BooleanValue | undefined;

  /** showMemberPropertyTips (:showMemberPropertyTips) */
  showMemberPropertyTips: BooleanValue | undefined;

  /** showDataTips (:showDataTips) */
  showDataTips: BooleanValue | undefined;

  /** enableWizard (:enableWizard) */
  enableWizard: BooleanValue | undefined;

  /** enableDrill (:enableDrill) */
  enableDrill: BooleanValue | undefined;

  /** enableFieldProperties (:enableFieldProperties) */
  enableFieldProperties: BooleanValue | undefined;

  /** preserveFormatting (:preserveFormatting) */
  preserveFormatting: BooleanValue | undefined;

  /** useAutoFormatting (:useAutoFormatting) */
  useAutoFormatting: BooleanValue | undefined;

  /** pageWrap (:pageWrap) */
  pageWrap: UInt32Value | undefined;

  /** pageOverThenDown (:pageOverThenDown) */
  pageOverThenDown: BooleanValue | undefined;

  /** subtotalHiddenItems (:subtotalHiddenItems) */
  subtotalHiddenItems: BooleanValue | undefined;

  /** rowGrandTotals (:rowGrandTotals) */
  rowGrandTotals: BooleanValue | undefined;

  /** colGrandTotals (:colGrandTotals) */
  columnGrandTotals: BooleanValue | undefined;

  /** fieldPrintTitles (:fieldPrintTitles) */
  fieldPrintTitles: BooleanValue | undefined;

  /** itemPrintTitles (:itemPrintTitles) */
  itemPrintTitles: BooleanValue | undefined;

  /** mergeItem (:mergeItem) */
  mergeItem: BooleanValue | undefined;

  /** showDropZones (:showDropZones) */
  showDropZones: BooleanValue | undefined;

  /** createdVersion (:createdVersion) */
  createdVersion: ByteValue | undefined;

  /** indent (:indent) */
  indent: UInt32Value | undefined;

  /** showEmptyRow (:showEmptyRow) */
  showEmptyRow: BooleanValue | undefined;

  /** showEmptyCol (:showEmptyCol) */
  showEmptyColumn: BooleanValue | undefined;

  /** showHeaders (:showHeaders) */
  showHeaders: BooleanValue | undefined;

  /** compact (:compact) */
  compact: BooleanValue | undefined;

  /** outline (:outline) */
  outline: BooleanValue | undefined;

  /** outlineData (:outlineData) */
  outlineData: BooleanValue | undefined;

  /** compactData (:compactData) */
  compactData: BooleanValue | undefined;

  /** published (:published) */
  published: BooleanValue | undefined;

  /** gridDropZones (:gridDropZones) */
  gridDropZones: BooleanValue | undefined;

  /** immersive (:immersive) */
  stopImmersiveUi: BooleanValue | undefined;

  /** multipleFieldFilters (:multipleFieldFilters) */
  multipleFieldFilters: BooleanValue | undefined;

  /** chartFormat (:chartFormat) */
  chartFormat: UInt32Value | undefined;

  /** rowHeaderCaption (:rowHeaderCaption) */
  rowHeaderCaption: StringValue | undefined;

  /** colHeaderCaption (:colHeaderCaption) */
  columnHeaderCaption: StringValue | undefined;

  /** fieldListSortAscending (:fieldListSortAscending) */
  fieldListSortAscending: BooleanValue | undefined;

  /** mdxSubqueries (:mdxSubqueries) */
  mdxSubqueries: BooleanValue | undefined;

  /** customListSort (:customListSort) */
  customListSort: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "cacheId": this.cacheId = UInt32Value.parse(value); return;
      case "dataOnRows": this.dataOnRows = BooleanValue.parse(value); return;
      case "dataPosition": this.dataPosition = UInt32Value.parse(value); return;
      case "autoFormatId": this.autoFormatId = UInt32Value.parse(value); return;
      case "applyNumberFormats": this.applyNumberFormats = BooleanValue.parse(value); return;
      case "applyBorderFormats": this.applyBorderFormats = BooleanValue.parse(value); return;
      case "applyFontFormats": this.applyFontFormats = BooleanValue.parse(value); return;
      case "applyPatternFormats": this.applyPatternFormats = BooleanValue.parse(value); return;
      case "applyAlignmentFormats": this.applyAlignmentFormats = BooleanValue.parse(value); return;
      case "applyWidthHeightFormats": this.applyWidthHeightFormats = BooleanValue.parse(value); return;
      case "dataCaption": this.dataCaption = StringValue.parse(value); return;
      case "grandTotalCaption": this.grandTotalCaption = StringValue.parse(value); return;
      case "errorCaption": this.errorCaption = StringValue.parse(value); return;
      case "showError": this.showError = BooleanValue.parse(value); return;
      case "missingCaption": this.missingCaption = StringValue.parse(value); return;
      case "showMissing": this.showMissing = BooleanValue.parse(value); return;
      case "pageStyle": this.pageStyle = StringValue.parse(value); return;
      case "pivotTableStyle": this.pivotTableStyleName = StringValue.parse(value); return;
      case "vacatedStyle": this.vacatedStyle = StringValue.parse(value); return;
      case "tag": this.tag = StringValue.parse(value); return;
      case "updatedVersion": this.updatedVersion = ByteValue.parse(value); return;
      case "minRefreshableVersion": this.minRefreshableVersion = ByteValue.parse(value); return;
      case "asteriskTotals": this.asteriskTotals = BooleanValue.parse(value); return;
      case "showItems": this.showItems = BooleanValue.parse(value); return;
      case "editData": this.editData = BooleanValue.parse(value); return;
      case "disableFieldList": this.disableFieldList = BooleanValue.parse(value); return;
      case "showCalcMbrs": this.showCalculatedMembers = BooleanValue.parse(value); return;
      case "visualTotals": this.visualTotals = BooleanValue.parse(value); return;
      case "showMultipleLabel": this.showMultipleLabel = BooleanValue.parse(value); return;
      case "showDataDropDown": this.showDataDropDown = BooleanValue.parse(value); return;
      case "showDrill": this.showDrill = BooleanValue.parse(value); return;
      case "printDrill": this.printDrill = BooleanValue.parse(value); return;
      case "showMemberPropertyTips": this.showMemberPropertyTips = BooleanValue.parse(value); return;
      case "showDataTips": this.showDataTips = BooleanValue.parse(value); return;
      case "enableWizard": this.enableWizard = BooleanValue.parse(value); return;
      case "enableDrill": this.enableDrill = BooleanValue.parse(value); return;
      case "enableFieldProperties": this.enableFieldProperties = BooleanValue.parse(value); return;
      case "preserveFormatting": this.preserveFormatting = BooleanValue.parse(value); return;
      case "useAutoFormatting": this.useAutoFormatting = BooleanValue.parse(value); return;
      case "pageWrap": this.pageWrap = UInt32Value.parse(value); return;
      case "pageOverThenDown": this.pageOverThenDown = BooleanValue.parse(value); return;
      case "subtotalHiddenItems": this.subtotalHiddenItems = BooleanValue.parse(value); return;
      case "rowGrandTotals": this.rowGrandTotals = BooleanValue.parse(value); return;
      case "colGrandTotals": this.columnGrandTotals = BooleanValue.parse(value); return;
      case "fieldPrintTitles": this.fieldPrintTitles = BooleanValue.parse(value); return;
      case "itemPrintTitles": this.itemPrintTitles = BooleanValue.parse(value); return;
      case "mergeItem": this.mergeItem = BooleanValue.parse(value); return;
      case "showDropZones": this.showDropZones = BooleanValue.parse(value); return;
      case "createdVersion": this.createdVersion = ByteValue.parse(value); return;
      case "indent": this.indent = UInt32Value.parse(value); return;
      case "showEmptyRow": this.showEmptyRow = BooleanValue.parse(value); return;
      case "showEmptyCol": this.showEmptyColumn = BooleanValue.parse(value); return;
      case "showHeaders": this.showHeaders = BooleanValue.parse(value); return;
      case "compact": this.compact = BooleanValue.parse(value); return;
      case "outline": this.outline = BooleanValue.parse(value); return;
      case "outlineData": this.outlineData = BooleanValue.parse(value); return;
      case "compactData": this.compactData = BooleanValue.parse(value); return;
      case "published": this.published = BooleanValue.parse(value); return;
      case "gridDropZones": this.gridDropZones = BooleanValue.parse(value); return;
      case "immersive": this.stopImmersiveUi = BooleanValue.parse(value); return;
      case "multipleFieldFilters": this.multipleFieldFilters = BooleanValue.parse(value); return;
      case "chartFormat": this.chartFormat = UInt32Value.parse(value); return;
      case "rowHeaderCaption": this.rowHeaderCaption = StringValue.parse(value); return;
      case "colHeaderCaption": this.columnHeaderCaption = StringValue.parse(value); return;
      case "fieldListSortAscending": this.fieldListSortAscending = BooleanValue.parse(value); return;
      case "mdxSubqueries": this.mdxSubqueries = BooleanValue.parse(value); return;
      case "customListSort": this.customListSort = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.cacheId !== undefined) out.push(["cacheId", this.cacheId.toString()]);
    if (this.dataOnRows !== undefined) out.push(["dataOnRows", this.dataOnRows.toString()]);
    if (this.dataPosition !== undefined) out.push(["dataPosition", this.dataPosition.toString()]);
    if (this.autoFormatId !== undefined) out.push(["autoFormatId", this.autoFormatId.toString()]);
    if (this.applyNumberFormats !== undefined) out.push(["applyNumberFormats", this.applyNumberFormats.toString()]);
    if (this.applyBorderFormats !== undefined) out.push(["applyBorderFormats", this.applyBorderFormats.toString()]);
    if (this.applyFontFormats !== undefined) out.push(["applyFontFormats", this.applyFontFormats.toString()]);
    if (this.applyPatternFormats !== undefined) out.push(["applyPatternFormats", this.applyPatternFormats.toString()]);
    if (this.applyAlignmentFormats !== undefined) out.push(["applyAlignmentFormats", this.applyAlignmentFormats.toString()]);
    if (this.applyWidthHeightFormats !== undefined) out.push(["applyWidthHeightFormats", this.applyWidthHeightFormats.toString()]);
    if (this.dataCaption !== undefined) out.push(["dataCaption", this.dataCaption.toString()]);
    if (this.grandTotalCaption !== undefined) out.push(["grandTotalCaption", this.grandTotalCaption.toString()]);
    if (this.errorCaption !== undefined) out.push(["errorCaption", this.errorCaption.toString()]);
    if (this.showError !== undefined) out.push(["showError", this.showError.toString()]);
    if (this.missingCaption !== undefined) out.push(["missingCaption", this.missingCaption.toString()]);
    if (this.showMissing !== undefined) out.push(["showMissing", this.showMissing.toString()]);
    if (this.pageStyle !== undefined) out.push(["pageStyle", this.pageStyle.toString()]);
    if (this.pivotTableStyleName !== undefined) out.push(["pivotTableStyle", this.pivotTableStyleName.toString()]);
    if (this.vacatedStyle !== undefined) out.push(["vacatedStyle", this.vacatedStyle.toString()]);
    if (this.tag !== undefined) out.push(["tag", this.tag.toString()]);
    if (this.updatedVersion !== undefined) out.push(["updatedVersion", this.updatedVersion.toString()]);
    if (this.minRefreshableVersion !== undefined) out.push(["minRefreshableVersion", this.minRefreshableVersion.toString()]);
    if (this.asteriskTotals !== undefined) out.push(["asteriskTotals", this.asteriskTotals.toString()]);
    if (this.showItems !== undefined) out.push(["showItems", this.showItems.toString()]);
    if (this.editData !== undefined) out.push(["editData", this.editData.toString()]);
    if (this.disableFieldList !== undefined) out.push(["disableFieldList", this.disableFieldList.toString()]);
    if (this.showCalculatedMembers !== undefined) out.push(["showCalcMbrs", this.showCalculatedMembers.toString()]);
    if (this.visualTotals !== undefined) out.push(["visualTotals", this.visualTotals.toString()]);
    if (this.showMultipleLabel !== undefined) out.push(["showMultipleLabel", this.showMultipleLabel.toString()]);
    if (this.showDataDropDown !== undefined) out.push(["showDataDropDown", this.showDataDropDown.toString()]);
    if (this.showDrill !== undefined) out.push(["showDrill", this.showDrill.toString()]);
    if (this.printDrill !== undefined) out.push(["printDrill", this.printDrill.toString()]);
    if (this.showMemberPropertyTips !== undefined) out.push(["showMemberPropertyTips", this.showMemberPropertyTips.toString()]);
    if (this.showDataTips !== undefined) out.push(["showDataTips", this.showDataTips.toString()]);
    if (this.enableWizard !== undefined) out.push(["enableWizard", this.enableWizard.toString()]);
    if (this.enableDrill !== undefined) out.push(["enableDrill", this.enableDrill.toString()]);
    if (this.enableFieldProperties !== undefined) out.push(["enableFieldProperties", this.enableFieldProperties.toString()]);
    if (this.preserveFormatting !== undefined) out.push(["preserveFormatting", this.preserveFormatting.toString()]);
    if (this.useAutoFormatting !== undefined) out.push(["useAutoFormatting", this.useAutoFormatting.toString()]);
    if (this.pageWrap !== undefined) out.push(["pageWrap", this.pageWrap.toString()]);
    if (this.pageOverThenDown !== undefined) out.push(["pageOverThenDown", this.pageOverThenDown.toString()]);
    if (this.subtotalHiddenItems !== undefined) out.push(["subtotalHiddenItems", this.subtotalHiddenItems.toString()]);
    if (this.rowGrandTotals !== undefined) out.push(["rowGrandTotals", this.rowGrandTotals.toString()]);
    if (this.columnGrandTotals !== undefined) out.push(["colGrandTotals", this.columnGrandTotals.toString()]);
    if (this.fieldPrintTitles !== undefined) out.push(["fieldPrintTitles", this.fieldPrintTitles.toString()]);
    if (this.itemPrintTitles !== undefined) out.push(["itemPrintTitles", this.itemPrintTitles.toString()]);
    if (this.mergeItem !== undefined) out.push(["mergeItem", this.mergeItem.toString()]);
    if (this.showDropZones !== undefined) out.push(["showDropZones", this.showDropZones.toString()]);
    if (this.createdVersion !== undefined) out.push(["createdVersion", this.createdVersion.toString()]);
    if (this.indent !== undefined) out.push(["indent", this.indent.toString()]);
    if (this.showEmptyRow !== undefined) out.push(["showEmptyRow", this.showEmptyRow.toString()]);
    if (this.showEmptyColumn !== undefined) out.push(["showEmptyCol", this.showEmptyColumn.toString()]);
    if (this.showHeaders !== undefined) out.push(["showHeaders", this.showHeaders.toString()]);
    if (this.compact !== undefined) out.push(["compact", this.compact.toString()]);
    if (this.outline !== undefined) out.push(["outline", this.outline.toString()]);
    if (this.outlineData !== undefined) out.push(["outlineData", this.outlineData.toString()]);
    if (this.compactData !== undefined) out.push(["compactData", this.compactData.toString()]);
    if (this.published !== undefined) out.push(["published", this.published.toString()]);
    if (this.gridDropZones !== undefined) out.push(["gridDropZones", this.gridDropZones.toString()]);
    if (this.stopImmersiveUi !== undefined) out.push(["immersive", this.stopImmersiveUi.toString()]);
    if (this.multipleFieldFilters !== undefined) out.push(["multipleFieldFilters", this.multipleFieldFilters.toString()]);
    if (this.chartFormat !== undefined) out.push(["chartFormat", this.chartFormat.toString()]);
    if (this.rowHeaderCaption !== undefined) out.push(["rowHeaderCaption", this.rowHeaderCaption.toString()]);
    if (this.columnHeaderCaption !== undefined) out.push(["colHeaderCaption", this.columnHeaderCaption.toString()]);
    if (this.fieldListSortAscending !== undefined) out.push(["fieldListSortAscending", this.fieldListSortAscending.toString()]);
    if (this.mdxSubqueries !== undefined) out.push(["mdxSubqueries", this.mdxSubqueries.toString()]);
    if (this.customListSort !== undefined) out.push(["customListSort", this.customListSort.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "pivotTableDefinition" });
    assertRequired(this.cacheId, { attribute: ":cacheId", elementClass: "pivotTableDefinition" });
    assertRequired(this.dataCaption, { attribute: ":dataCaption", elementClass: "pivotTableDefinition" });
  }
}
