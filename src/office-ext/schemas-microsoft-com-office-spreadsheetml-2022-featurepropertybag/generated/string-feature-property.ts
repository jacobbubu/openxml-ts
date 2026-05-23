// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2022_featurepropertybag.json
// @see DocumentFormat.OpenXml.Spreadsheetml2022Featurepropertybag.StringFeatureProperty

import {
  OpenXmlElementList,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the StringFeatureProperty Class.
 *
 * Element: `xfpb:s` */
export class StringFeatureProperty extends OpenXmlLeafElement {
  override readonly localName = "s" as const;
  override readonly prefix = "xfpb" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2022/featurepropertybag" as const;


  /** k (:k) */
  k: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "k": this.k = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.k !== undefined) out.push(["k", this.k.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.k, { attribute: ":k", elementClass: "StringFeatureProperty" });
  }
}
