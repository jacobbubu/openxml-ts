/**
 * `SlideCommentsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.SlideCommentsPart.
 *
 * Root element: `<p:cmLst>` (CommentList).
 * @see DocumentFormat.OpenXml.Packaging.SlideCommentsPart
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { CommentList } from "../../ppt/generated/comment-list.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class SlideCommentsPart extends TypedXmlPart<CommentList> {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.presentationml.comments+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, CommentList);
  }

  /** `<p:cmLst>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.SlideCommentsPart.CommentList */
  get commentList(): CommentList {
    return this.root;
  }

  set commentList(value: CommentList) {
    this.root = value;
  }
}
