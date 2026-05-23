// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_calcfeatures.json
// @see DocumentFormat.OpenXml.Spreadsheetml2018Calcfeatures.CalcFeature

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CalcFeature Class.
 *
 * Element: `xcalcf:feature` */
export class CalcFeature extends OpenXmlLeafElement {
  override readonly localName = "feature" as const;
  override readonly prefix = "xcalcf" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2018/calcfeatures" as const;


  /** name (:name) */
  name: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "CalcFeature" });
  }
}
