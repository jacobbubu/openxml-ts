// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.RevisionAutoFormat

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Revision AutoFormat.
 *
 * Element: `x:raf` */
export class RevisionAutoFormat extends OpenXmlLeafElement {
  override readonly localName = "raf" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Sheet Id (:sheetId) */
  sheetId: UInt32Value | undefined;

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

  /** Reference (:ref) */
  reference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "sheetId": this.sheetId = UInt32Value.parse(value); return;
      case "autoFormatId": this.autoFormatId = UInt32Value.parse(value); return;
      case "applyNumberFormats": this.applyNumberFormats = BooleanValue.parse(value); return;
      case "applyBorderFormats": this.applyBorderFormats = BooleanValue.parse(value); return;
      case "applyFontFormats": this.applyFontFormats = BooleanValue.parse(value); return;
      case "applyPatternFormats": this.applyPatternFormats = BooleanValue.parse(value); return;
      case "applyAlignmentFormats": this.applyAlignmentFormats = BooleanValue.parse(value); return;
      case "applyWidthHeightFormats": this.applyWidthHeightFormats = BooleanValue.parse(value); return;
      case "ref": this.reference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.sheetId !== undefined) out.push(["sheetId", this.sheetId.toString()]);
    if (this.autoFormatId !== undefined) out.push(["autoFormatId", this.autoFormatId.toString()]);
    if (this.applyNumberFormats !== undefined) out.push(["applyNumberFormats", this.applyNumberFormats.toString()]);
    if (this.applyBorderFormats !== undefined) out.push(["applyBorderFormats", this.applyBorderFormats.toString()]);
    if (this.applyFontFormats !== undefined) out.push(["applyFontFormats", this.applyFontFormats.toString()]);
    if (this.applyPatternFormats !== undefined) out.push(["applyPatternFormats", this.applyPatternFormats.toString()]);
    if (this.applyAlignmentFormats !== undefined) out.push(["applyAlignmentFormats", this.applyAlignmentFormats.toString()]);
    if (this.applyWidthHeightFormats !== undefined) out.push(["applyWidthHeightFormats", this.applyWidthHeightFormats.toString()]);
    if (this.reference !== undefined) out.push(["ref", this.reference.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.sheetId, { attribute: ":sheetId", elementClass: "RevisionAutoFormat" });
    assertRequired(this.reference, { attribute: ":ref", elementClass: "RevisionAutoFormat" });
  }
}
