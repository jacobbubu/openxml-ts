// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_diagram.json
// @see DocumentFormat.OpenXml.Drawing2010Diagram.RecolorImages

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the RecolorImages Class.
 *
 * Element: `dgm14:recolorImg` */
export class RecolorImages extends OpenXmlLeafElement {
  override readonly localName = "recolorImg" as const;
  override readonly prefix = "dgm14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/diagram" as const;


  /** val (:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
