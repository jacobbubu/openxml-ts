/**
 * PresentationML NotesSlide 的 typed Part（part-level 关系 type 为 `.../notesSlide`）。
 *
 * 除 typed root（`<p:notes>`）外解出：
 * - SlidePart：反向关系，Notes 找回所属 Slide（OPC 允许 notesSlide.rels 含 type=slide
 *   的反向 entry，PowerPoint 默认会写）；
 * - NotesMasterPart 在 Story-4.4 阶段不在本类暴露（PresentationPart 顶层提供）。
 *
 * @see DocumentFormat.OpenXml.Packaging.NotesSlidePart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { NotesSlide } from "../generated/notes-slide.js";
import { resolveSinglePart } from "./_helpers.js";
import { SlidePart } from "./slide-part.js";

export class NotesSlidePart extends TypedXmlPart<NotesSlide> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml";

  private _slidePart: SlidePart | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, NotesSlide);
  }

  /** `<p:notes>` 根元素。 */
  get notesSlide(): NotesSlide {
    return this.root;
  }

  set notesSlide(value: NotesSlide) {
    this.root = value;
  }

  /**
   * 反向关系：本 notesSlide 所属的 Slide。
   *
   * OPC 允许 notesSlide 的 rels 写 type=`.../slide`（PowerPoint 默认会写），
   * 用以在 NotesSlide → Slide 间双向导航。无该反向关系时返回 undefined。
   */
  get slidePart(): SlidePart | undefined {
    if (this._slidePart !== undefined) {
      return this._slidePart ?? undefined;
    }
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      SlidePart,
      this.mcSettings,
    );
    this._slidePart = resolved ?? null;
    return resolved;
  }
}
