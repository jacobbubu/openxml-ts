// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.WebExtension

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the WebExtension Class.
 *
 * Element: `x15:webExtension` */
export class WebExtension extends OpenXmlCompositeElement {
  override readonly localName = "webExtension" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** appRef (:appRef) */
  applicationReference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "appRef": this.applicationReference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.applicationReference !== undefined) out.push(["appRef", this.applicationReference.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.applicationReference, { attribute: ":appRef", elementClass: "WebExtension" });
  }
}
