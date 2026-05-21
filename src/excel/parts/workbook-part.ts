/**
 * Excel 工作簿 Part（包级关系 type 为 `.../officeDocument`）。
 *
 * 与 .NET `DocumentFormat.OpenXml.Packaging.WorkbookPart` 对位：除 typed
 * root 之外，还把 part-level 关系中的所有 `WorksheetPart` 解出来，按关系
 * 顺序暴露为有序数组（ADR-017）。
 *
 * @see DocumentFormat.OpenXml.Packaging.WorkbookPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Workbook } from "../generated/workbook.js";
import { WorksheetPart } from "./worksheet-part.js";

export class WorkbookPart extends TypedXmlPart<Workbook> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml";

  /** 已解析的 worksheetParts 缓存——首次访问后冻结顺序，便于多次访问返回同一引用。 */
  private _worksheetParts: WorksheetPart[] | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, Workbook);
  }

  /** `<x:workbook>` 根元素。 */
  get workbook(): Workbook {
    return this.root;
  }

  set workbook(value: Workbook) {
    this.root = value;
  }

  /**
   * 工作簿下属的所有 `WorksheetPart`，按 part-level 关系遍历顺序排列。
   *
   * 缓存语义：首次访问构造一组 `WorksheetPart` 实例，后续访问返回同一数组引用
   * 与同一份 typed Part 实例（沿用 `TypedXmlPart` lazy 缓存）。
   */
  get worksheetParts(): readonly WorksheetPart[] {
    if (this._worksheetParts !== undefined) return this._worksheetParts;
    const out: WorksheetPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorksheetPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const wsp = new WorksheetPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) wsp.setMcSettings(this.mcSettings);
      out.push(wsp);
    }
    this._worksheetParts = out;
    return out;
  }
}
