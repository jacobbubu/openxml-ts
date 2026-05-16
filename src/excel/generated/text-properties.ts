// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.TextProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Defines the TextProperties Class.
 *
 * Element: `x:textPr` */
export class TextProperties extends OpenXmlCompositeElement {
  override readonly localName = "textPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** prompt (:prompt) */
  prompt: BooleanValue | undefined;

  /** fileType (:fileType) */
  fileType: StringValue | undefined;

  /** codePage (:codePage) */
  codePage: UInt32Value | undefined;

  /** characterSet (:characterSet) */
  textCharacterSet: StringValue | undefined;

  /** firstRow (:firstRow) */
  firstRow: UInt32Value | undefined;

  /** sourceFile (:sourceFile) */
  sourceFile: StringValue | undefined;

  /** delimited (:delimited) */
  delimited: BooleanValue | undefined;

  /** decimal (:decimal) */
  decimal: StringValue | undefined;

  /** thousands (:thousands) */
  thousands: StringValue | undefined;

  /** tab (:tab) */
  tabAsDelimiter: BooleanValue | undefined;

  /** space (:space) */
  space: BooleanValue | undefined;

  /** comma (:comma) */
  comma: BooleanValue | undefined;

  /** semicolon (:semicolon) */
  semicolon: BooleanValue | undefined;

  /** consecutive (:consecutive) */
  consecutive: BooleanValue | undefined;

  /** qualifier (:qualifier) */
  qualifier: StringValue | undefined;

  /** delimiter (:delimiter) */
  delimiter: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":prompt": this.prompt = BooleanValue.parse(value); return;
      case ":fileType": this.fileType = StringValue.parse(value); return;
      case ":codePage": this.codePage = UInt32Value.parse(value); return;
      case ":characterSet": this.textCharacterSet = StringValue.parse(value); return;
      case ":firstRow": this.firstRow = UInt32Value.parse(value); return;
      case ":sourceFile": this.sourceFile = StringValue.parse(value); return;
      case ":delimited": this.delimited = BooleanValue.parse(value); return;
      case ":decimal": this.decimal = StringValue.parse(value); return;
      case ":thousands": this.thousands = StringValue.parse(value); return;
      case ":tab": this.tabAsDelimiter = BooleanValue.parse(value); return;
      case ":space": this.space = BooleanValue.parse(value); return;
      case ":comma": this.comma = BooleanValue.parse(value); return;
      case ":semicolon": this.semicolon = BooleanValue.parse(value); return;
      case ":consecutive": this.consecutive = BooleanValue.parse(value); return;
      case ":qualifier": this.qualifier = StringValue.parse(value); return;
      case ":delimiter": this.delimiter = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.prompt !== undefined) out.push([":prompt", this.prompt.toString()]);
    if (this.fileType !== undefined) out.push([":fileType", this.fileType.toString()]);
    if (this.codePage !== undefined) out.push([":codePage", this.codePage.toString()]);
    if (this.textCharacterSet !== undefined) out.push([":characterSet", this.textCharacterSet.toString()]);
    if (this.firstRow !== undefined) out.push([":firstRow", this.firstRow.toString()]);
    if (this.sourceFile !== undefined) out.push([":sourceFile", this.sourceFile.toString()]);
    if (this.delimited !== undefined) out.push([":delimited", this.delimited.toString()]);
    if (this.decimal !== undefined) out.push([":decimal", this.decimal.toString()]);
    if (this.thousands !== undefined) out.push([":thousands", this.thousands.toString()]);
    if (this.tabAsDelimiter !== undefined) out.push([":tab", this.tabAsDelimiter.toString()]);
    if (this.space !== undefined) out.push([":space", this.space.toString()]);
    if (this.comma !== undefined) out.push([":comma", this.comma.toString()]);
    if (this.semicolon !== undefined) out.push([":semicolon", this.semicolon.toString()]);
    if (this.consecutive !== undefined) out.push([":consecutive", this.consecutive.toString()]);
    if (this.qualifier !== undefined) out.push([":qualifier", this.qualifier.toString()]);
    if (this.delimiter !== undefined) out.push([":delimiter", this.delimiter.toString()]);
    return out;
  }

}
