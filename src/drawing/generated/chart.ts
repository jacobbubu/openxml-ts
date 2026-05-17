// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Chart

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Chart to Animate.
 *
 * Element: `a:chart` */
export class Chart extends OpenXmlLeafElement {
  override readonly localName = "chart" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Series Index (:seriesIdx) */
  seriesIndex: Int32Value | undefined;

  /** Category Index (:categoryIdx) */
  categoryIndex: Int32Value | undefined;

  /** Animation Build Step (:bldStep) */
  buildStep: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":seriesIdx": this.seriesIndex = Int32Value.parse(value); return;
      case ":categoryIdx": this.categoryIndex = Int32Value.parse(value); return;
      case ":bldStep": this.buildStep = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.seriesIndex !== undefined) out.push([":seriesIdx", this.seriesIndex.toString()]);
    if (this.categoryIndex !== undefined) out.push([":categoryIdx", this.categoryIndex.toString()]);
    if (this.buildStep !== undefined) out.push([":bldStep", this.buildStep.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.buildStep, { attribute: ":bldStep", elementClass: "Chart" });
  }
}
