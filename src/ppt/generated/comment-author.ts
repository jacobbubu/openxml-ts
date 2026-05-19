// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.CommentAuthor

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";

/** Comment Author.
 *
 * Element: `p:cmAuthor` */
export class CommentAuthor extends OpenXmlCompositeElement {
  override readonly localName = "cmAuthor" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** id (:id) */
  id: UInt32Value | undefined;

  /** name (:name) */
  name: StringValue | undefined;

  /** initials (:initials) */
  initials: StringValue | undefined;

  /** lastIdx (:lastIdx) */
  lastIndex: UInt32Value | undefined;

  /** clrIdx (:clrIdx) */
  colorIndex: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = UInt32Value.parse(value); return;
      case "name": this.name = StringValue.parse(value); return;
      case "initials": this.initials = StringValue.parse(value); return;
      case "lastIdx": this.lastIndex = UInt32Value.parse(value); return;
      case "clrIdx": this.colorIndex = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.initials !== undefined) out.push(["initials", this.initials.toString()]);
    if (this.lastIndex !== undefined) out.push(["lastIdx", this.lastIndex.toString()]);
    if (this.colorIndex !== undefined) out.push(["clrIdx", this.colorIndex.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "CommentAuthor" });
    assertRequired(this.name, { attribute: ":name", elementClass: "CommentAuthor" });
    assertRequired(this.initials, { attribute: ":initials", elementClass: "CommentAuthor" });
    assertRequired(this.lastIndex, { attribute: ":lastIdx", elementClass: "CommentAuthor" });
    assertRequired(this.colorIndex, { attribute: ":clrIdx", elementClass: "CommentAuthor" });
  }
}
