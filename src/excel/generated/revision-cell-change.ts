// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionCellChange

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision Cell Change.
 *
 * Element: `x:rcc` */
export class RevisionCellChange extends OpenXmlCompositeElement {
  override readonly localName = "rcc" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Revision Id (:rId) */
  revisionId: UInt32Value | undefined;

  /** Revision From Rejection (:ua) */
  ua: BooleanValue | undefined;

  /** Revision Undo Rejected (:ra) */
  ra: BooleanValue | undefined;

  /** Sheet Id (:sId) */
  sheetId: UInt32Value | undefined;

  /** Old Formatting (:odxf) */
  oldFormatting: BooleanValue | undefined;

  /** Row Column Formatting Change (:xfDxf) */
  rowColumnFormattingAffected: BooleanValue | undefined;

  /** Style Revision (:s) */
  styleRevision: BooleanValue | undefined;

  /** Formatting (:dxf) */
  format: BooleanValue | undefined;

  /** Number Format Id (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  /** Quote Prefix (:quotePrefix) */
  quotePrefix: BooleanValue | undefined;

  /** Old Quote Prefix (:oldQuotePrefix) */
  oldQuotePrefix: BooleanValue | undefined;

  /** Phonetic Text (:ph) */
  hasPhoneticText: BooleanValue | undefined;

  /** Old Phonetic Text (:oldPh) */
  oldPhoneticText: BooleanValue | undefined;

  /** End of List  Formula Update (:endOfListFormulaUpdate) */
  endOfListFormulaUpdate: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rId": this.revisionId = UInt32Value.parse(value); return;
      case ":ua": this.ua = BooleanValue.parse(value); return;
      case ":ra": this.ra = BooleanValue.parse(value); return;
      case ":sId": this.sheetId = UInt32Value.parse(value); return;
      case ":odxf": this.oldFormatting = BooleanValue.parse(value); return;
      case ":xfDxf": this.rowColumnFormattingAffected = BooleanValue.parse(value); return;
      case ":s": this.styleRevision = BooleanValue.parse(value); return;
      case ":dxf": this.format = BooleanValue.parse(value); return;
      case ":numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
      case ":quotePrefix": this.quotePrefix = BooleanValue.parse(value); return;
      case ":oldQuotePrefix": this.oldQuotePrefix = BooleanValue.parse(value); return;
      case ":ph": this.hasPhoneticText = BooleanValue.parse(value); return;
      case ":oldPh": this.oldPhoneticText = BooleanValue.parse(value); return;
      case ":endOfListFormulaUpdate": this.endOfListFormulaUpdate = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.revisionId !== undefined) out.push([":rId", this.revisionId.toString()]);
    if (this.ua !== undefined) out.push([":ua", this.ua.toString()]);
    if (this.ra !== undefined) out.push([":ra", this.ra.toString()]);
    if (this.sheetId !== undefined) out.push([":sId", this.sheetId.toString()]);
    if (this.oldFormatting !== undefined) out.push([":odxf", this.oldFormatting.toString()]);
    if (this.rowColumnFormattingAffected !== undefined) out.push([":xfDxf", this.rowColumnFormattingAffected.toString()]);
    if (this.styleRevision !== undefined) out.push([":s", this.styleRevision.toString()]);
    if (this.format !== undefined) out.push([":dxf", this.format.toString()]);
    if (this.numberFormatId !== undefined) out.push([":numFmtId", this.numberFormatId.toString()]);
    if (this.quotePrefix !== undefined) out.push([":quotePrefix", this.quotePrefix.toString()]);
    if (this.oldQuotePrefix !== undefined) out.push([":oldQuotePrefix", this.oldQuotePrefix.toString()]);
    if (this.hasPhoneticText !== undefined) out.push([":ph", this.hasPhoneticText.toString()]);
    if (this.oldPhoneticText !== undefined) out.push([":oldPh", this.oldPhoneticText.toString()]);
    if (this.endOfListFormulaUpdate !== undefined) out.push([":endOfListFormulaUpdate", this.endOfListFormulaUpdate.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.revisionId, { attribute: ":rId", elementClass: "RevisionCellChange" });
    assertRequired(this.sheetId, { attribute: ":sId", elementClass: "RevisionCellChange" });
  }
}
