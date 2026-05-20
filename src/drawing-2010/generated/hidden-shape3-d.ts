// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.HiddenShape3D

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the HiddenShape3D Class.
 *
 * Element: `a14:hiddenSp3d` */
export class HiddenShape3D extends OpenXmlCompositeElement {
  override readonly localName = "hiddenSp3d" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;
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
      case "z": this.z = Int64Value.parse(value); assertNumber(this.z, { min: -27273042329600, max: 27273042316900 }, { attribute: ":z", elementClass: "HiddenShape3D" }); return;
      case "extrusionH": this.extrusionHeight = Int64Value.parse(value); assertNumber(this.extrusionHeight, { min: 0, max: 2147483647 }, { attribute: ":extrusionH", elementClass: "HiddenShape3D" }); return;
      case "contourW": this.contourWidth = Int64Value.parse(value); assertNumber(this.contourWidth, { min: 0, max: 2147483647 }, { attribute: ":contourW", elementClass: "HiddenShape3D" }); return;
      case "prstMaterial": this.presetMaterial = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.z !== undefined) out.push(["z", this.z.toString()]);
    if (this.extrusionHeight !== undefined) out.push(["extrusionH", this.extrusionHeight.toString()]);
    if (this.contourWidth !== undefined) out.push(["contourW", this.contourWidth.toString()]);
    if (this.presetMaterial !== undefined) out.push(["prstMaterial", this.presetMaterial.toString()]);
    return out;
  }

}
