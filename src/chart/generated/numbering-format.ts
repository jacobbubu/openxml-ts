// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.NumberingFormat

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Number Format.
 *
 * Element: `c:numFmt` */
export class NumberingFormat extends OpenXmlLeafElement {
  override readonly localName = "numFmt" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;


  /** Number Format Code (:formatCode) */
  formatCode: StringValue | undefined;

  /** Linked to Source (:sourceLinked) */
  sourceLinked: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "formatCode": this.formatCode = StringValue.parse(value); return;
      case "sourceLinked": this.sourceLinked = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formatCode !== undefined) out.push(["formatCode", this.formatCode.toString()]);
    if (this.sourceLinked !== undefined) out.push(["sourceLinked", this.sourceLinked.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.formatCode, { attribute: ":formatCode", elementClass: "NumberingFormat" });
  }
}
