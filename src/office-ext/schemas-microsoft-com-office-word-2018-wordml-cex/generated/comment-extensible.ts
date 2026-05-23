// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2018_wordml_cex.json
// @see DocumentFormat.OpenXml.2018WordmlCex.CommentExtensible

import {
  DateTimeValue,
  HexBinaryValue,
  OnOffValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentExtensible Class.
 *
 * Element: `w16cex:commentExtensible` */
export class CommentExtensible extends OpenXmlCompositeElement {
  override readonly localName = "commentExtensible" as const;
  override readonly prefix = "w16cex" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2018/wordml/cex" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** durableId (w16cex:durableId) */
  durableId: HexBinaryValue | undefined;

  /** dateUtc (w16cex:dateUtc) */
  dateUtc: DateTimeValue | undefined;

  /** intelligentPlaceholder (w16cex:intelligentPlaceholder) */
  intelligentPlaceholder: OnOffValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w16cex:durableId": this.durableId = HexBinaryValue.parse(value); return;
      case "w16cex:dateUtc": this.dateUtc = DateTimeValue.parse(value); return;
      case "w16cex:intelligentPlaceholder": this.intelligentPlaceholder = OnOffValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.durableId !== undefined) out.push(["w16cex:durableId", this.durableId.toString()]);
    if (this.dateUtc !== undefined) out.push(["w16cex:dateUtc", this.dateUtc.toString()]);
    if (this.intelligentPlaceholder !== undefined) out.push(["w16cex:intelligentPlaceholder", this.intelligentPlaceholder.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.durableId, { attribute: "w16cex:durableId", elementClass: "CommentExtensible" });
  }
}
