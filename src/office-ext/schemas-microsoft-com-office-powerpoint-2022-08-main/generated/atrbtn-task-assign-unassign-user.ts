// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2022_08_main.json
// @see DocumentFormat.OpenXml.202208Main.AtrbtnTaskAssignUnassignUser

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the AtrbtnTaskAssignUnassignUser Class.
 *
 * Element: `p228:atrbtn` */
export class AtrbtnTaskAssignUnassignUser extends OpenXmlLeafElement {
  override readonly localName = "atrbtn" as const;
  override readonly prefix = "p228" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2022/08/main" as const;


  /** authorId (:authorId) */
  authorId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "authorId": this.authorId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.authorId !== undefined) out.push(["authorId", this.authorId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "AtrbtnTaskAssignUnassignUser" });
  }
}
