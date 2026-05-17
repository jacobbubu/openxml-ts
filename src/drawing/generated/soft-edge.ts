// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.SoftEdge

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Soft Edge Effect.
 *
 * Element: `a:softEdge` */
export class SoftEdge extends OpenXmlLeafElement {
  override readonly localName = "softEdge" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Radius (:rad) */
  radius: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":rad": this.radius = Int64Value.parse(value); assertNumber(this.radius, { min: 0, max: 2147483647 }, { attribute: ":rad", elementClass: "SoftEdge" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.radius !== undefined) out.push([":rad", this.radius.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.radius, { attribute: ":rad", elementClass: "SoftEdge" });
  }
}
