// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.SheetFormatProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Dialog Sheet Format Properties.
 *
 * Element: `x:sheetFormatPr` */
export class SheetFormatProperties extends OpenXmlLeafElement {
  override readonly localName = "sheetFormatPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Base Column Width (:baseColWidth) */
  baseColumnWidth: UInt32Value | undefined;

  /** Default Column Width (:defaultColWidth) */
  defaultColumnWidth: StringValue | undefined;

  /** Default Row Height (:defaultRowHeight) */
  defaultRowHeight: StringValue | undefined;

  /** Custom Height (:customHeight) */
  customHeight: BooleanValue | undefined;

  /** Hidden By Default (:zeroHeight) */
  zeroHeight: BooleanValue | undefined;

  /** Thick Top Border (:thickTop) */
  thickTop: BooleanValue | undefined;

  /** Thick Bottom Border (:thickBottom) */
  thickBottom: BooleanValue | undefined;

  /** Maximum Outline Row (:outlineLevelRow) */
  outlineLevelRow: StringValue | undefined;

  /** Column Outline Level (:outlineLevelCol) */
  outlineLevelColumn: StringValue | undefined;

  /** dyDescent (x14ac:dyDescent) */
  dyDescent: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":baseColWidth": this.baseColumnWidth = UInt32Value.parse(value); return;
      case ":defaultColWidth": this.defaultColumnWidth = StringValue.parse(value); return;
      case ":defaultRowHeight": this.defaultRowHeight = StringValue.parse(value); return;
      case ":customHeight": this.customHeight = BooleanValue.parse(value); return;
      case ":zeroHeight": this.zeroHeight = BooleanValue.parse(value); return;
      case ":thickTop": this.thickTop = BooleanValue.parse(value); return;
      case ":thickBottom": this.thickBottom = BooleanValue.parse(value); return;
      case ":outlineLevelRow": this.outlineLevelRow = StringValue.parse(value); return;
      case ":outlineLevelCol": this.outlineLevelColumn = StringValue.parse(value); return;
      case "x14ac:dyDescent": this.dyDescent = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.baseColumnWidth !== undefined) out.push([":baseColWidth", this.baseColumnWidth.toString()]);
    if (this.defaultColumnWidth !== undefined) out.push([":defaultColWidth", this.defaultColumnWidth.toString()]);
    if (this.defaultRowHeight !== undefined) out.push([":defaultRowHeight", this.defaultRowHeight.toString()]);
    if (this.customHeight !== undefined) out.push([":customHeight", this.customHeight.toString()]);
    if (this.zeroHeight !== undefined) out.push([":zeroHeight", this.zeroHeight.toString()]);
    if (this.thickTop !== undefined) out.push([":thickTop", this.thickTop.toString()]);
    if (this.thickBottom !== undefined) out.push([":thickBottom", this.thickBottom.toString()]);
    if (this.outlineLevelRow !== undefined) out.push([":outlineLevelRow", this.outlineLevelRow.toString()]);
    if (this.outlineLevelColumn !== undefined) out.push([":outlineLevelCol", this.outlineLevelColumn.toString()]);
    if (this.dyDescent !== undefined) out.push(["x14ac:dyDescent", this.dyDescent.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.defaultRowHeight, { attribute: ":defaultRowHeight", elementClass: "SheetFormatProperties" });
  }
}
