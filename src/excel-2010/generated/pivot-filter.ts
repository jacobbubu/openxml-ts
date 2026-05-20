// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotFilter

import {
  BooleanValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../element/index.js";

/** Defines the PivotFilter Class.
 *
 * Element: `x15:pivotFilter` */
export class PivotFilter extends OpenXmlLeafElement {
  override readonly localName = "pivotFilter" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** useWholeDay (:useWholeDay) */
  useWholeDay: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "useWholeDay": this.useWholeDay = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.useWholeDay !== undefined) out.push(["useWholeDay", this.useWholeDay.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.useWholeDay, { attribute: ":useWholeDay", elementClass: "PivotFilter" });
  }
}
