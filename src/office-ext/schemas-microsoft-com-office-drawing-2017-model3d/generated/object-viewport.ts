// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2017_model3d.json
// @see DocumentFormat.OpenXml.Drawing2017Model3d.ObjectViewport

import {
  Int64Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertNumber,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ObjectViewport Class.
 *
 * Element: `am3d:objViewport` */
export class ObjectViewport extends OpenXmlCompositeElement {
  override readonly localName = "objViewport" as const;
  override readonly prefix = "am3d" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2017/model3d" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** viewportSz (:viewportSz) */
  viewportSz: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "viewportSz": this.viewportSz = Int64Value.parse(value); assertNumber(this.viewportSz, { min: 0, max: 2147483647 }, { attribute: ":viewportSz", elementClass: "ObjectViewport" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.viewportSz !== undefined) out.push(["viewportSz", this.viewportSz.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.viewportSz, { attribute: ":viewportSz", elementClass: "ObjectViewport" });
  }
}
