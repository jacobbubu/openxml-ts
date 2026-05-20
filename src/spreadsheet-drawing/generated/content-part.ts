// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_spreadsheetDrawing.json
// @see DocumentFormat.OpenXml.SpreadsheetDrawing.ContentPart

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../element/index.js";

/** Defines the ContentPart Class.
 *
 * Element: `xdr:contentPart` */
export class ContentPart extends OpenXmlCompositeElement {
  override readonly localName = "contentPart" as const;
  override readonly prefix = "xdr" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" as const;
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
