// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_webextensions_taskpanes_2010_11.json
// @see DocumentFormat.OpenXml.Taskpanes201011.WebExtensionPartReference

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the WebExtensionPartReference Class.
 *
 * Element: `wetp:webextensionref` */
export class WebExtensionPartReference extends OpenXmlLeafElement {
  override readonly localName = "webextensionref" as const;
  override readonly prefix = "wetp" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/webextensions/taskpanes/2010/11" as const;


  /** id (r:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["r:id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: "r:id", elementClass: "WebExtensionPartReference" });
  }
}
