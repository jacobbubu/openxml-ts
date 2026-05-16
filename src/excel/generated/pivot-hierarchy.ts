// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.PivotHierarchy

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** OLAP Hierarchy.
 *
 * Element: `x:pivotHierarchy` */
export class PivotHierarchy extends OpenXmlCompositeElement {
  override readonly localName = "pivotHierarchy" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Outline New Levels (:outline) */
  outline: BooleanValue | undefined;

  /** Multiple Field Filters (:multipleItemSelectionAllowed) */
  multipleItemSelectionAllowed: BooleanValue | undefined;

  /** New Levels Subtotals At Top (:subtotalTop) */
  subtotalTop: BooleanValue | undefined;

  /** Show In Field List (:showInFieldList) */
  showInFieldList: BooleanValue | undefined;

  /** Drag To Row (:dragToRow) */
  dragToRow: BooleanValue | undefined;

  /** Drag To Column (:dragToCol) */
  dragToColumn: BooleanValue | undefined;

  /** Drag to Page (:dragToPage) */
  dragToPage: BooleanValue | undefined;

  /** Drag To Data (:dragToData) */
  dragToData: BooleanValue | undefined;

  /** Drag Off (:dragOff) */
  dragOff: BooleanValue | undefined;

  /** Inclusive Manual Filter (:includeNewItemsInFilter) */
  includeNewItemsInFilter: BooleanValue | undefined;

  /** Hierarchy Caption (:caption) */
  caption: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":outline": this.outline = BooleanValue.parse(value); return;
      case ":multipleItemSelectionAllowed": this.multipleItemSelectionAllowed = BooleanValue.parse(value); return;
      case ":subtotalTop": this.subtotalTop = BooleanValue.parse(value); return;
      case ":showInFieldList": this.showInFieldList = BooleanValue.parse(value); return;
      case ":dragToRow": this.dragToRow = BooleanValue.parse(value); return;
      case ":dragToCol": this.dragToColumn = BooleanValue.parse(value); return;
      case ":dragToPage": this.dragToPage = BooleanValue.parse(value); return;
      case ":dragToData": this.dragToData = BooleanValue.parse(value); return;
      case ":dragOff": this.dragOff = BooleanValue.parse(value); return;
      case ":includeNewItemsInFilter": this.includeNewItemsInFilter = BooleanValue.parse(value); return;
      case ":caption": this.caption = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.outline !== undefined) out.push([":outline", this.outline.toString()]);
    if (this.multipleItemSelectionAllowed !== undefined) out.push([":multipleItemSelectionAllowed", this.multipleItemSelectionAllowed.toString()]);
    if (this.subtotalTop !== undefined) out.push([":subtotalTop", this.subtotalTop.toString()]);
    if (this.showInFieldList !== undefined) out.push([":showInFieldList", this.showInFieldList.toString()]);
    if (this.dragToRow !== undefined) out.push([":dragToRow", this.dragToRow.toString()]);
    if (this.dragToColumn !== undefined) out.push([":dragToCol", this.dragToColumn.toString()]);
    if (this.dragToPage !== undefined) out.push([":dragToPage", this.dragToPage.toString()]);
    if (this.dragToData !== undefined) out.push([":dragToData", this.dragToData.toString()]);
    if (this.dragOff !== undefined) out.push([":dragOff", this.dragOff.toString()]);
    if (this.includeNewItemsInFilter !== undefined) out.push([":includeNewItemsInFilter", this.includeNewItemsInFilter.toString()]);
    if (this.caption !== undefined) out.push([":caption", this.caption.toString()]);
    return out;
  }

}
