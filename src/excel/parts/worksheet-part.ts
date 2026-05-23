/**
 * Excel worksheet 的 typed Part（part-level 关系 type 为 `.../worksheet`）。
 *
 * @see DocumentFormat.OpenXml.Packaging.WorksheetPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { SlicersPart } from "../../parts/generated/slicers-part.js";
import { TimeLinePart } from "../../parts/generated/time-line-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Worksheet } from "../generated/worksheet.js";

export class WorksheetPart extends TypedXmlPart<Worksheet> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml";

  /** 已解析的 slicersParts 缓存。 */
  private _slicersParts: SlicersPart[] | undefined;
  /** 已解析的 timeLineParts 缓存。 */
  private _timeLineParts: TimeLinePart[] | undefined;

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
}
