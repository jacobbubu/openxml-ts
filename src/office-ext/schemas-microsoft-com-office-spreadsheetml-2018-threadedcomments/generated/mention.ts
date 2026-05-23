// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2018_threadedcomments.json
// @see DocumentFormat.OpenXml.Spreadsheetml2018Threadedcomments.Mention

import {
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Mention Class.
 *
 * Element: `xltc:mention` */
export class Mention extends OpenXmlLeafElement {
  override readonly localName = "mention" as const;
  override readonly prefix = "xltc" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2018/threadedcomments" as const;


  /** mentionpersonId (:mentionpersonId) */
  mentionpersonId: StringValue | undefined;

  /** mentionId (:mentionId) */
  mentionId: StringValue | undefined;

  /** startIndex (:startIndex) */
  startIndex: UInt32Value | undefined;

  /** length (:length) */
  length: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "mentionpersonId": this.mentionpersonId = StringValue.parse(value); return;
      case "mentionId": this.mentionId = StringValue.parse(value); return;
      case "startIndex": this.startIndex = UInt32Value.parse(value); return;
      case "length": this.length = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.mentionpersonId !== undefined) out.push(["mentionpersonId", this.mentionpersonId.toString()]);
    if (this.mentionId !== undefined) out.push(["mentionId", this.mentionId.toString()]);
    if (this.startIndex !== undefined) out.push(["startIndex", this.startIndex.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.mentionpersonId, { attribute: ":mentionpersonId", elementClass: "Mention" });
    assertRequired(this.mentionId, { attribute: ":mentionId", elementClass: "Mention" });
    assertRequired(this.startIndex, { attribute: ":startIndex", elementClass: "Mention" });
    assertRequired(this.length, { attribute: ":length", elementClass: "Mention" });
  }
}
