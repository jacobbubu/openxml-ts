// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2021_oembed.json
// @see DocumentFormat.OpenXml.Drawing2021Oembed.OEmbedShared

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the OEmbedShared Class.
 *
 * Element: `aoe:oembedShared` */
export class OEmbedShared extends OpenXmlCompositeElement {
  override readonly localName = "oembedShared" as const;
  override readonly prefix = "aoe" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2021/oembed" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** srcUrl (:srcUrl) */
  srcUrl: StringValue | undefined;

  /** type (:type) */
  type: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "srcUrl": this.srcUrl = StringValue.parse(value); return;
      case "type": this.type = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.srcUrl !== undefined) out.push(["srcUrl", this.srcUrl.toString()]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.srcUrl, { attribute: ":srcUrl", elementClass: "OEmbedShared" });
    assertRequired(this.type, { attribute: ":type", elementClass: "OEmbedShared" });
  }
}
