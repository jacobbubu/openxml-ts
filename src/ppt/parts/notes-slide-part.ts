/**
 * PresentationML NotesSlide 的 typed Part（part-level 关系 type 为 `.../notesSlide`）。
 *
 * Story-4.3 提供最小骨架，仅暴露 typed root；Story-4.4 扩充 NotesMasterPart 同级关系。
 *
 * @see DocumentFormat.OpenXml.Packaging.NotesSlidePart
 */

import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TypedXmlPart } from "../../parts/typed-xml-part.js";
import { NotesSlide } from "../generated/notes-slide.js";

export class NotesSlidePart extends TypedXmlPart<NotesSlide> {
  static readonly relationshipType =
    "http://schemas.openxmlformats.org/officeDocument/2006/relationships/notesSlide";
  static readonly contentType =
    "application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, NotesSlide);
  }

  /** `<p:notes>` 根元素。 */
  get notesSlide(): NotesSlide {
    return this.root;
  }

  set notesSlide(value: NotesSlide) {
    this.root = value;
  }
}
