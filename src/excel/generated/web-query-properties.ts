// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.WebQueryProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the WebQueryProperties Class.
 *
 * Element: `x:webPr` */
export class WebQueryProperties extends OpenXmlCompositeElement {
  override readonly localName = "webPr" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** XML Source (:xml) */
  xmlSource: BooleanValue | undefined;

  /** Import XML Source Data (:sourceData) */
  sourceData: BooleanValue | undefined;

  /** Parse PRE (:parsePre) */
  parsePreTag: BooleanValue | undefined;

  /** Consecutive Delimiters (:consecutive) */
  consecutive: BooleanValue | undefined;

  /** Use First Row (:firstRow) */
  firstRow: BooleanValue | undefined;

  /** Created in Excel 97 (:xl97) */
  createdInExcel97: BooleanValue | undefined;

  /** Dates as Text (:textDates) */
  textDates: BooleanValue | undefined;

  /** Refreshed in Excel 2000 (:xl2000) */
  refreshedInExcel2000: BooleanValue | undefined;

  /** URL (:url) */
  url: StringValue | undefined;

  /** Web Post (:post) */
  post: StringValue | undefined;

  /** HTML Tables Only (:htmlTables) */
  htmlTables: BooleanValue | undefined;

  /** HTML Formatting Handling (:htmlFormat) */
  htmlFormat: StringValue | undefined;

  /** Edit Query URL (:editPage) */
  editPage: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":xml": this.xmlSource = BooleanValue.parse(value); return;
      case ":sourceData": this.sourceData = BooleanValue.parse(value); return;
      case ":parsePre": this.parsePreTag = BooleanValue.parse(value); return;
      case ":consecutive": this.consecutive = BooleanValue.parse(value); return;
      case ":firstRow": this.firstRow = BooleanValue.parse(value); return;
      case ":xl97": this.createdInExcel97 = BooleanValue.parse(value); return;
      case ":textDates": this.textDates = BooleanValue.parse(value); return;
      case ":xl2000": this.refreshedInExcel2000 = BooleanValue.parse(value); return;
      case ":url": this.url = StringValue.parse(value); return;
      case ":post": this.post = StringValue.parse(value); return;
      case ":htmlTables": this.htmlTables = BooleanValue.parse(value); return;
      case ":htmlFormat": this.htmlFormat = StringValue.parse(value); return;
      case ":editPage": this.editPage = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.xmlSource !== undefined) out.push([":xml", this.xmlSource.toString()]);
    if (this.sourceData !== undefined) out.push([":sourceData", this.sourceData.toString()]);
    if (this.parsePreTag !== undefined) out.push([":parsePre", this.parsePreTag.toString()]);
    if (this.consecutive !== undefined) out.push([":consecutive", this.consecutive.toString()]);
    if (this.firstRow !== undefined) out.push([":firstRow", this.firstRow.toString()]);
    if (this.createdInExcel97 !== undefined) out.push([":xl97", this.createdInExcel97.toString()]);
    if (this.textDates !== undefined) out.push([":textDates", this.textDates.toString()]);
    if (this.refreshedInExcel2000 !== undefined) out.push([":xl2000", this.refreshedInExcel2000.toString()]);
    if (this.url !== undefined) out.push([":url", this.url.toString()]);
    if (this.post !== undefined) out.push([":post", this.post.toString()]);
    if (this.htmlTables !== undefined) out.push([":htmlTables", this.htmlTables.toString()]);
    if (this.htmlFormat !== undefined) out.push([":htmlFormat", this.htmlFormat.toString()]);
    if (this.editPage !== undefined) out.push([":editPage", this.editPage.toString()]);
    return out;
  }

}
