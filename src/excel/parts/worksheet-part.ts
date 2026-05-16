/**
 * Excel worksheet 的 typed Part（part-level 关系 type 为 `.../worksheet`）。
 *
 * @see DocumentFormat.OpenXml.Packaging.WorksheetPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Worksheet } from "../generated/worksheet.js";

export class WorksheetPart extends TypedXmlPart<Worksheet> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Worksheet);
  }

  /** `<x:worksheet>` 根元素。 */
  get worksheet(): Worksheet {
    return this.root;
  }

  set worksheet(value: Worksheet) {
    this.root = value;
  }
}
