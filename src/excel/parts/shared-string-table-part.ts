/**
 * Excel 共享串表 Part（part-level 关系 type 为 `.../sharedStrings`）。
 *
 * `<x:sst>` 是 Excel 特有的跨 Part 索引根：所有标记 `dataType="s"` 的 cell
 * 的 `<v>` 文本是一个整数索引，指向本表的第 N 个 `<x:si>` 项。Story-3.4
 * 会在这条契约上长出 `Cell.resolvedText` getter；本 Story 只暴露 typed root。
 *
 * @see DocumentFormat.OpenXml.Packaging.SharedStringTablePart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { SharedStringTable } from "../generated/shared-string-table.js";

export class SharedStringTablePart extends TypedXmlPart<SharedStringTable> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, SharedStringTable);
  }

  /** `<x:sst>` 根元素。 */
  get sharedStringTable(): SharedStringTable {
    return this.root;
  }

  set sharedStringTable(value: SharedStringTable) {
    this.root = value;
  }
}
