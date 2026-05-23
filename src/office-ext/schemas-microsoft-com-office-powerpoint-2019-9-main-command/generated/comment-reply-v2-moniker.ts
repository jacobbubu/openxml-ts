// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2019_9_main_command.json
// @see DocumentFormat.OpenXml.9MainCommand.CommentReplyV2Moniker

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentReplyV2Moniker Class.
 *
 * Element: `pc2:cmRplyMk` */
export class CommentReplyV2Moniker extends OpenXmlLeafElement {
  override readonly localName = "cmRplyMk" as const;
  override readonly prefix = "pc2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2019/9/main/command" as const;


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
    assertRequired(this.id, { attribute: ":id", elementClass: "CommentReplyV2Moniker" });
  }
}
