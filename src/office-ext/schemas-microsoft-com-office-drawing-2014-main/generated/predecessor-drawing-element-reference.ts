// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_main.json
// @see DocumentFormat.OpenXml.Drawing2014Main.PredecessorDrawingElementReference

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the PredecessorDrawingElementReference Class.
 *
 * Element: `a16:predDERef` */
export class PredecessorDrawingElementReference extends OpenXmlLeafElement {
  override readonly localName = "predDERef" as const;
  override readonly prefix = "a16" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/main" as const;


  /** pred (:pred) */
  pred: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pred": this.pred = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.pred !== undefined) out.push(["pred", this.pred.toString()]);
    return out;
  }

}
