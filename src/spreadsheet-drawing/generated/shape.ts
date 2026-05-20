// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.Shape

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Shape.
 *
 * Element: `xdr:sp` */
export class Shape extends OpenXmlCompositeElement {
  override readonly localName = "sp" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference to Custom Function (:macro) */
  macro: StringValue | undefined;

  /** Text Link (:textlink) */
  textLink: StringValue | undefined;

  /** Lock Text Flag (:fLocksText) */
  lockText: BooleanValue | undefined;

  /** Publish to Server Flag (:fPublished) */
  published: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "macro": this.macro = StringValue.parse(value); return;
      case "textlink": this.textLink = StringValue.parse(value); return;
      case "fLocksText": this.lockText = BooleanValue.parse(value); return;
      case "fPublished": this.published = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.macro !== undefined) out.push(["macro", this.macro.toString()]);
    if (this.textLink !== undefined) out.push(["textlink", this.textLink.toString()]);
    if (this.lockText !== undefined) out.push(["fLocksText", this.lockText.toString()]);
    if (this.published !== undefined) out.push(["fPublished", this.published.toString()]);
    return out;
  }

}
