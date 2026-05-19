/**
 * `HeaderPart` —— Word 页眉 Part（`.../wordprocessingml.header+xml`）。
 *
 * 根元素 `<w:hdr>`，含若干 `<w:p>` 段落。主文档通过节属性
 * `<w:sectPr><w:headerReference r:id="..." w:type="default|first|even"/>` 引用本 Part。
 *
 * @see DocumentFormat.OpenXml.Packaging.HeaderPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Header } from "../generated/header.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class HeaderPart extends TypedXmlPart<Header> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/header";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, HeaderPlaceholder);
  }

  /** `<w:hdr>` 根。 */
  get header(): Header {
    return this.root;
  }

  set header(value: Header) {
    this.root = value;
  }
}

class HeaderPlaceholder extends Header {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:w", WPNS);
  }
}
