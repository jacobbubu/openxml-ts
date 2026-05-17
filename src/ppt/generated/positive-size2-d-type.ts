// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.PositiveSize2DType

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the PositiveSize2DType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class PositiveSize2DType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Extent Length (:cx) */
  cx: Int64Value | undefined;

  /** Extent Width (:cy) */
  cy: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":cx": this.cx = Int64Value.parse(value); assertNumber(this.cx, { min: 0, max: 2147483647 }, { attribute: ":cx", elementClass: "PositiveSize2DType" }); return;
      case ":cy": this.cy = Int64Value.parse(value); assertNumber(this.cy, { min: 0, max: 2147483647 }, { attribute: ":cy", elementClass: "PositiveSize2DType" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cx !== undefined) out.push([":cx", this.cx.toString()]);
    if (this.cy !== undefined) out.push([":cy", this.cy.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cx, { attribute: ":cx", elementClass: "PositiveSize2DType" });
    assertRequired(this.cy, { attribute: ":cy", elementClass: "PositiveSize2DType" });
  }
}
