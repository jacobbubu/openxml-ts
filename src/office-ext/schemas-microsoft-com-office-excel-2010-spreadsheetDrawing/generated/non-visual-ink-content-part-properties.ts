// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_excel_2010_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.Excel2010SpreadsheetDrawing.NonVisualInkContentPartProperties

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../../element/index.js";

/** Defines the NonVisualInkContentPartProperties Class.
 *
 * Element: `xdr14:cNvContentPartPr` */
export class NonVisualInkContentPartProperties extends OpenXmlCompositeElement {
  override readonly localName = "cNvContentPartPr" as const;
  override readonly prefix = "xdr14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/excel/2010/spreadsheetDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** isComment (:isComment) */
  isComment: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "isComment": this.isComment = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.isComment !== undefined) out.push(["isComment", this.isComment.toString()]);
    return out;
  }

}
