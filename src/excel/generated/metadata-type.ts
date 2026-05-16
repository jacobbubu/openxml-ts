// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MetadataType

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Metadata Type Information.
 *
 * Element: `x:metadataType` */
export class MetadataType extends OpenXmlLeafElement {
  override readonly localName = "metadataType" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Metadata Type Name (:name) */
  name: StringValue | undefined;

  /** Minimum Supported Version (:minSupportedVersion) */
  minSupportedVersion: UInt32Value | undefined;

  /** Metadata Ghost Row (:ghostRow) */
  ghostRow: BooleanValue | undefined;

  /** Metadata Ghost Column (:ghostCol) */
  ghostColumn: BooleanValue | undefined;

  /** Metadata Edit (:edit) */
  edit: BooleanValue | undefined;

  /** Metadata Cell Value Delete (:delete) */
  delete: BooleanValue | undefined;

  /** Metadata Copy (:copy) */
  copy: BooleanValue | undefined;

  /** Metadata Paste All (:pasteAll) */
  pasteAll: BooleanValue | undefined;

  /** Metadata Paste Formulas (:pasteFormulas) */
  pasteFormulas: BooleanValue | undefined;

  /** Metadata Paste Special Values (:pasteValues) */
  pasteValues: BooleanValue | undefined;

  /** Metadata Paste Formats (:pasteFormats) */
  pasteFormats: BooleanValue | undefined;

  /** Metadata Paste Comments (:pasteComments) */
  pasteComments: BooleanValue | undefined;

  /** Metadata Paste Data Validation (:pasteDataValidation) */
  pasteDataValidation: BooleanValue | undefined;

  /** Metadata Paste Borders (:pasteBorders) */
  pasteBorders: BooleanValue | undefined;

  /** Metadata Paste Column Widths (:pasteColWidths) */
  pasteColWidths: BooleanValue | undefined;

  /** Metadata Paste Number Formats (:pasteNumberFormats) */
  pasteNumberFormats: BooleanValue | undefined;

  /** Metadata Merge (:merge) */
  merge: BooleanValue | undefined;

  /** Meatadata Split First (:splitFirst) */
  splitFirst: BooleanValue | undefined;

  /** Metadata Split All (:splitAll) */
  splitAll: BooleanValue | undefined;

  /** Metadata Insert Delete (:rowColShift) */
  rowColumnShift: BooleanValue | undefined;

  /** Metadata Clear All (:clearAll) */
  clearAll: BooleanValue | undefined;

  /** Metadata Clear Formats (:clearFormats) */
  clearFormats: BooleanValue | undefined;

  /** Metadata Clear Contents (:clearContents) */
  clearContents: BooleanValue | undefined;

  /** Metadata Clear Comments (:clearComments) */
  clearComments: BooleanValue | undefined;

  /** Metadata Formula Assignment (:assign) */
  assign: BooleanValue | undefined;

  /** Metadata Coercion (:coerce) */
  coerce: BooleanValue | undefined;

  /** Adjust Metadata (:adjust) */
  adjust: BooleanValue | undefined;

  /** Cell Metadata (:cellMeta) */
  cellMeta: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":name": this.name = StringValue.parse(value); return;
      case ":minSupportedVersion": this.minSupportedVersion = UInt32Value.parse(value); return;
      case ":ghostRow": this.ghostRow = BooleanValue.parse(value); return;
      case ":ghostCol": this.ghostColumn = BooleanValue.parse(value); return;
      case ":edit": this.edit = BooleanValue.parse(value); return;
      case ":delete": this.delete = BooleanValue.parse(value); return;
      case ":copy": this.copy = BooleanValue.parse(value); return;
      case ":pasteAll": this.pasteAll = BooleanValue.parse(value); return;
      case ":pasteFormulas": this.pasteFormulas = BooleanValue.parse(value); return;
      case ":pasteValues": this.pasteValues = BooleanValue.parse(value); return;
      case ":pasteFormats": this.pasteFormats = BooleanValue.parse(value); return;
      case ":pasteComments": this.pasteComments = BooleanValue.parse(value); return;
      case ":pasteDataValidation": this.pasteDataValidation = BooleanValue.parse(value); return;
      case ":pasteBorders": this.pasteBorders = BooleanValue.parse(value); return;
      case ":pasteColWidths": this.pasteColWidths = BooleanValue.parse(value); return;
      case ":pasteNumberFormats": this.pasteNumberFormats = BooleanValue.parse(value); return;
      case ":merge": this.merge = BooleanValue.parse(value); return;
      case ":splitFirst": this.splitFirst = BooleanValue.parse(value); return;
      case ":splitAll": this.splitAll = BooleanValue.parse(value); return;
      case ":rowColShift": this.rowColumnShift = BooleanValue.parse(value); return;
      case ":clearAll": this.clearAll = BooleanValue.parse(value); return;
      case ":clearFormats": this.clearFormats = BooleanValue.parse(value); return;
      case ":clearContents": this.clearContents = BooleanValue.parse(value); return;
      case ":clearComments": this.clearComments = BooleanValue.parse(value); return;
      case ":assign": this.assign = BooleanValue.parse(value); return;
      case ":coerce": this.coerce = BooleanValue.parse(value); return;
      case ":adjust": this.adjust = BooleanValue.parse(value); return;
      case ":cellMeta": this.cellMeta = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push([":name", this.name.toString()]);
    if (this.minSupportedVersion !== undefined) out.push([":minSupportedVersion", this.minSupportedVersion.toString()]);
    if (this.ghostRow !== undefined) out.push([":ghostRow", this.ghostRow.toString()]);
    if (this.ghostColumn !== undefined) out.push([":ghostCol", this.ghostColumn.toString()]);
    if (this.edit !== undefined) out.push([":edit", this.edit.toString()]);
    if (this.delete !== undefined) out.push([":delete", this.delete.toString()]);
    if (this.copy !== undefined) out.push([":copy", this.copy.toString()]);
    if (this.pasteAll !== undefined) out.push([":pasteAll", this.pasteAll.toString()]);
    if (this.pasteFormulas !== undefined) out.push([":pasteFormulas", this.pasteFormulas.toString()]);
    if (this.pasteValues !== undefined) out.push([":pasteValues", this.pasteValues.toString()]);
    if (this.pasteFormats !== undefined) out.push([":pasteFormats", this.pasteFormats.toString()]);
    if (this.pasteComments !== undefined) out.push([":pasteComments", this.pasteComments.toString()]);
    if (this.pasteDataValidation !== undefined) out.push([":pasteDataValidation", this.pasteDataValidation.toString()]);
    if (this.pasteBorders !== undefined) out.push([":pasteBorders", this.pasteBorders.toString()]);
    if (this.pasteColWidths !== undefined) out.push([":pasteColWidths", this.pasteColWidths.toString()]);
    if (this.pasteNumberFormats !== undefined) out.push([":pasteNumberFormats", this.pasteNumberFormats.toString()]);
    if (this.merge !== undefined) out.push([":merge", this.merge.toString()]);
    if (this.splitFirst !== undefined) out.push([":splitFirst", this.splitFirst.toString()]);
    if (this.splitAll !== undefined) out.push([":splitAll", this.splitAll.toString()]);
    if (this.rowColumnShift !== undefined) out.push([":rowColShift", this.rowColumnShift.toString()]);
    if (this.clearAll !== undefined) out.push([":clearAll", this.clearAll.toString()]);
    if (this.clearFormats !== undefined) out.push([":clearFormats", this.clearFormats.toString()]);
    if (this.clearContents !== undefined) out.push([":clearContents", this.clearContents.toString()]);
    if (this.clearComments !== undefined) out.push([":clearComments", this.clearComments.toString()]);
    if (this.assign !== undefined) out.push([":assign", this.assign.toString()]);
    if (this.coerce !== undefined) out.push([":coerce", this.coerce.toString()]);
    if (this.adjust !== undefined) out.push([":adjust", this.adjust.toString()]);
    if (this.cellMeta !== undefined) out.push([":cellMeta", this.cellMeta.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "MetadataType" });
    assertRequired(this.minSupportedVersion, { attribute: ":minSupportedVersion", elementClass: "MetadataType" });
  }
}
