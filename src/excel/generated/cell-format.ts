// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.CellFormat

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
} from "../../element/index.js";

/** Formatting Elements.
 *
 * Element: `x:xf` */
export class CellFormat extends OpenXmlCompositeElement {
  override readonly localName = "xf" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Number Format Id (:numFmtId) */
  numberFormatId: UInt32Value | undefined;

  /** Font Id (:fontId) */
  fontId: UInt32Value | undefined;

  /** Fill Id (:fillId) */
  fillId: UInt32Value | undefined;

  /** Border Id (:borderId) */
  borderId: UInt32Value | undefined;

  /** Format Id (:xfId) */
  formatId: UInt32Value | undefined;

  /** Quote Prefix (:quotePrefix) */
  quotePrefix: BooleanValue | undefined;

  /** Pivot Button (:pivotButton) */
  pivotButton: BooleanValue | undefined;

  /** Apply Number Format (:applyNumberFormat) */
  applyNumberFormat: BooleanValue | undefined;

  /** Apply Font (:applyFont) */
  applyFont: BooleanValue | undefined;

  /** Apply Fill (:applyFill) */
  applyFill: BooleanValue | undefined;

  /** Apply Border (:applyBorder) */
  applyBorder: BooleanValue | undefined;

  /** Apply Alignment (:applyAlignment) */
  applyAlignment: BooleanValue | undefined;

  /** Apply Protection (:applyProtection) */
  applyProtection: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "numFmtId": this.numberFormatId = UInt32Value.parse(value); return;
      case "fontId": this.fontId = UInt32Value.parse(value); return;
      case "fillId": this.fillId = UInt32Value.parse(value); return;
      case "borderId": this.borderId = UInt32Value.parse(value); return;
      case "xfId": this.formatId = UInt32Value.parse(value); return;
      case "quotePrefix": this.quotePrefix = BooleanValue.parse(value); return;
      case "pivotButton": this.pivotButton = BooleanValue.parse(value); return;
      case "applyNumberFormat": this.applyNumberFormat = BooleanValue.parse(value); return;
      case "applyFont": this.applyFont = BooleanValue.parse(value); return;
      case "applyFill": this.applyFill = BooleanValue.parse(value); return;
      case "applyBorder": this.applyBorder = BooleanValue.parse(value); return;
      case "applyAlignment": this.applyAlignment = BooleanValue.parse(value); return;
      case "applyProtection": this.applyProtection = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.numberFormatId !== undefined) out.push(["numFmtId", this.numberFormatId.toString()]);
    if (this.fontId !== undefined) out.push(["fontId", this.fontId.toString()]);
    if (this.fillId !== undefined) out.push(["fillId", this.fillId.toString()]);
    if (this.borderId !== undefined) out.push(["borderId", this.borderId.toString()]);
    if (this.formatId !== undefined) out.push(["xfId", this.formatId.toString()]);
    if (this.quotePrefix !== undefined) out.push(["quotePrefix", this.quotePrefix.toString()]);
    if (this.pivotButton !== undefined) out.push(["pivotButton", this.pivotButton.toString()]);
    if (this.applyNumberFormat !== undefined) out.push(["applyNumberFormat", this.applyNumberFormat.toString()]);
    if (this.applyFont !== undefined) out.push(["applyFont", this.applyFont.toString()]);
    if (this.applyFill !== undefined) out.push(["applyFill", this.applyFill.toString()]);
    if (this.applyBorder !== undefined) out.push(["applyBorder", this.applyBorder.toString()]);
    if (this.applyAlignment !== undefined) out.push(["applyAlignment", this.applyAlignment.toString()]);
    if (this.applyProtection !== undefined) out.push(["applyProtection", this.applyProtection.toString()]);
    return out;
  }

}
