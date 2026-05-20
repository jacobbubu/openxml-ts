// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chartDrawing.json
// @see DocumentFormat.OpenXml.ChartDrawing.GraphicFrame

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Graphic Frame.
 *
 * Element: `cdr:graphicFrame` */
export class GraphicFrame extends OpenXmlCompositeElement {
  override readonly localName = "graphicFrame" as const;
  override readonly prefix = "cdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chartDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Reference to Custom Function (:macro) */
  macro: StringValue | undefined;

  /** Publish To Server (:fPublished) */
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
