// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2012_main.json
// @see DocumentFormat.OpenXml.Powerpoint2012Main.PresenceInfo

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the PresenceInfo Class.
 *
 * Element: `p15:presenceInfo` */
export class PresenceInfo extends OpenXmlLeafElement {
  override readonly localName = "presenceInfo" as const;
  override readonly prefix = "p15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2012/main" as const;


  /** userId (:userId) */
  userId: StringValue | undefined;

  /** providerId (:providerId) */
  providerId: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "userId": this.userId = StringValue.parse(value); return;
      case "providerId": this.providerId = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.userId !== undefined) out.push(["userId", this.userId.toString()]);
    if (this.providerId !== undefined) out.push(["providerId", this.providerId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.userId, { attribute: ":userId", elementClass: "PresenceInfo" });
    assertRequired(this.providerId, { attribute: ":providerId", elementClass: "PresenceInfo" });
  }
}
