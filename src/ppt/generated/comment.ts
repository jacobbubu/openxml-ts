// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Comment

import {
  DateTimeValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  UInt32Value,
  assertRequired,
} from "../../element/index.js";
import { CommentExtensionList } from "./comment-extension-list.js";

/** Comment.
 *
 * Element: `p:cm` */
export class Comment extends OpenXmlCompositeElement {
  override readonly localName = "cm" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** authorId (:authorId) */
  authorId: UInt32Value | undefined;

  /** dt (:dt) */
  dateTime: DateTimeValue | undefined;

  /** idx (:idx) */
  index: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "authorId": this.authorId = UInt32Value.parse(value); return;
      case "dt": this.dateTime = DateTimeValue.parse(value); return;
      case "idx": this.index = UInt32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.authorId !== undefined) out.push(["authorId", this.authorId.toString()]);
    if (this.dateTime !== undefined) out.push(["dt", this.dateTime.toString()]);
    if (this.index !== undefined) out.push(["idx", this.index.toString()]);
    return out;
  }

  /** 校验所有 RequiredValidator 标注的属性都存在；缺失抛 REQUIRED_ATTR_MISSING。 */
  validateRequired(): void {
    assertRequired(this.authorId, { attribute: ":authorId", elementClass: "Comment" });
    assertRequired(this.index, { attribute: ":idx", elementClass: "Comment" });
  }

  /** `<p:extLst>` — CommentExtensionList child element (p:cm → p:extLst).
   * @see DocumentFormat.OpenXml.Presentation.Comment.CommentExtensionList */
  get commentExtensionList(): CommentExtensionList | undefined {
    return this.getFirstChild(CommentExtensionList);
  }
}
