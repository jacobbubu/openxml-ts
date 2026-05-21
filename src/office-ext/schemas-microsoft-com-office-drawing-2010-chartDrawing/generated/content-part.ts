// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2010_chartDrawing.json
// @see DocumentFormat.OpenXml.Drawing2010ChartDrawing.ContentPart

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the ContentPart Class.
 *
 * Element: `cdr14:contentPart` */
export class ContentPart extends OpenXmlCompositeElement {
  override readonly localName = "contentPart" as const;
  override readonly prefix = "cdr14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2010/chartDrawing" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (r:id) */
  relationshipId: StringValue | undefined;

  /** bwMode (:bwMode) */
  blackWhiteMode: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "r:id": this.relationshipId = StringValue.parse(value); return;
      case "bwMode": this.blackWhiteMode = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.relationshipId !== undefined) out.push(["r:id", this.relationshipId.toString()]);
    if (this.blackWhiteMode !== undefined) out.push(["bwMode", this.blackWhiteMode.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.relationshipId, { attribute: "r:id", elementClass: "ContentPart" });
  }
}
