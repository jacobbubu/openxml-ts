// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.GridSpacing

import {
  Int64Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Grid Spacing.
 *
 * Element: `p:gridSpacing` */
export class GridSpacing extends OpenXmlLeafElement {
  override readonly localName = "gridSpacing" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Extent Length (:cx) */
  cx: Int64Value | undefined;

  /** Extent Width (:cy) */
  cy: Int64Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "cx": this.cx = Int64Value.parse(value); assertNumber(this.cx, { min: 0, max: 2147483647 }, { attribute: ":cx", elementClass: "GridSpacing" }); return;
      case "cy": this.cy = Int64Value.parse(value); assertNumber(this.cy, { min: 0, max: 2147483647 }, { attribute: ":cy", elementClass: "GridSpacing" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cx !== undefined) out.push(["cx", this.cx.toString()]);
    if (this.cy !== undefined) out.push(["cy", this.cy.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cx, { attribute: ":cx", elementClass: "GridSpacing" });
    assertRequired(this.cy, { attribute: ":cy", elementClass: "GridSpacing" });
  }
}
