// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_08_main.json
// @see DocumentFormat.OpenXml.202208Main.CommentAnchor

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentAnchor Class.
 *
 * Element: `p228:comment` */
export class CommentAnchor extends OpenXmlLeafElement {
  override readonly localName = "comment" as const;
  override readonly prefix = "p228" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/08/main" as const;


  /** id (:id) */
  id: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "CommentAnchor" });
  }
}
