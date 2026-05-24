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
import { CellMetadataPart } from "../../parts/generated/cell-metadata-part.js";
import { ConnectionsPart } from "../../parts/generated/connections-part.js";
import { PivotTableCacheDefinitionPart } from "../../parts/generated/pivot-table-cache-definition-part.js";
import { RdArrayPart } from "../../parts/generated/rd-array-part.js";
import { RdRichValuePart } from "../../parts/generated/rd-rich-value-part.js";
import { RdRichValueStructurePart } from "../../parts/generated/rd-rich-value-structure-part.js";
import { RdRichValueTypesPart } from "../../parts/generated/rd-rich-value-types-part.js";
import { RdRichValueWebImagePart } from "../../parts/generated/rd-rich-value-web-image-part.js";
import { RdSupportingPropertyBagPart } from "../../parts/generated/rd-supporting-property-bag-part.js";
import { RdSupportingPropertyBagStructurePart } from "../../parts/generated/rd-supporting-property-bag-structure-part.js";
import { RichStylesPart } from "../../parts/generated/rich-styles-part.js";
import { SlicerCachePart } from "../../parts/generated/slicer-cache-part.js";
import { TimeLineCachePart } from "../../parts/generated/time-line-cache-part.js";
import { VbaProjectPart } from "../../parts/generated/vba-project-part.js";
import { VolatileDependenciesPart } from "../../parts/generated/volatile-dependencies-part.js";
import { WebExtensionPart } from "../../parts/generated/web-extension-part.js";
import { WorkbookPersonPart } from "../../parts/generated/workbook-person-part.js";
import { WorkbookRevisionHeaderPart } from "../../parts/generated/workbook-revision-header-part.js";
import { WorkbookRevisionLogPart } from "../../parts/generated/workbook-revision-log-part.js";
import { WorkbookUserDataPart } from "../../parts/generated/workbook-user-data-part.js";
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
  /** 已解析的 slicerCacheParts 缓存。 */
  private _slicerCacheParts: SlicerCachePart[] | undefined;
  /** 已解析的 timeLineCacheParts 缓存。 */
  private _timeLineCacheParts: TimeLineCachePart[] | undefined;
  /** 已解析的 connectionsPart 缓存（null = 不存在，undefined = 未查）。 */
  private _connectionsPart: ConnectionsPart | null | undefined;
  /** 已解析的 webExtensionParts 缓存。 */
  private _webExtensionParts: WebExtensionPart[] | undefined;
  /** 已解析的 cellMetadataPart 缓存（null = 不存在）。 */
  private _cellMetadataPart: CellMetadataPart | null | undefined;
  /** 已解析的 volatileDependenciesPart 缓存（null = 不存在）。 */
  private _volatileDependenciesPart: VolatileDependenciesPart | null | undefined;
  /** 已解析的 workbookPersonParts 缓存。 */
  private _workbookPersonParts: WorkbookPersonPart[] | undefined;
  /** 已解析的 workbookRevisionHeaderPart 缓存（null = 不存在）。 */
  private _workbookRevisionHeaderPart: WorkbookRevisionHeaderPart | null | undefined;
  /** 已解析的 workbookRevisionLogParts 缓存。 */
  private _workbookRevisionLogParts: WorkbookRevisionLogPart[] | undefined;
  /** 已解析的 workbookUserDataPart 缓存（null = 不存在）。 */
  private _workbookUserDataPart: WorkbookUserDataPart | null | undefined;
  /** 已解析的 vbaProjectPart 缓存（null = 不存在）。 */
  private _vbaProjectPart: VbaProjectPart | null | undefined;
  /** 已解析的 pivotTableCacheDefinitionParts 缓存。 */
  private _pivotTableCacheDefinitionParts: PivotTableCacheDefinitionPart[] | undefined;
  /** 已解析的 rdArrayParts 缓存。 */
  private _rdArrayParts: RdArrayPart[] | undefined;
  /** 已解析的 rdRichValueParts 缓存。 */
  private _rdRichValueParts: RdRichValuePart[] | undefined;
  /** 已解析的 rdRichValueStructureParts 缓存。 */
  private _rdRichValueStructureParts: RdRichValueStructurePart[] | undefined;
  /** 已解析的 rdRichValueTypesParts 缓存。 */
  private _rdRichValueTypesParts: RdRichValueTypesPart[] | undefined;
  /** 已解析的 rdRichValueWebImagePart 缓存（null = 不存在）。 */
  private _rdRichValueWebImagePart: RdRichValueWebImagePart | null | undefined;
  /** 已解析的 rdSupportingPropertyBagParts 缓存。 */
  private _rdSupportingPropertyBagParts: RdSupportingPropertyBagPart[] | undefined;
  /** 已解析的 rdSupportingPropertyBagStructureParts 缓存。 */
  private _rdSupportingPropertyBagStructureParts: RdSupportingPropertyBagStructurePart[] | undefined;
  /** 已解析的 richStylesParts 缓存。 */
  private _richStylesParts: RichStylesPart[] | undefined;

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

  /**
   * 工作簿下属的所有 `SlicerCachePart`，按 part-level 关系遍历顺序排列。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.SlicerCacheParts
   */
  get slicerCacheParts(): readonly SlicerCachePart[] {
    if (this._slicerCacheParts !== undefined) return this._slicerCacheParts;
    const out: SlicerCachePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SlicerCachePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new SlicerCachePart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._slicerCacheParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `TimeLineCachePart`，按 part-level 关系遍历顺序排列。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.TimeLineCacheParts
   */
  get timeLineCacheParts(): readonly TimeLineCachePart[] {
    if (this._timeLineCacheParts !== undefined) return this._timeLineCacheParts;
    const out: TimeLineCachePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, TimeLineCachePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new TimeLineCachePart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._timeLineCacheParts = out;
    return out;
  }

  /**
   * 工作簿的 `ConnectionsPart`（外部数据连接）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.ConnectionsPart
   */
  get connectionsPart(): ConnectionsPart | undefined {
    if (this._connectionsPart !== undefined) return this._connectionsPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, ConnectionsPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new ConnectionsPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._connectionsPart = p;
      return p;
    }
    this._connectionsPart = null;
    return undefined;
  }

  /**
   * 工作簿下属的所有 `WebExtensionPart`，按 part-level 关系遍历顺序排列。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.WebExtensionParts
   */
  get webExtensionParts(): readonly WebExtensionPart[] {
    if (this._webExtensionParts !== undefined) return this._webExtensionParts;
    const out: WebExtensionPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WebExtensionPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new WebExtensionPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._webExtensionParts = out;
    return out;
  }

  /**
   * 工作簿的 `CellMetadataPart`（单元格元数据）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.CellMetadataPart
   */
  get cellMetadataPart(): CellMetadataPart | undefined {
    if (this._cellMetadataPart !== undefined) return this._cellMetadataPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, CellMetadataPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new CellMetadataPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._cellMetadataPart = p;
      return p;
    }
    this._cellMetadataPart = null;
    return undefined;
  }

  /**
   * 工作簿的 `VolatileDependenciesPart`（易失性依赖）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.VolatileDependenciesPart
   */
  get volatileDependenciesPart(): VolatileDependenciesPart | undefined {
    if (this._volatileDependenciesPart !== undefined)
      return this._volatileDependenciesPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, VolatileDependenciesPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new VolatileDependenciesPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._volatileDependenciesPart = p;
      return p;
    }
    this._volatileDependenciesPart = null;
    return undefined;
  }

  /**
   * 工作簿下属的所有 `WorkbookPersonPart`（协作人员，Office 2019+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.WorkbookPersonParts
   */
  get workbookPersonParts(): readonly WorkbookPersonPart[] {
    if (this._workbookPersonParts !== undefined) return this._workbookPersonParts;
    const out: WorkbookPersonPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorkbookPersonPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new WorkbookPersonPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._workbookPersonParts = out;
    return out;
  }

  /**
   * 工作簿的 `WorkbookRevisionHeaderPart`（修订历史头）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.WorkbookRevisionHeaderPart
   */
  get workbookRevisionHeaderPart(): WorkbookRevisionHeaderPart | undefined {
    if (this._workbookRevisionHeaderPart !== undefined)
      return this._workbookRevisionHeaderPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorkbookRevisionHeaderPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new WorkbookRevisionHeaderPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._workbookRevisionHeaderPart = p;
      return p;
    }
    this._workbookRevisionHeaderPart = null;
    return undefined;
  }

  /**
   * 工作簿下属的所有 `WorkbookRevisionLogPart`（修订日志）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.WorkbookRevisionLogParts
   */
  get workbookRevisionLogParts(): readonly WorkbookRevisionLogPart[] {
    if (this._workbookRevisionLogParts !== undefined) return this._workbookRevisionLogParts;
    const out: WorkbookRevisionLogPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorkbookRevisionLogPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new WorkbookRevisionLogPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._workbookRevisionLogParts = out;
    return out;
  }

  /**
   * 工作簿的 `WorkbookUserDataPart`（用户共享编辑数据）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.WorkbookUserDataPart
   */
  get workbookUserDataPart(): WorkbookUserDataPart | undefined {
    if (this._workbookUserDataPart !== undefined) return this._workbookUserDataPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WorkbookUserDataPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new WorkbookUserDataPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._workbookUserDataPart = p;
      return p;
    }
    this._workbookUserDataPart = null;
    return undefined;
  }

  /**
   * 工作簿的 `VbaProjectPart`（VBA 宏项目）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.VbaProjectPart
   */
  get vbaProjectPart(): VbaProjectPart | undefined {
    if (this._vbaProjectPart !== undefined) return this._vbaProjectPart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, VbaProjectPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new VbaProjectPart(this.pkg.getPart(targetUri));
      this._vbaProjectPart = p;
      return p;
    }
    this._vbaProjectPart = null;
    return undefined;
  }

  /**
   * 工作簿下属的所有 `PivotTableCacheDefinitionPart`（数据透视表缓存定义）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.PivotTableCacheDefinitionParts
   */
  get pivotTableCacheDefinitionParts(): readonly PivotTableCacheDefinitionPart[] {
    if (this._pivotTableCacheDefinitionParts !== undefined)
      return this._pivotTableCacheDefinitionParts;
    const out: PivotTableCacheDefinitionPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, PivotTableCacheDefinitionPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new PivotTableCacheDefinitionPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._pivotTableCacheDefinitionParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RdArrayPart`（Rich Data 数组，Office 365+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdArrayParts
   */
  get rdArrayParts(): readonly RdArrayPart[] {
    if (this._rdArrayParts !== undefined) return this._rdArrayParts;
    const out: RdArrayPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdArrayPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdArrayPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdArrayParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RdRichValuePart`（Rich Data 富值）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdRichValueParts
   */
  get rdRichValueParts(): readonly RdRichValuePart[] {
    if (this._rdRichValueParts !== undefined) return this._rdRichValueParts;
    const out: RdRichValuePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdRichValuePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdRichValuePart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdRichValueParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RdRichValueStructurePart`（Rich Data 结构定义）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.CT_RdRichValueStructureParts
   */
  get rdRichValueStructureParts(): readonly RdRichValueStructurePart[] {
    if (this._rdRichValueStructureParts !== undefined) return this._rdRichValueStructureParts;
    const out: RdRichValueStructurePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdRichValueStructurePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdRichValueStructurePart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdRichValueStructureParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RdRichValueTypesPart`（Rich Data 类型定义）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdRichValueTypesParts
   */
  get rdRichValueTypesParts(): readonly RdRichValueTypesPart[] {
    if (this._rdRichValueTypesParts !== undefined) return this._rdRichValueTypesParts;
    const out: RdRichValueTypesPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdRichValueTypesPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdRichValueTypesPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdRichValueTypesParts = out;
    return out;
  }

  /**
   * 工作簿的 `RdRichValueWebImagePart`（Rich Data Web 图片）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdRichValueWebImagePart
   */
  get rdRichValueWebImagePart(): RdRichValueWebImagePart | undefined {
    if (this._rdRichValueWebImagePart !== undefined)
      return this._rdRichValueWebImagePart ?? undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdRichValueWebImagePart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdRichValueWebImagePart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      this._rdRichValueWebImagePart = p;
      return p;
    }
    this._rdRichValueWebImagePart = null;
    return undefined;
  }

  /**
   * 工作簿下属的所有 `RdSupportingPropertyBagPart`（Rich Data 属性包）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdSupportingPropertyBagParts
   */
  get rdSupportingPropertyBagParts(): readonly RdSupportingPropertyBagPart[] {
    if (this._rdSupportingPropertyBagParts !== undefined)
      return this._rdSupportingPropertyBagParts;
    const out: RdSupportingPropertyBagPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RdSupportingPropertyBagPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdSupportingPropertyBagPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdSupportingPropertyBagParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RdSupportingPropertyBagStructurePart`（Rich Data 属性包结构）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RdSupportingPropertyBagStructureParts
   */
  get rdSupportingPropertyBagStructureParts(): readonly RdSupportingPropertyBagStructurePart[] {
    if (this._rdSupportingPropertyBagStructureParts !== undefined)
      return this._rdSupportingPropertyBagStructureParts;
    const out: RdSupportingPropertyBagStructurePart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (
        !relationshipTypeMatches(
          rel.type,
          RdSupportingPropertyBagStructurePart.relationshipType,
        )
      )
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RdSupportingPropertyBagStructurePart(
        this.pkg.getPart(targetUri),
        this.registry,
      );
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._rdSupportingPropertyBagStructureParts = out;
    return out;
  }

  /**
   * 工作簿下属的所有 `RichStylesPart`（富样式，Office 365+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.WorkbookPart.RichStylesParts
   */
  get richStylesParts(): readonly RichStylesPart[] {
    if (this._richStylesParts !== undefined) return this._richStylesParts;
    const out: RichStylesPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, RichStylesPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const p = new RichStylesPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) p.setMcSettings(this.mcSettings);
      out.push(p);
    }
    this._richStylesParts = out;
    return out;
  }
}
