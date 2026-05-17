// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Rotation

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Rotation.
 *
 * Element: `a:rot` */
export class Rotation extends OpenXmlLeafElement {
  override readonly localName = "rot" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Latitude (:lat) */
  latitude: Int32Value | undefined;

  /** Longitude (:lon) */
  longitude: Int32Value | undefined;

  /** Revolution (:rev) */
  revolution: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":lat": this.latitude = Int32Value.parse(value); assertNumber(this.latitude, { min: 0 }, { attribute: ":lat", elementClass: "Rotation" }); return;
      case ":lon": this.longitude = Int32Value.parse(value); assertNumber(this.longitude, { min: 0 }, { attribute: ":lon", elementClass: "Rotation" }); return;
      case ":rev": this.revolution = Int32Value.parse(value); assertNumber(this.revolution, { min: 0 }, { attribute: ":rev", elementClass: "Rotation" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.latitude !== undefined) out.push([":lat", this.latitude.toString()]);
    if (this.longitude !== undefined) out.push([":lon", this.longitude.toString()]);
    if (this.revolution !== undefined) out.push([":rev", this.revolution.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.latitude, { attribute: ":lat", elementClass: "Rotation" });
    assertRequired(this.longitude, { attribute: ":lon", elementClass: "Rotation" });
    assertRequired(this.revolution, { attribute: ":rev", elementClass: "Rotation" });
  }
}
