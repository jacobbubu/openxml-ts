// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_2006_activeX.json
// @see DocumentFormat.OpenXml.2006ActiveX.ActiveXObjectProperty

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ActiveXObjectProperty Class.
 *
 * Element: `ax:ocxPr` */
export class ActiveXObjectProperty extends OpenXmlCompositeElement {
  override readonly localName = "ocxPr" as const;
  override readonly prefix = "ax" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/2006/activeX" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** name (ax:name) */
  name: StringValue | undefined;

  /** value (ax:value) */
  value: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "ax:name": this.name = StringValue.parse(value); return;
      case "ax:value": this.value = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["ax:name", this.name.toString()]);
    if (this.value !== undefined) out.push(["ax:value", this.value.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.name, { attribute: "ax:name", elementClass: "ActiveXObjectProperty" });
  }
}
