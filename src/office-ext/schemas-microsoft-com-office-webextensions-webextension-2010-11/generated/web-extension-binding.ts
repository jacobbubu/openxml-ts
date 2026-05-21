// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_webextension_2010_11.json
// @see DocumentFormat.OpenXml.Webextension201011.WebExtensionBinding

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the WebExtensionBinding Class.
 *
 * Element: `we:binding` */
export class WebExtensionBinding extends OpenXmlCompositeElement {
  override readonly localName = "binding" as const;
  override readonly prefix = "we" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/webextensions/webextension/2010/11" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  /** appref (:appref) */
  appReference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
      case "appref": this.appReference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.appReference !== undefined) out.push(["appref", this.appReference.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "WebExtensionBinding" });
    assertRequired(this.type, { attribute: ":type", elementClass: "WebExtensionBinding" });
    assertRequired(this.appReference, { attribute: ":appref", elementClass: "WebExtensionBinding" });
  }
}
