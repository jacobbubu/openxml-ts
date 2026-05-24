/**
 * Excel worksheet 的 typed Part（part-level 关系 type 为 `.../worksheet`）。
 *
 * @see DocumentFormat.OpenXml.Packaging.WorksheetPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { NamedSheetViewsPart } from "../../parts/generated/named-sheet-views-part.js";
import { PivotTablePart } from "../../parts/generated/pivot-table-part.js";
import { QueryTablePart } from "../../parts/generated/query-table-part.js";
import { SingleCellTablePart } from "../../parts/generated/single-cell-table-part.js";
import { SlicersPart } from "../../parts/generated/slicers-part.js";
import { SpreadsheetPrinterSettingsPart } from "../../parts/generated/spreadsheet-printer-settings-part.js";
import { TableDefinitionPart } from "../../parts/generated/table-definition-part.js";
import { TimeLinePart } from "../../parts/generated/time-line-part.js";
import { VmlDrawingPart } from "../../parts/generated/vml-drawing-part.js";
import { WorksheetCommentsPart } from "../../parts/generated/worksheet-comments-part.js";
import { WorksheetSortMapPart } from "../../parts/generated/worksheet-sort-map-part.js";
import { WorksheetThreadedCommentsPart } from "../../parts/generated/worksheet-threaded-comments-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Worksheet } from "../generated/worksheet.js";
import { DrawingPart } from "./drawing-part.js";

export class WorksheetPart extends TypedXmlPart<Worksheet> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml";

  /** 已解析的 slicersParts 缓存。 */
  private _slicersParts: SlicersPart[] | undefined;
  /** 已解析的 timeLineParts 缓存。 */
  private _timeLineParts: TimeLinePart[] | undefined;
  /** 已解析的 drawingsPart 缓存（null = 不存在，undefined = 未查）。 */
  private _drawingsPart: DrawingPart | null | undefined;
  /** 已解析的 worksheetCommentsPart 缓存（null = 不存在）。 */
  private _worksheetCommentsPart: WorksheetCommentsPart | null | undefined;
  /** 已解析的 worksheetSortMapPart 缓存（null = 不存在）。 */
  private _worksheetSortMapPart: WorksheetSortMapPart | null | undefined;
  /** 已解析的 worksheetThreadedCommentsParts 缓存。 */
  private _worksheetThreadedCommentsParts: WorksheetThreadedCommentsPart[] | undefined;
  /** 已解析的 namedSheetViewsParts 缓存。 */
  private _namedSheetViewsParts: NamedSheetViewsPart[] | undefined;
  /** 已解析的 pivotTableParts 缓存。 */
  private _pivotTableParts: PivotTablePart[] | undefined;
  /** 已解析的 queryTableParts 缓存。 */
  private _queryTableParts: QueryTablePart[] | undefined;
  /** 已解析的 singleCellTablePart 缓存（null = 不存在）。 */
  private _singleCellTablePart: SingleCellTablePart | null | undefined;
  /** 已解析的 tableDefinitionParts 缓存。 */
  private _tableDefinitionParts: TableDefinitionPart[] | undefined;
  /** 已解析的 vmlDrawingParts 缓存。 */
  private _vmlDrawingParts: VmlDrawingPart[] | undefined;

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

  /**
   * 工作表下属的所有 `SlicersPart`，按 part-level 关系遍历顺序排列。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.SlicersParts
   */
  get slicersParts(): readonly SlicersPart[] {
    if (this._slicersParts !== undefined) return this._slicersParts;
    const pkg = this.part.package;
    const out: SlicersPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SlicersPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new SlicersPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._slicersParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `TimeLinePart`，按 part-level 关系遍历顺序排列。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.TimeLineParts
   */
  get timeLineParts(): readonly TimeLinePart[] {
    if (this._timeLineParts !== undefined) return this._timeLineParts;
    const pkg = this.part.package;
    const out: TimeLinePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, TimeLinePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new TimeLinePart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._timeLineParts = out;
    return out;
  }

  /**
   * 工作表的 `DrawingsPart`（图形绘制容器）。
   * 不存在时返回 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.DrawingsPart
   */
  get drawingsPart(): DrawingPart | undefined {
    if (this._drawingsPart !== undefined) return this._drawingsPart ?? undefined;
    const pkg = this.part.package;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, DrawingPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new DrawingPart(pkg.getPart(targetUri), this.registry, pkg);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._drawingsPart = p;
      return p;
    }
    this._drawingsPart = null;
    return undefined;
  }

  /**
   * 工作表的 `WorksheetCommentsPart`（批注）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.WorksheetCommentsPart
   */
  get worksheetCommentsPart(): WorksheetCommentsPart | undefined {
    if (this._worksheetCommentsPart !== undefined) return this._worksheetCommentsPart ?? undefined;
    const pkg = this.part.package;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorksheetCommentsPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new WorksheetCommentsPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._worksheetCommentsPart = p;
      return p;
    }
    this._worksheetCommentsPart = null;
    return undefined;
  }

  /**
   * 工作表的 `WorksheetSortMapPart`（排序映射）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.WorksheetSortMapPart
   */
  get worksheetSortMapPart(): WorksheetSortMapPart | undefined {
    if (this._worksheetSortMapPart !== undefined) return this._worksheetSortMapPart ?? undefined;
    const pkg = this.part.package;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorksheetSortMapPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new WorksheetSortMapPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._worksheetSortMapPart = p;
      return p;
    }
    this._worksheetSortMapPart = null;
    return undefined;
  }

  /**
   * 工作表下属的所有 `WorksheetThreadedCommentsPart`（线程化批注，Office 2019+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.WorksheetThreadedCommentsParts
   */
  get worksheetThreadedCommentsParts(): readonly WorksheetThreadedCommentsPart[] {
    if (this._worksheetThreadedCommentsParts !== undefined)
      return this._worksheetThreadedCommentsParts;
    const pkg = this.part.package;
    const out: WorksheetThreadedCommentsPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorksheetThreadedCommentsPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new WorksheetThreadedCommentsPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._worksheetThreadedCommentsParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `NamedSheetViewsPart`（命名视图，Office 2019+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.NamedSheetViewsParts
   */
  get namedSheetViewsParts(): readonly NamedSheetViewsPart[] {
    if (this._namedSheetViewsParts !== undefined) return this._namedSheetViewsParts;
    const pkg = this.part.package;
    const out: NamedSheetViewsPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, NamedSheetViewsPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new NamedSheetViewsPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._namedSheetViewsParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `PivotTablePart`（数据透视表）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.PivotTableParts
   */
  get pivotTableParts(): readonly PivotTablePart[] {
    if (this._pivotTableParts !== undefined) return this._pivotTableParts;
    const pkg = this.part.package;
    const out: PivotTablePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, PivotTablePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new PivotTablePart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._pivotTableParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `QueryTablePart`（查询表）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.QueryTableParts
   */
  get queryTableParts(): readonly QueryTablePart[] {
    if (this._queryTableParts !== undefined) return this._queryTableParts;
    const pkg = this.part.package;
    const out: QueryTablePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, QueryTablePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new QueryTablePart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._queryTableParts = out;
    return out;
  }

  /**
   * 工作表的 `SingleCellTablePart`（单单元格表）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.SingleCellTablePart
   */
  get singleCellTablePart(): SingleCellTablePart | undefined {
    if (this._singleCellTablePart !== undefined) return this._singleCellTablePart ?? undefined;
    const pkg = this.part.package;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SingleCellTablePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new SingleCellTablePart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._singleCellTablePart = p;
      return p;
    }
    this._singleCellTablePart = null;
    return undefined;
  }

  /**
   * 工作表下属的所有 `TableDefinitionPart`（表格定义）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.TableDefinitionParts
   */
  get tableDefinitionParts(): readonly TableDefinitionPart[] {
    if (this._tableDefinitionParts !== undefined) return this._tableDefinitionParts;
    const pkg = this.part.package;
    const out: TableDefinitionPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, TableDefinitionPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const p = new TableDefinitionPart(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._tableDefinitionParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `VmlDrawingPart`（VML 图形）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.VmlDrawingParts
   */
  get vmlDrawingParts(): readonly VmlDrawingPart[] {
    if (this._vmlDrawingParts !== undefined) return this._vmlDrawingParts;
    const pkg = this.part.package;
    const out: VmlDrawingPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, VmlDrawingPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      out.push(new VmlDrawingPart(pkg.getPart(targetUri)));
    }
    this._vmlDrawingParts = out;
    return out;
  }

  /**
   * 工作表下属的所有 `SpreadsheetPrinterSettingsPart`（打印机设置）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorksheetPart.SpreadsheetPrinterSettingsParts
   */
  get spreadsheetPrinterSettingsParts(): readonly SpreadsheetPrinterSettingsPart[] {
    const pkg = this.part.package;
    const out: SpreadsheetPrinterSettingsPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SpreadsheetPrinterSettingsPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      out.push(new SpreadsheetPrinterSettingsPart(pkg.getPart(targetUri)));
    }
    return out;
  }
}
