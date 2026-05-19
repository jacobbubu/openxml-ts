// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Camera

import {
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Camera.
 *
 * Element: `a:camera` */
export class Camera extends OpenXmlCompositeElement {
  override readonly localName = "camera" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Preset Camera Type (:prst) */
  preset: StringValue | undefined;

  /** Field of View (:fov) */
  fieldOfView: Int32Value | undefined;

  /** Zoom (:zoom) */
  zoom: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prst": this.preset = StringValue.parse(value); return;
      case "fov": this.fieldOfView = Int32Value.parse(value); assertNumber(this.fieldOfView, { min: 0, max: 10800000 }, { attribute: ":fov", elementClass: "Camera" }); return;
      case "zoom": this.zoom = Int32Value.parse(value); assertNumber(this.zoom, { min: 0 }, { attribute: ":zoom", elementClass: "Camera" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preset !== undefined) out.push(["prst", this.preset.toString()]);
    if (this.fieldOfView !== undefined) out.push(["fov", this.fieldOfView.toString()]);
    if (this.zoom !== undefined) out.push(["zoom", this.zoom.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.preset, { attribute: ":prst", elementClass: "Camera" });
  }
}
