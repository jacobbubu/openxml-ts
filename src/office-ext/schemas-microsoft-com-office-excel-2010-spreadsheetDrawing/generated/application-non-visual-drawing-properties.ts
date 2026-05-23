// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2010_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.Excel2010SpreadsheetDrawing.ApplicationNonVisualDrawingProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ApplicationNonVisualDrawingProperties Class.
 *
 * Element: `xdr14:nvPr` */
export class ApplicationNonVisualDrawingProperties extends OpenXmlLeafElement {
  override readonly localName = "nvPr" as const;
  override readonly prefix = "xdr14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing" as const;


  /** macro (:macro) */
  macro: StringValue | undefined;

  /** fPublished (:fPublished) */
  publishedFlag: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "macro": this.macro = StringValue.parse(value); return;
      case "fPublished": this.publishedFlag = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.macro !== undefined) out.push(["macro", this.macro.toString()]);
    if (this.publishedFlag !== undefined) out.push(["fPublished", this.publishedFlag.toString()]);
    return out;
  }

}
