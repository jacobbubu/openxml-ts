/**
 * Excel 样式表 Part（part-level 关系 type 为 `.../styles`）。
 *
 * 根元素 `<x:styleSheet>`：字体 / 填充 / 边框 / 单元格 xf / 命名样式等的中央表。
 *
 * @see DocumentFormat.OpenXml.Packaging.WorkbookStylesPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Stylesheet } from "../generated/stylesheet.js";

export class WorkbookStylesPart extends TypedXmlPart<Stylesheet> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Stylesheet);
  }

  /** `<x:styleSheet>` 根元素。 */
  get stylesheet(): Stylesheet {
    return this.root;
  }

  set stylesheet(value: Stylesheet) {
    this.root = value;
  }
}
