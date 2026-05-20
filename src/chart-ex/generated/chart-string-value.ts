// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chartex.json
// @see DocumentFormat.OpenXml.ChartEx.ChartStringValue

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Defines the ChartStringValue Class.
 *
 * Element: `cx:pt` */
export class ChartStringValue extends OpenXmlLeafElement {
  override readonly localName = "pt" as const;
  override readonly prefix = "cx" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/chartex" as const;


  /** idx (:idx) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "idx": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.index, { attribute: ":idx", elementClass: "ChartStringValue" });
  }
}
