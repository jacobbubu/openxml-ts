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
import { CommentAuthorsPart } from "../../parts/generated/comment-authors-part.js";
import { HandoutMasterPart } from "../../parts/generated/handout-master-part.js";
import { PowerPointAuthorsPart } from "../../parts/generated/power-point-authors-part.js";
import { PowerPointCommentPart } from "../../parts/generated/power-point-comment-part.js";
import { PresentationPropertiesPart } from "../../parts/generated/presentation-properties-part.js";
import { TableStylesPart } from "../../parts/generated/table-styles-part.js";
import { UserDefinedTagsPart } from "../../parts/generated/user-defined-tags-part.js";
import { VbaProjectPart } from "../../parts/generated/vba-project-part.js";
import { ViewPropertiesPart } from "../../parts/generated/view-properties-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Presentation } from "../generated/presentation.js";
import { SlideIdList } from "../generated/slide-id-list.js";
import { SlideId } from "../generated/slide-id.js";
import { resolveManyParts, resolveSinglePart } from "./_helpers.js";
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
  /** powerPointAuthorsPart 缓存（null = 不存在）。 */
  private _powerPointAuthorsPart: PowerPointAuthorsPart | null | undefined;
  /** commentAuthorsPart 缓存（null = 不存在）。 */
  private _commentAuthorsPart: CommentAuthorsPart | null | undefined;
  /** powerPointCommentParts 缓存。 */
  private _powerPointCommentParts: PowerPointCommentPart[] | undefined;
  /** handoutMasterPart 缓存（null = 不存在）。 */
  private _handoutMasterPart: HandoutMasterPart | null | undefined;
  /** tableStylesPart 缓存（null = 不存在）。 */
  private _tableStylesPart: TableStylesPart | null | undefined;
  /** viewPropertiesPart 缓存（null = 不存在）。 */
  private _viewPropertiesPart: ViewPropertiesPart | null | undefined;
  /** userDefinedTagsPart 缓存（null = 不存在）。 */
  private _userDefinedTagsPart: UserDefinedTagsPart | null | undefined;
  /** vbaProjectPart 缓存（null = 不存在）。 */
  private _vbaProjectPart: VbaProjectPart | null | undefined;

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
   * 演示文稿的 `PowerPointAuthorsPart`（现代批注作者，Office 2019+）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.authorsPart
   */
  get powerPointAuthorsPart(): PowerPointAuthorsPart | undefined {
    if (this._powerPointAuthorsPart !== undefined)
      return this._powerPointAuthorsPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      PowerPointAuthorsPart,
      this.mcSettings,
    );
    this._powerPointAuthorsPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿的 `CommentAuthorsPart`（经典批注作者）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.CommentAuthorsPart
   */
  get commentAuthorsPart(): CommentAuthorsPart | undefined {
    if (this._commentAuthorsPart !== undefined) return this._commentAuthorsPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      CommentAuthorsPart,
      this.mcSettings,
    );
    this._commentAuthorsPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿下属的所有 `PowerPointCommentPart`（现代批注，Office 2019+）。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.commentParts
   */
  get powerPointCommentParts(): readonly PowerPointCommentPart[] {
    if (this._powerPointCommentParts !== undefined) return this._powerPointCommentParts;
    this._powerPointCommentParts = resolveManyParts(
      this.part,
      this.pkg,
      this.registry,
      PowerPointCommentPart,
      this.mcSettings,
    );
    return this._powerPointCommentParts;
  }

  /**
   * 演示文稿的 `HandoutMasterPart`（讲义母版）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.HandoutMasterPart
   */
  get handoutMasterPart(): HandoutMasterPart | undefined {
    if (this._handoutMasterPart !== undefined) return this._handoutMasterPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      HandoutMasterPart,
      this.mcSettings,
    );
    this._handoutMasterPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿的 `TableStylesPart`（表格样式）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.TableStylesPart
   */
  get tableStylesPart(): TableStylesPart | undefined {
    if (this._tableStylesPart !== undefined) return this._tableStylesPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      TableStylesPart,
      this.mcSettings,
    );
    this._tableStylesPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿的 `ViewPropertiesPart`（视图属性）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.ViewPropertiesPart
   */
  get viewPropertiesPart(): ViewPropertiesPart | undefined {
    if (this._viewPropertiesPart !== undefined) return this._viewPropertiesPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      ViewPropertiesPart,
      this.mcSettings,
    );
    this._viewPropertiesPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿的 `UserDefinedTagsPart`（用户标签）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.UserDefinedTagsPart
   */
  get userDefinedTagsPart(): UserDefinedTagsPart | undefined {
    if (this._userDefinedTagsPart !== undefined) return this._userDefinedTagsPart ?? undefined;
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      UserDefinedTagsPart,
      this.mcSettings,
    );
    this._userDefinedTagsPart = resolved ?? null;
    return resolved;
  }

  /**
   * 演示文稿的 `VbaProjectPart`（VBA 宏项目）。
   * 不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.PresentationPart.VbaProjectPart
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
