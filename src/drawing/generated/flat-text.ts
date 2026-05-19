// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.FlatText

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** No text in 3D scene.
 *
 * Element: `a:flatTx` */
export class FlatText extends OpenXmlLeafElement {
  override readonly localName = "flatTx" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Z Coordinate (:z) */
  z: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "z": this.z = Int64Value.parse(value); assertNumber(this.z, { min: -27273042329600, max: 27273042316900 }, { attribute: ":z", elementClass: "FlatText" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.z !== undefined) out.push(["z", this.z.toString()]);
    return out;
  }

}
