// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_ac.json
// @see DocumentFormat.OpenXml.201011Ac.AbsolutePath

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the AbsolutePath Class.
 *
 * Element: `x15ac:absPath` */
export class AbsolutePath extends OpenXmlLeafElement {
  override readonly localName = "absPath" as const;
  override readonly prefix = "x15ac" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/ac" as const;


  /** url (:url) */
  url: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "url": this.url = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.url !== undefined) out.push(["url", this.url.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.url, { attribute: ":url", elementClass: "AbsolutePath" });
  }
}
