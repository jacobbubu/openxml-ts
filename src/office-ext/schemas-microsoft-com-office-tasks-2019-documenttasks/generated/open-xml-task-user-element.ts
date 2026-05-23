// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_tasks_2019_documenttasks.json
// @see DocumentFormat.OpenXml.Tasks2019Documenttasks.OpenXmlTaskUserElement

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the OpenXmlTaskUserElement Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class OpenXmlTaskUserElement extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** userId (:userId) */
  userId: StringValue | undefined;

  /** userName (:userName) */
  userName: StringValue | undefined;

  /** userProvider (:userProvider) */
  userProvider: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "userId": this.userId = StringValue.parse(value); return;
      case "userName": this.userName = StringValue.parse(value); return;
      case "userProvider": this.userProvider = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.userId !== undefined) out.push(["userId", this.userId.toString()]);
    if (this.userName !== undefined) out.push(["userName", this.userName.toString()]);
    if (this.userProvider !== undefined) out.push(["userProvider", this.userProvider.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.userId, { attribute: ":userId", elementClass: "OpenXmlTaskUserElement" });
    assertRequired(this.userName, { attribute: ":userName", elementClass: "OpenXmlTaskUserElement" });
    assertRequired(this.userProvider, { attribute: ":userProvider", elementClass: "OpenXmlTaskUserElement" });
  }
}
