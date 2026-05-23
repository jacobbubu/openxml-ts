/**
 * PresentationML 演示文稿 Part（包级关系 type 为 `.../officeDocument`）。
 *
 * 与 .NET `DocumentFormat.OpenXml.Packaging.PresentationPart` 对位：除 typed
 * root（`<p:presentation>`）之外，还把 part-level `SlidePart` 解出来，按
 * **`<p:sldIdLst><p:sldId r:id="rId..."/>` 顺序**排列——这是 PowerPoint 中用户
 * 看到的顺序，关系遍历顺序不可靠。
 *
 * @see DocumentFormat.OpenXml.Packaging.PresentationPart
 * @see ADR-024 PowerPoint slide ordering
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { PresentationPropertiesPart } from "../../parts/generated/presentation-properties-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Presentation } from "../generated/presentation.js";
import { SlideIdList } from "../generated/slide-id-list.js";
import { SlideId } from "../generated/slide-id.js";
import { SlideMasterPart } from "./slide-master-part.js";
import { SlidePart } from "./slide-part.js";

export class PresentationPart extends TypedXmlPart<Presentation> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";

  /** 已解析的 slideParts 缓存——首次访问后冻结顺序，便于多次访问返回同一引用。 */
  private _slideParts: SlidePart[] | undefined;
  /** slideMasterParts 缓存（lazy）。 */
  private _slideMasterParts: SlideMasterPart[] | undefined;
  /** presentationPropertiesPart 缓存（null = 已查无此 Part）。 */
  private _presentationPropertiesPart: PresentationPropertiesPart | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, Presentation);
  }

  /** `<p:presentation>` 根元素。 */
  get presentation(): Presentation {
    return this.root;
  }

  set presentation(value: Presentation) {
    this.root = value;
  }

  /**
   * 演示文稿下属的所有 `SlideMasterPart`，按 part-level 关系遍历顺序。
   *
   * 对位 .NET `PresentationPart.SlideMasterParts`。
   */
  get slideMasterParts(): readonly SlideMasterPart[] {
    if (this._slideMasterParts !== undefined) return this._slideMasterParts;
    const out: SlideMasterPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SlideMasterPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const smp = new SlideMasterPart(this.pkg.getPart(targetUri), this.registry, this.pkg);
      if (this.mcSettings !== undefined) smp.setMcSettings(this.mcSettings);
      out.push(smp);
    }
    this._slideMasterParts = out;
    return out;
  }

  /**
   * 演示文稿属性 Part（`/ppt/presProps.xml`）；不存在时为 undefined。
   *
   * 对位 .NET `PresentationPart.PresentationPropertiesPart`。
   */
  get presentationPropertiesPart(): PresentationPropertiesPart | undefined {
    if (this._presentationPropertiesPart !== undefined) {
      return this._presentationPropertiesPart ?? undefined;
    }
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, PresentationPropertiesPart.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const ppp = new PresentationPropertiesPart(this.pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) ppp.setMcSettings(this.mcSettings);
      this._presentationPropertiesPart = ppp;
      return ppp;
    }
    this._presentationPropertiesPart = null;
    return undefined;
  }

  /**
   * 演示文稿下属的所有 `SlidePart`，按 `<p:sldIdLst>` 顺序排列。
   *
   * 顺序解析规则（ADR-024）：
   * 1. 从 `<p:sldIdLst>` 取出 `<p:sldId>` 子序列；
   * 2. 用每个 `sldId.r:id` 在本 part 的关系表里查 target URI；
   * 3. 命中 SlidePart.contentType 的 Part 才计入；
   * 4. 缓存语义沿用 Story-2.6：lazy 加载、多次访问返回同一数组引用。
   *
   * 若 presentation 缺 sldIdLst（异常空 deck）或所有 sldId 都解不到，返回空数组。
   */
  get slideParts(): readonly SlidePart[] {
    if (this._slideParts !== undefined) return this._slideParts;
    const out: SlidePart[] = [];
    const idList = this.presentation.firstChild(SlideIdList);
    if (idList === undefined) {
      this._slideParts = out;
      return out;
    }
    const relsById = new Map<string, string>();
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, SlidePart.relationshipType)) continue;
      relsById.set(rel.id, rel.target);
    }
    for (const sldId of idList.elements(SlideId)) {
      const rid = sldId.relationshipId?.toString();
      if (rid === undefined) continue;
      const target = relsById.get(rid);
      if (target === undefined) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, target);
      if (targetUri === undefined || !this.pkg.hasPart(targetUri)) continue;
      const sp = new SlidePart(this.pkg.getPart(targetUri), this.registry, this.pkg);
      if (this.mcSettings !== undefined) sp.setMcSettings(this.mcSettings);
      out.push(sp);
    }
    this._slideParts = out;
    return out;
  }
}
