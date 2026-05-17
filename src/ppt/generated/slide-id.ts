// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SlideId

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertNumber,
  assertRequired,
} from "../../element/index.js";

/** Slide ID.
 *
 * Element: `p:sldId` */
export class SlideId extends OpenXmlCompositeElement {
  override readonly localName = "sldId" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Slide Identifier (:id) */
  id: UInt32Value | undefined;

  /** Relationship Identifier (r:id) */
  relationshipId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":id": this.id = UInt32Value.parse(value); assertNumber(this.id, { min: 256 }, { attribute: ":id", elementClass: "SlideId" }); return;
      case "r:id": this.relationshipId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push([":id", this.id.toString()]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "SlideId" });
    assertRequired(this.relationshipId, { attribute: "r:id", elementClass: "SlideId" });
  }
}
