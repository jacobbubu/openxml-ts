// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2014_chartex.json
// @see DocumentFormat.OpenXml.ChartEx.ParentLabelLayout

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the ParentLabelLayout Class.
 *
 * Element: `cx:parentLabelLayout` */
export class ParentLabelLayout extends OpenXmlLeafElement {
  override readonly localName = "parentLabelLayout" as const;
  override readonly prefix = "cx" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2014/chartex" as const;


  /** val (:val) */
  parentLabelLayoutVal: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.parentLabelLayoutVal = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.parentLabelLayoutVal !== undefined) out.push(["val", this.parentLabelLayoutVal.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.parentLabelLayoutVal, { attribute: ":val", elementClass: "ParentLabelLayout" });
  }
}
