// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_main.json
// @see DocumentFormat.OpenXml.Drawing2010.GvmlContentPart

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the GvmlContentPart Class.
 *
 * Element: `a14:contentPart` */
export class GvmlContentPart extends OpenXmlCompositeElement {
  override readonly localName = "contentPart" as const;
  override readonly prefix = "a14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** bwMode (:bwMode) */
  blackWhiteMode: StringValue | undefined;

  /** id (r:id) */
  relationshipId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "bwMode": this.blackWhiteMode = StringValue.parse(value); return;
      case "r:id": this.relationshipId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.blackWhiteMode !== undefined) out.push(["bwMode", this.blackWhiteMode.toString()]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relationshipId, { attribute: "r:id", elementClass: "GvmlContentPart" });
  }
}
