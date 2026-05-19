// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.RelativeOffset

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Relative Offset Effect.
 *
 * Element: `a:relOff` */
export class RelativeOffset extends OpenXmlLeafElement {
  override readonly localName = "relOff" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Offset X (:tx) */
  offsetX: Int32Value | undefined;

  /** Offset Y (:ty) */
  offsetY: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "tx": this.offsetX = Int32Value.parse(value); return;
      case "ty": this.offsetY = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.offsetX !== undefined) out.push(["tx", this.offsetX.toString()]);
    if (this.offsetY !== undefined) out.push(["ty", this.offsetY.toString()]);
    return out;
  }

}
