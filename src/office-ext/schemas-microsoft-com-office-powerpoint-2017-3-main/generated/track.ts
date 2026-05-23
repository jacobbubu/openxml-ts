// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_powerpoint_2017_3_main.json
// @see DocumentFormat.OpenXml.20173Main.Track

import {
  OpenXmlLeafElement,
  StringValue,
  assertRequired,
} from "../../../element/index.js";

/** Defines the Track Class.
 *
 * Element: `p173:track` */
export class Track extends OpenXmlLeafElement {
  override readonly localName = "track" as const;
  override readonly prefix = "p173" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/powerpoint/2017/3/main" as const;


  /** id (:id) */
  id: StringValue | undefined;

  /** label (:label) */
  label: StringValue | undefined;

  /** lang (:lang) */
  lang: StringValue | undefined;

  /** Embedded Picture Reference (r:embed) */
  embed: StringValue | undefined;

  /** Linked Picture Reference (r:link) */
  link: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "label": this.label = StringValue.parse(value); return;
      case "lang": this.lang = StringValue.parse(value); return;
      case "r:embed": this.embed = StringValue.parse(value); return;
      case "r:link": this.link = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.label !== undefined) out.push(["label", this.label.toString()]);
    if (this.lang !== undefined) out.push(["lang", this.lang.toString()]);
    if (this.embed !== undefined) out.push(["r:embed", this.embed.toString()]);
    if (this.link !== undefined) out.push(["r:link", this.link.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.id, { attribute: ":id", elementClass: "Track" });
    assertRequired(this.label, { attribute: ":label", elementClass: "Track" });
  }
}
