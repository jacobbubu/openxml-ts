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
import { ConnectionsPart } from "../../parts/generated/connections-part.js";
import { SlicerCachePart } from "../../parts/generated/slicer-cache-part.js";
import { TimeLineCachePart } from "../../parts/generated/time-line-cache-part.js";
import { WebExtensionPart } from "../../parts/generated/web-extension-part.js";
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
}
