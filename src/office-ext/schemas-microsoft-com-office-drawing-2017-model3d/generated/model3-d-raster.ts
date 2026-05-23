// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.Model3DRaster

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Model3DRaster Class.
 *
 * Element: `am3d:raster` */
export class Model3DRaster extends OpenXmlCompositeElement {
  override readonly localName = "raster" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** rName (:rName) */
  rName: StringValue | undefined;

  /** rVer (:rVer) */
  rVer: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "rName": this.rName = StringValue.parse(value); return;
      case "rVer": this.rVer = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.rName !== undefined) out.push(["rName", this.rName.toString()]);
    if (this.rVer !== undefined) out.push(["rVer", this.rVer.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.rName, { attribute: ":rName", elementClass: "Model3DRaster" });
    assertRequired(this.rVer, { attribute: ":rVer", elementClass: "Model3DRaster" });
  }
}
