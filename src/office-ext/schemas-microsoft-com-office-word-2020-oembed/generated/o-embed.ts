// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2020_oembed.json
// @see DocumentFormat.OpenXml.Word2020Oembed.OEmbed

import {
  BooleanValue,
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the OEmbed Class.
 *
 * Element: `woe:oembed` */
export class OEmbed extends OpenXmlLeafElement {
  override readonly localName = "oembed" as const;
  override readonly prefix = "woe" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2020/oembed" as const;


  /** oEmbedUrl (:oEmbedUrl) */
  oEmbedUrl: StringValue | undefined;

  /** mediaType (:mediaType) */
  mediaType: StringValue | undefined;

  /** picLocksAutoForOEmbed (:picLocksAutoForOEmbed) */
  picLocksAutoForOEmbed: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "oEmbedUrl": this.oEmbedUrl = StringValue.parse(value); return;
      case "mediaType": this.mediaType = StringValue.parse(value); return;
      case "picLocksAutoForOEmbed": this.picLocksAutoForOEmbed = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.oEmbedUrl !== undefined) out.push(["oEmbedUrl", this.oEmbedUrl.toString()]);
    if (this.mediaType !== undefined) out.push(["mediaType", this.mediaType.toString()]);
    if (this.picLocksAutoForOEmbed !== undefined) out.push(["picLocksAutoForOEmbed", this.picLocksAutoForOEmbed.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.oEmbedUrl, { attribute: ":oEmbedUrl", elementClass: "OEmbed" });
    assertRequired(this.mediaType, { attribute: ":mediaType", elementClass: "OEmbed" });
  }
}
