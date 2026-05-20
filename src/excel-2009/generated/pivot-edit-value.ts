// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.PivotEditValue

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the PivotEditValue Class.
 *
 * Element: `x14:editValue` */
export class PivotEditValue extends OpenXmlLeafElement {
  override readonly localName = "editValue" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** valueType (:valueType) */
  valueType: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "valueType": this.valueType = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.valueType !== undefined) out.push(["valueType", this.valueType.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.valueType, { attribute: ":valueType", elementClass: "PivotEditValue" });
  }
}
