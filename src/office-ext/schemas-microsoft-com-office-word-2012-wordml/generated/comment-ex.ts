// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_word_2012_wordml.json
// @see DocumentFormat.OpenXml.Word2012Wordml.CommentEx

import {
  HexBinaryValue,
  OnOffValue,
  OpenXmlLeafElement,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentEx Class.
 *
 * Element: `w15:commentEx` */
export class CommentEx extends OpenXmlLeafElement {
  override readonly localName = "commentEx" as const;
  override readonly prefix = "w15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/word/2012/wordml" as const;


  /** paraId (w15:paraId) */
  paraId: HexBinaryValue | undefined;

  /** paraIdParent (w15:paraIdParent) */
  paraIdParent: HexBinaryValue | undefined;

  /** done (w15:done) */
  done: OnOffValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w15:paraId": this.paraId = HexBinaryValue.parse(value); return;
      case "w15:paraIdParent": this.paraIdParent = HexBinaryValue.parse(value); return;
      case "w15:done": this.done = OnOffValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.paraId !== undefined) out.push(["w15:paraId", this.paraId.toString()]);
    if (this.paraIdParent !== undefined) out.push(["w15:paraIdParent", this.paraIdParent.toString()]);
    if (this.done !== undefined) out.push(["w15:done", this.done.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.paraId, { attribute: "w15:paraId", elementClass: "CommentEx" });
  }
}
