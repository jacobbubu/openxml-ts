// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideSize

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Defines the SlideSize Class.
 *
 * Element: `p:sldSz` */
export class SlideSize extends OpenXmlLeafElement {
  override readonly localName = "sldSz" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Extent Length (:cx) */
  cx: Int32Value | undefined;

  /** Extent Width (:cy) */
  cy: Int32Value | undefined;

  /** Type of Size (:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":cx": this.cx = Int32Value.parse(value); assertNumber(this.cx, { min: 914400, max: 51206400 }, { attribute: ":cx", elementClass: "SlideSize" }); return;
      case ":cy": this.cy = Int32Value.parse(value); assertNumber(this.cy, { min: 914400, max: 51206400 }, { attribute: ":cy", elementClass: "SlideSize" }); return;
      case ":type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.cx !== undefined) out.push([":cx", this.cx.toString()]);
    if (this.cy !== undefined) out.push([":cy", this.cy.toString()]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.cx, { attribute: ":cx", elementClass: "SlideSize" });
    assertRequired(this.cy, { attribute: ":cy", elementClass: "SlideSize" });
  }
}
