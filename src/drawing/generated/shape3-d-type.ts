// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Shape3DType

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Apply 3D shape properties.
 *
 * Element: `a:sp3d` */
export class Shape3DType extends OpenXmlCompositeElement {
  override readonly localName = "sp3d" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Shape Depth (:z) */
  z: Int64Value | undefined;

  /** Extrusion Height (:extrusionH) */
  extrusionHeight: Int64Value | undefined;

  /** Contour Width (:contourW) */
  contourWidth: Int64Value | undefined;

  /** Preset Material Type (:prstMaterial) */
  presetMaterial: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":z": this.z = Int64Value.parse(value); assertNumber(this.z, { min: -27273042329600, max: 27273042316900 }, { attribute: ":z", elementClass: "Shape3DType" }); return;
      case ":extrusionH": this.extrusionHeight = Int64Value.parse(value); assertNumber(this.extrusionHeight, { min: 0, max: 2147483647 }, { attribute: ":extrusionH", elementClass: "Shape3DType" }); return;
      case ":contourW": this.contourWidth = Int64Value.parse(value); assertNumber(this.contourWidth, { min: 0, max: 2147483647 }, { attribute: ":contourW", elementClass: "Shape3DType" }); return;
      case ":prstMaterial": this.presetMaterial = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.z !== undefined) out.push([":z", this.z.toString()]);
    if (this.extrusionHeight !== undefined) out.push([":extrusionH", this.extrusionHeight.toString()]);
    if (this.contourWidth !== undefined) out.push([":contourW", this.contourWidth.toString()]);
    if (this.presetMaterial !== undefined) out.push([":prstMaterial", this.presetMaterial.toString()]);
    return out;
  }

}
