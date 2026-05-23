// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2020_mipLabelMetadata.json
// @see DocumentFormat.OpenXml.2020MipLabelMetadata.ClassificationExtension

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ClassificationExtension Class.
 *
 * Element: `clbl:ext` */
export class ClassificationExtension extends OpenXmlCompositeElement {
  override readonly localName = "ext" as const;
  override readonly prefix = "clbl" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2020/mipLabelMetadata" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uri (:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["uri", this.uri.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.uri, { attribute: ":uri", elementClass: "ClassificationExtension" });
  }
}
