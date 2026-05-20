// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2010_wordml.json
// @see DocumentFormat.OpenXml.Word2010.Properties3D

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the Properties3D Class.
 *
 * Element: `w14:props3d` */
export class Properties3D extends OpenXmlCompositeElement {
  override readonly localName = "props3d" as const;
  override readonly prefix = "w14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2010/wordml" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** extrusionH (w14:extrusionH) */
  extrusionHeight: Int64Value | undefined;

  /** contourW (w14:contourW) */
  contourWidth: Int64Value | undefined;

  /** prstMaterial (w14:prstMaterial) */
  presetMaterialType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w14:extrusionH": this.extrusionHeight = Int64Value.parse(value); assertNumber(this.extrusionHeight, { min: 0, max: 2147483647 }, { attribute: "w14:extrusionH", elementClass: "Properties3D" }); return;
      case "w14:contourW": this.contourWidth = Int64Value.parse(value); assertNumber(this.contourWidth, { min: 0, max: 2147483647 }, { attribute: "w14:contourW", elementClass: "Properties3D" }); return;
      case "w14:prstMaterial": this.presetMaterialType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extrusionHeight !== undefined) out.push(["w14:extrusionH", this.extrusionHeight.toString()]);
    if (this.contourWidth !== undefined) out.push(["w14:contourW", this.contourWidth.toString()]);
    if (this.presetMaterialType !== undefined) out.push(["w14:prstMaterial", this.presetMaterialType.toString()]);
    return out;
  }

}
