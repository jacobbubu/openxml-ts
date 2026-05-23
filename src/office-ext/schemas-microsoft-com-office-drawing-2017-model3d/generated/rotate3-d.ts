// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.Rotate3D

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the Rotate3D Class.
 *
 * Element: `am3d:rot` */
export class Rotate3D extends OpenXmlLeafElement {
  override readonly localName = "rot" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;


  /** ax (:ax) */
  ax: Int32Value | undefined;

  /** ay (:ay) */
  ay: Int32Value | undefined;

  /** az (:az) */
  az: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ax": this.ax = Int32Value.parse(value); return;
      case "ay": this.ay = Int32Value.parse(value); return;
      case "az": this.az = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.ax !== undefined) out.push(["ax", this.ax.toString()]);
    if (this.ay !== undefined) out.push(["ay", this.ay.toString()]);
    if (this.az !== undefined) out.push(["az", this.az.toString()]);
    return out;
  }

}
