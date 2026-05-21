/**
 * `EmbeddedControlPersistencePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.EmbeddedControlPersistencePart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class EmbeddedControlPersistencePart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/control";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
