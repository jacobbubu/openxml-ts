// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2020_threadedcomments2.json
// @see DocumentFormat.OpenXml.Spreadsheetml2020Threadedcomments2.CommentHyperlink

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
  assertRequired,
} from "../../../element/index.js";

/** Defines the CommentHyperlink Class.
 *
 * Element: `xltc2:hyperlink` */
export class CommentHyperlink extends OpenXmlCompositeElement {
  override readonly localName = "hyperlink" as const;
  override readonly prefix = "xltc2" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2020/threadedcomments2" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** startIndex (:startIndex) */
  startIndex: UInt32Value | undefined;

  /** length (:length) */
  length: UInt32Value | undefined;

  /** url (:url) */
  url: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "startIndex": this.startIndex = UInt32Value.parse(value); return;
      case "length": this.length = UInt32Value.parse(value); return;
      case "url": this.url = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.startIndex !== undefined) out.push(["startIndex", this.startIndex.toString()]);
    if (this.length !== undefined) out.push(["length", this.length.toString()]);
    if (this.url !== undefined) out.push(["url", this.url.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.startIndex, { attribute: ":startIndex", elementClass: "CommentHyperlink" });
    assertRequired(this.length, { attribute: ":length", elementClass: "CommentHyperlink" });
    assertRequired(this.url, { attribute: ":url", elementClass: "CommentHyperlink" });
  }
}
