// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.TwoCellAnchor

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Two Cell Anchor Shape Size.
 *
 * Element: `xdr:twoCellAnchor` */
export class TwoCellAnchor extends OpenXmlCompositeElement {
  override readonly localName = "twoCellAnchor" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Positioning and Resizing Behaviors (:editAs) */
  editAs: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "editAs": this.editAs = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.editAs !== undefined) out.push(["editAs", this.editAs.toString()]);
    return out;
  }

}
