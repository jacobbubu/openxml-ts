/**
 * `FootnotesPart` —— Word 脚注 Part（`.../wordprocessingml.footnotes+xml`）。
 *
 * 根元素 `<w:footnotes>`，内含多个 `<w:footnote w:id=... w:type=...>` 子。
 * 主文档通过 part-level `footnotes` 关系引用本 Part；正文 Run 里通过
 * `<w:footnoteReference w:id="N"/>` 引用对应脚注条目。
 *
 * 按 .NET SDK 约定，Part 初始化时预置两条特殊脚注：
 *   - id=-1, type="separator"        分隔线
 *   - id=0,  type="continuationSeparator"  续页分隔线
 * 用户脚注 id 从 1 开始自动递增。
 *
 * @see DocumentFormat.OpenXml.Packaging.MainDocumentPart（footnotes relationship）
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Footnotes } from "../generated/footnotes.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class FootnotesPart extends TypedXmlPart<Footnotes> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footnotes";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, FootnotesPlaceholder);
  }

  /** `<w:footnotes>` 根元素——含所有 `<w:footnote>` 子。 */
  get footnotes(): Footnotes {
    return this.root;
  }

  set footnotes(value: Footnotes) {
    this.root = value;
  }
}

/** 新建场景下 root 是空 `<w:footnotes>` 带 wordprocessingml 主 ns。 */
class FootnotesPlaceholder extends Footnotes {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:w", WPNS);
  }
}
