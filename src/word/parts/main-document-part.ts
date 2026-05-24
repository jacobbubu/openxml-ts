import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { DocumentTasksPart } from "../../parts/generated/document-tasks-part.js";
import { StylesWithEffectsPart } from "../../parts/generated/styles-with-effects-part.js";
import { WordCommentsExtensiblePart } from "../../parts/generated/word-comments-extensible-part.js";
import { WordprocessingCommentsExPart } from "../../parts/generated/wordprocessing-comments-ex-part.js";
import { WordprocessingCommentsIdsPart } from "../../parts/generated/wordprocessing-comments-ids-part.js";
import { WordprocessingPeoplePart } from "../../parts/generated/wordprocessing-people-part.js";
import { WordprocessingPrinterSettingsPart } from "../../parts/generated/wordprocessing-printer-settings-part.js";
import { relationshipTypeMatches } from "../../parts/relationship-type-match.js";
import { resolveRelativePartUri } from "../../parts/relationship-uri.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { Document } from "../generated/document.js";

/**
 * Word 主文档 Part（包级关系 type 为 `.../officeDocument`）。
 *
 * @see DocumentFormat.OpenXml.Packaging.MainDocumentPart
 */
export class MainDocumentPart extends TypedXmlPart<Document> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";

  private _wordprocessingCommentsExPart: WordprocessingCommentsExPart | null | undefined;
  private _wordprocessingPeoplePart: WordprocessingPeoplePart | null | undefined;
  private _wordprocessingCommentsIdsPart: WordprocessingCommentsIdsPart | null | undefined;
  private _wordCommentsExtensiblePart: WordCommentsExtensiblePart | null | undefined;
  private _documentTasksPart: DocumentTasksPart | null | undefined;
  private _stylesWithEffectsPart: StylesWithEffectsPart | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly _pkg?: IPackage,
  ) {
    super(part, registry, Document);
  }

  /** `<w:document>` 根元素。 */
  get document(): Document {
    return this.root;
  }

  set document(value: Document) {
    this.root = value;
  }

  /**
   * W15 WordprocessingCommentsExPart（扩展批注）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WordprocessingCommentsExPart
   */
  get wordprocessingCommentsExPart(): WordprocessingCommentsExPart | undefined {
    if (this._wordprocessingCommentsExPart !== undefined) {
      return this._wordprocessingCommentsExPart ?? undefined;
    }
    const resolved = this._resolveSinglePart(WordprocessingCommentsExPart);
    this._wordprocessingCommentsExPart = resolved ?? null;
    return resolved;
  }

  /**
   * W15 WordprocessingPeoplePart（批注人员）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WordprocessingPeoplePart
   */
  get wordprocessingPeoplePart(): WordprocessingPeoplePart | undefined {
    if (this._wordprocessingPeoplePart !== undefined) {
      return this._wordprocessingPeoplePart ?? undefined;
    }
    const resolved = this._resolveSinglePart(WordprocessingPeoplePart);
    this._wordprocessingPeoplePart = resolved ?? null;
    return resolved;
  }

  /**
   * W16CID WordprocessingCommentsIdsPart（批注 ID 映射，Office 2019+）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WordprocessingCommentsIdsPart
   */
  get wordprocessingCommentsIdsPart(): WordprocessingCommentsIdsPart | undefined {
    if (this._wordprocessingCommentsIdsPart !== undefined) {
      return this._wordprocessingCommentsIdsPart ?? undefined;
    }
    const resolved = this._resolveSinglePart(WordprocessingCommentsIdsPart);
    this._wordprocessingCommentsIdsPart = resolved ?? null;
    return resolved;
  }

  /**
   * W16CID WordCommentsExtensiblePart（可扩展批注，Office 2019+）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.WordCommentsExtensiblePart
   */
  get wordCommentsExtensiblePart(): WordCommentsExtensiblePart | undefined {
    if (this._wordCommentsExtensiblePart !== undefined) {
      return this._wordCommentsExtensiblePart ?? undefined;
    }
    const resolved = this._resolveSinglePart(WordCommentsExtensiblePart);
    this._wordCommentsExtensiblePart = resolved ?? null;
    return resolved;
  }

  /**
   * DocumentTasksPart（文档任务，Office 2019+）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.DocumentTasksPart
   */
  get documentTasksPart(): DocumentTasksPart | undefined {
    if (this._documentTasksPart !== undefined) {
      return this._documentTasksPart ?? undefined;
    }
    const resolved = this._resolveSinglePart(DocumentTasksPart);
    this._documentTasksPart = resolved ?? null;
    return resolved;
  }

  /**
   * StylesWithEffectsPart（含效果的样式，Compatibility Mode）。
   * mainDocumentPart 的 part-level 关系；不存在时返 undefined。
   *
   * @see DocumentFormat.OpenXml.Packaging.StylesWithEffectsPart
   */
  get stylesWithEffectsPart(): StylesWithEffectsPart | undefined {
    if (this._stylesWithEffectsPart !== undefined) {
      return this._stylesWithEffectsPart ?? undefined;
    }
    const resolved = this._resolveSinglePart(StylesWithEffectsPart);
    this._stylesWithEffectsPart = resolved ?? null;
    return resolved;
  }

  /**
   * WordprocessingPrinterSettingsPart 集合（打印机设置，每节一个）。
   * mainDocumentPart 的 part-level 关系；不存在时返空数组。
   *
   * @see DocumentFormat.OpenXml.Packaging.MainDocumentPart.WordprocessingPrinterSettingsParts
   */
  get wordprocessingPrinterSettingsParts(): readonly WordprocessingPrinterSettingsPart[] {
    const pkg = this._pkg;
    if (pkg === undefined) return [];
    const out: WordprocessingPrinterSettingsPart[] = [];
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, WordprocessingPrinterSettingsPart.relationshipType))
        continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      out.push(new WordprocessingPrinterSettingsPart(pkg.getPart(targetUri)));
    }
    return out;
  }

  private _resolveSinglePart<T>(Ctor: {
    new (part: IPackagePart, registry: ElementRegistry): T;
    readonly relationshipType: string;
  }): T | undefined {
    const pkg = this._pkg;
    if (pkg === undefined) return undefined;
    for (const rel of this.part.relationships) {
      if (rel.targetMode !== "internal") continue;
      if (!relationshipTypeMatches(rel.type, Ctor.relationshipType)) continue;
      const targetUri = resolveRelativePartUri(this.part.uri, rel.target);
      if (targetUri === undefined || !pkg.hasPart(targetUri)) continue;
      const instance = new Ctor(pkg.getPart(targetUri), this.registry);
      if (this.mcSettings !== undefined) {
        (instance as unknown as TypedXmlPart<never>).setMcSettings(this.mcSettings);
      }
      return instance;
    }
    return undefined;
  }
}
