/**
 * `CommentsPart` —— Word 注释 Part（`.../wordprocessingml.comments+xml`）。
 *
 * 根元素 `<w:comments>`，内含多个 `<w:comment w:id=... w:author=...>` 子。
 * 主文档通过 part-level `comments` 关系引用本 Part；段落里通过
 * `<w:commentRangeStart/>` + `<w:commentRangeEnd/>` + `<w:commentReference/>`
 * 三联 markup 把注释锚定到具体 Run 范围。
 *
 * @see DocumentFormat.OpenXml.Packaging.WordprocessingCommentsPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Comments } from "../generated/comments.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class CommentsPart extends TypedXmlPart<Comments> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/comments";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, CommentsPlaceholder);
  }

  /** `<w:comments>` 根元素——含所有 `<w:comment>` 子。 */
  get comments(): Comments {
    return this.root;
  }

  set comments(value: Comments) {
    this.root = value;
  }
}

/** 新建场景下 root 是空 `<w:comments>` 带 wordprocessingml 主 ns。 */
class CommentsPlaceholder extends Comments {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:w", WPNS);
  }
}
