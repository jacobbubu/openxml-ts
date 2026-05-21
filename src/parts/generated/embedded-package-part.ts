/**
 * `EmbeddedPackagePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.EmbeddedPackagePart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class EmbeddedPackagePart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/package";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
