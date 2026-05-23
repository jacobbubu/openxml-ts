// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_webextension_2010_11.json
// @see DocumentFormat.OpenXml.Webextension201011.WebExtensionProperty

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the WebExtensionProperty Class.
 *
 * Element: `we:property` */
export class WebExtensionProperty extends OpenXmlLeafElement {
  override readonly localName = "property" as const;
  override readonly prefix = "we" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/webextensions/webextension/2010/11" as const;


  /** name (:name) */
  name: StringValue | undefined;

  /** value (:value) */
  value: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "value": this.value = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.value !== undefined) out.push(["value", this.value.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: ":name", elementClass: "WebExtensionProperty" });
    assertRequired(this.value, { attribute: ":value", elementClass: "WebExtensionProperty" });
  }
}
