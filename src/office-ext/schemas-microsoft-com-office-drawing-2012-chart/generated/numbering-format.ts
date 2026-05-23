// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chart.json
// @see DocumentFormat.OpenXml.Drawing2012Chart.NumberingFormat

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the NumberingFormat Class.
 *
 * Element: `c15:numFmt` */
export class NumberingFormat extends OpenXmlLeafElement {
  override readonly localName = "numFmt" as const;
  override readonly prefix = "c15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chart" as const;


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

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
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
