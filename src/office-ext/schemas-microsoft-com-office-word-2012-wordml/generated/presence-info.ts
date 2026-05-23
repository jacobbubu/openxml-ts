// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json
// @see DocumentFormat.OpenXml.Word2012Wordml.PresenceInfo

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PresenceInfo Class.
 *
 * Element: `w15:presenceInfo` */
export class PresenceInfo extends OpenXmlLeafElement {
  override readonly localName = "presenceInfo" as const;
  override readonly prefix = "w15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordml" as const;


  /** providerId (w15:providerId) */
  providerId: StringValue | undefined;

  /** userId (w15:userId) */
  userId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w15:providerId": this.providerId = StringValue.parse(value); return;
      case "w15:userId": this.userId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.providerId !== undefined) out.push(["w15:providerId", this.providerId.toString()]);
    if (this.userId !== undefined) out.push(["w15:userId", this.userId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.providerId, { attribute: "w15:providerId", elementClass: "PresenceInfo" });
    assertRequired(this.userId, { attribute: "w15:userId", elementClass: "PresenceInfo" });
  }
}
