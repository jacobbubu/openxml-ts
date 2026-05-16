// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Comment

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Comment.
 *
 * Element: `x:comment` */
export class Comment extends OpenXmlCompositeElement {
  override readonly localName = "comment" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Cell Reference (:ref) */
  reference: StringValue | undefined;

  /** Author Id (:authorId) */
  authorId: UInt32Value | undefined;

  /** Unique Identifier for Comment (:guid) */
  guid: StringValue | undefined;

  /** shapeId (:shapeId) */
  shapeId: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":ref": this.reference = StringValue.parse(value); return;
      case ":authorId": this.authorId = UInt32Value.parse(value); return;
      case ":guid": this.guid = StringValue.parse(value); return;
      case ":shapeId": this.shapeId = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    if (this.authorId !== undefined) out.push([":authorId", this.authorId.toString()]);
    if (this.guid !== undefined) out.push([":guid", this.guid.toString()]);
    if (this.shapeId !== undefined) out.push([":shapeId", this.shapeId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.reference, { attribute: ":ref", elementClass: "Comment" });
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "Comment" });
  }
}
