// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_chartDrawing.json
// @see DocumentFormat.OpenXml.Drawing2010ChartDrawing.ApplicationNonVisualDrawingProperties

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the ApplicationNonVisualDrawingProperties Class.
 *
 * Element: `cdr14:nvPr` */
export class ApplicationNonVisualDrawingProperties extends OpenXmlLeafElement {
  override readonly localName = "nvPr" as const;
  override readonly prefix = "cdr14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/chartDrawing" as const;


  /** macro (:macro) */
  macro: StringValue | undefined;

  /** fPublished (:fPublished) */
  published: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "macro": this.macro = StringValue.parse(value); return;
      case "fPublished": this.published = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.macro !== undefined) out.push(["macro", this.macro.toString()]);
    if (this.published !== undefined) out.push(["fPublished", this.published.toString()]);
    return out;
  }

}
