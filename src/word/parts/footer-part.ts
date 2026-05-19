/**
 * `FooterPart` —— Word 页脚 Part（`.../wordprocessingml.footer+xml`）。
 *
 * 根元素 `<w:ftr>`，含若干 `<w:p>`。主文档通过 \`<w:footerReference>\` 引用。
 *
 * @see DocumentFormat.OpenXml.Packaging.FooterPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Footer } from "../generated/footer.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class FooterPart extends TypedXmlPart<Footer> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, FooterPlaceholder);
  }

  /** `<w:ftr>` 根。 */
  get footer(): Footer {
    return this.root;
  }

  set footer(value: Footer) {
    this.root = value;
  }
}

class FooterPlaceholder extends Footer {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:w", WPNS);
  }
}
