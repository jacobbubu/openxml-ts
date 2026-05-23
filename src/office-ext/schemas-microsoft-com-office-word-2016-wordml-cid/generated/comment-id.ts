// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2016_wordml_cid.json
// @see DocumentFormat.OpenXml.2016WordmlCid.CommentId

import {
  HexBinaryValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentId Class.
 *
 * Element: `w16cid:commentId` */
export class CommentId extends OpenXmlLeafElement {
  override readonly localName = "commentId" as const;
  override readonly prefix = "w16cid" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2016/wordml/cid" as const;


  /** paraId (w16cid:paraId) */
  paraId: HexBinaryValue | undefined;

  /** durableId (w16cid:durableId) */
  durableId: HexBinaryValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w16cid:paraId": this.paraId = HexBinaryValue.parse(value); return;
      case "w16cid:durableId": this.durableId = HexBinaryValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.paraId !== undefined) out.push(["w16cid:paraId", this.paraId.toString()]);
    if (this.durableId !== undefined) out.push(["w16cid:durableId", this.durableId.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.paraId, { attribute: "w16cid:paraId", elementClass: "CommentId" });
    assertRequired(this.durableId, { attribute: "w16cid:durableId", elementClass: "CommentId" });
  }
}
