// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.Picture

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Defines the Picture Class.
 *
 * Element: `xdr:pic` */
export class Picture extends OpenXmlCompositeElement {
  override readonly localName = "pic" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference To Custom Function (:macro) */
  macro: StringValue | undefined;

  /** Publish to Server Flag (:fPublished) */
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
