// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideLayoutId

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Slide Layout Id.
 *
 * Element: `p:sldLayoutId` */
export class SlideLayoutId extends OpenXmlCompositeElement {
  override readonly localName = "sldLayoutId" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** ID Tag (:id) */
  id: UInt32Value | undefined;

  /** ID Tag (r:id) */
  relationshipId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); assertNumber(this.id, { min: 2147483648 }, { attribute: ":id", elementClass: "SlideLayoutId" }); return;
      case "r:id": this.relationshipId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relationshipId, { attribute: "r:id", elementClass: "SlideLayoutId" });
  }
}
