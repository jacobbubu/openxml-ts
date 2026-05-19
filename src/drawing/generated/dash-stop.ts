// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.DashStop

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Dash Stop.
 *
 * Element: `a:ds` */
export class DashStop extends OpenXmlLeafElement {
  override readonly localName = "ds" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Dash Length (:d) */
  dashLength: Int32Value | undefined;

  /** Space Length (:sp) */
  spaceLength: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "d": this.dashLength = Int32Value.parse(value); assertNumber(this.dashLength, { min: 0 }, { attribute: ":d", elementClass: "DashStop" }); return;
      case "sp": this.spaceLength = Int32Value.parse(value); assertNumber(this.spaceLength, { min: 0 }, { attribute: ":sp", elementClass: "DashStop" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.dashLength !== undefined) out.push(["d", this.dashLength.toString()]);
    if (this.spaceLength !== undefined) out.push(["sp", this.spaceLength.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.dashLength, { attribute: ":d", elementClass: "DashStop" });
    assertRequired(this.spaceLength, { attribute: ":sp", elementClass: "DashStop" });
  }
}
