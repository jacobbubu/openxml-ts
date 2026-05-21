/**
 * PresentationML NotesMaster 的 typed Part（part-level 关系 type 为 `.../notesMaster`）。
 *
 * NotesMaster 给所有 NotesSlide 提供默认格式（字体/颜色/版面），
 * 一般引用 ThemePart 作为视觉基线。
 *
 * @see DocumentFormat.OpenXml.Packaging.NotesMasterPart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackage } from "../../packaging/interfaces/package.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { ThemePart } from "../../parts/theme-part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { NotesMaster } from "../generated/notes-master.js";
import { resolveSinglePart } from "./_helpers.js";

export class NotesMasterPart extends TypedXmlPart<NotesMaster> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesMaster";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml";

  private _themePart: ThemePart | null | undefined;

  constructor(
    part: IPackagePart,
    registry: ElementRegistry,
    private readonly pkg: IPackage,
  ) {
    super(part, registry, NotesMaster);
  }

  /** `<p:notesMaster>` 根元素。 */
  get notesMaster(): NotesMaster {
    return this.root;
  }

  set notesMaster(value: NotesMaster) {
    this.root = value;
  }

  /** 关联的 Theme part；不引用 theme 时 undefined。 */
  get themePart(): ThemePart | undefined {
    if (this._themePart !== undefined) {
      return this._themePart ?? undefined;
    }
    const resolved = resolveSinglePart(
      this.part,
      this.pkg,
      this.registry,
      ThemePart,
      this.mcSettings,
    );
    this._themePart = resolved ?? null;
    return resolved;
  }
}
