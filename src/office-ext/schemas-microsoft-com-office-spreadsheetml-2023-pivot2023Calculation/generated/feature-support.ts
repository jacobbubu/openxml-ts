// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2023_pivot2023Calculation.json
// @see DocumentFormat.OpenXml.Spreadsheetml2023Pivot2023Calculation.FeatureSupport

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the FeatureSupport Class.
 *
 * Element: `xlpcalc:featureSupportInfo` */
export class FeatureSupport extends OpenXmlLeafElement {
  override readonly localName = "featureSupportInfo" as const;
  override readonly prefix = "xlpcalc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2023/pivot2023Calculation" as const;


  /** featureName (:featureName) */
  featureName: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "featureName": this.featureName = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.featureName !== undefined) out.push(["featureName", this.featureName.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.featureName, { attribute: ":featureName", elementClass: "FeatureSupport" });
  }
}
