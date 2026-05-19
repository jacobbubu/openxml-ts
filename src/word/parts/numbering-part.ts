/**
 * `NumberingPart` —— Word 编号定义 Part（`.../wordprocessingml.numbering+xml`）。
 *
 * 根元素 `<w:numbering>`，含若干 `<w:abstractNum>`（抽象定义）+ `<w:num>`（具体
 * 实例）。主文档段落通过 `<w:numPr><w:numId/></w:numPr>` 引用具体 num 实例。
 *
 * @see DocumentFormat.OpenXml.Packaging.NumberingDefinitionsPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Numbering } from "../generated/numbering.js";

const WPNS = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";

export class NumberingPart extends TypedXmlPart<Numbering> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, NumberingPlaceholder);
  }

  /** `<w:numbering>` 根。 */
  get numbering(): Numbering {
    return this.root;
  }

  set numbering(value: Numbering) {
    this.root = value;
  }
}

class NumberingPlaceholder extends Numbering {
  constructor() {
    super();
    this.extendedAttributes.set("xmlns:w", WPNS);
  }
}
