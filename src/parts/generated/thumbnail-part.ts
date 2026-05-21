/**
 * `ThumbnailPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.ThumbnailPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class ThumbnailPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/package/2006/relationships/metadata/thumbnail";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
