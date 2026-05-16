// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.QueryTable

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Query Table.
 *
 * Element: `x:queryTable` */
export class QueryTable extends OpenXmlCompositeElement {
  override readonly localName = "queryTable" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (:name) */
  name: StringValue | undefined;

  /** headers (:headers) */
  headers: BooleanValue | undefined;

  /** rowNumbers (:rowNumbers) */
  rowNumbers: BooleanValue | undefined;

  /** disableRefresh (:disableRefresh) */
  disableRefresh: BooleanValue | undefined;

  /** backgroundRefresh (:backgroundRefresh) */
  backgroundRefresh: BooleanValue | undefined;

  /** firstBackgroundRefresh (:firstBackgroundRefresh) */
  firstBackgroundRefresh: BooleanValue | undefined;

  /** refreshOnLoad (:refreshOnLoad) */
  refreshOnLoad: BooleanValue | undefined;

  /** growShrinkType (:growShrinkType) */
  growShrinkType: StringValue | undefined;

  /** fillFormulas (:fillFormulas) */
  fillFormulas: BooleanValue | undefined;

  /** removeDataOnSave (:removeDataOnSave) */
  removeDataOnSave: BooleanValue | undefined;

  /** disableEdit (:disableEdit) */
  disableEdit: BooleanValue | undefined;

  /** preserveFormatting (:preserveFormatting) */
  preserveFormatting: BooleanValue | undefined;

  /** adjustColumnWidth (:adjustColumnWidth) */
  adjustColumnWidth: BooleanValue | undefined;

  /** intermediate (:intermediate) */
  intermediate: BooleanValue | undefined;

  /** connectionId (:connectionId) */
  connectionId: UInt32Value | undefined;

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

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":headers": this.headers = BooleanValue.parse(value); return;
      case ":rowNumbers": this.rowNumbers = BooleanValue.parse(value); return;
      case ":disableRefresh": this.disableRefresh = BooleanValue.parse(value); return;
      case ":backgroundRefresh": this.backgroundRefresh = BooleanValue.parse(value); return;
      case ":firstBackgroundRefresh": this.firstBackgroundRefresh = BooleanValue.parse(value); return;
      case ":refreshOnLoad": this.refreshOnLoad = BooleanValue.parse(value); return;
      case ":growShrinkType": this.growShrinkType = StringValue.parse(value); return;
      case ":fillFormulas": this.fillFormulas = BooleanValue.parse(value); return;
      case ":removeDataOnSave": this.removeDataOnSave = BooleanValue.parse(value); return;
      case ":disableEdit": this.disableEdit = BooleanValue.parse(value); return;
      case ":preserveFormatting": this.preserveFormatting = BooleanValue.parse(value); return;
      case ":adjustColumnWidth": this.adjustColumnWidth = BooleanValue.parse(value); return;
      case ":intermediate": this.intermediate = BooleanValue.parse(value); return;
      case ":connectionId": this.connectionId = UInt32Value.parse(value); return;
      case ":autoFormatId": this.autoFormatId = UInt32Value.parse(value); return;
      case ":applyNumberFormats": this.applyNumberFormats = BooleanValue.parse(value); return;
      case ":applyBorderFormats": this.applyBorderFormats = BooleanValue.parse(value); return;
      case ":applyFontFormats": this.applyFontFormats = BooleanValue.parse(value); return;
      case ":applyPatternFormats": this.applyPatternFormats = BooleanValue.parse(value); return;
      case ":applyAlignmentFormats": this.applyAlignmentFormats = BooleanValue.parse(value); return;
      case ":applyWidthHeightFormats": this.applyWidthHeightFormats = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.headers !== undefined) out.push([":headers", this.headers.toString()]);
    if (this.rowNumbers !== undefined) out.push([":rowNumbers", this.rowNumbers.toString()]);
    if (this.disableRefresh !== undefined) out.push([":disableRefresh", this.disableRefresh.toString()]);
    if (this.backgroundRefresh !== undefined) out.push([":backgroundRefresh", this.backgroundRefresh.toString()]);
    if (this.firstBackgroundRefresh !== undefined) out.push([":firstBackgroundRefresh", this.firstBackgroundRefresh.toString()]);
    if (this.refreshOnLoad !== undefined) out.push([":refreshOnLoad", this.refreshOnLoad.toString()]);
    if (this.growShrinkType !== undefined) out.push([":growShrinkType", this.growShrinkType.toString()]);
    if (this.fillFormulas !== undefined) out.push([":fillFormulas", this.fillFormulas.toString()]);
    if (this.removeDataOnSave !== undefined) out.push([":removeDataOnSave", this.removeDataOnSave.toString()]);
    if (this.disableEdit !== undefined) out.push([":disableEdit", this.disableEdit.toString()]);
    if (this.preserveFormatting !== undefined) out.push([":preserveFormatting", this.preserveFormatting.toString()]);
    if (this.adjustColumnWidth !== undefined) out.push([":adjustColumnWidth", this.adjustColumnWidth.toString()]);
    if (this.intermediate !== undefined) out.push([":intermediate", this.intermediate.toString()]);
    if (this.connectionId !== undefined) out.push([":connectionId", this.connectionId.toString()]);
    if (this.autoFormatId !== undefined) out.push([":autoFormatId", this.autoFormatId.toString()]);
    if (this.applyNumberFormats !== undefined) out.push([":applyNumberFormats", this.applyNumberFormats.toString()]);
    if (this.applyBorderFormats !== undefined) out.push([":applyBorderFormats", this.applyBorderFormats.toString()]);
    if (this.applyFontFormats !== undefined) out.push([":applyFontFormats", this.applyFontFormats.toString()]);
    if (this.applyPatternFormats !== undefined) out.push([":applyPatternFormats", this.applyPatternFormats.toString()]);
    if (this.applyAlignmentFormats !== undefined) out.push([":applyAlignmentFormats", this.applyAlignmentFormats.toString()]);
    if (this.applyWidthHeightFormats !== undefined) out.push([":applyWidthHeightFormats", this.applyWidthHeightFormats.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "QueryTable" });
    assertRequired(this.connectionId, { attribute: ":connectionId", elementClass: "QueryTable" });
  }
}
