import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { WordprocessingCommentsExPart } from "../../parts/generated/wordprocessing-comments-ex-part.js";
import { WordprocessingPeoplePart } from "../../parts/generated/wordprocessing-people-part.js";
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
