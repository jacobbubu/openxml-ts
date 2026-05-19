// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Cell3DProperties

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Cell 3-D.
 *
 * Element: `a:cell3D` */
export class Cell3DProperties extends OpenXmlCompositeElement {
  override readonly localName = "cell3D" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Preset Material (:prstMaterial) */
  presetMaterial: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prstMaterial": this.presetMaterial = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.presetMaterial !== undefined) out.push(["prstMaterial", this.presetMaterial.toString()]);
    return out;
  }

}
