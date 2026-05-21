/**
 * `EmbeddedControlPersistenceBinaryDataPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.EmbeddedControlPersistenceBinaryDataPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class EmbeddedControlPersistenceBinaryDataPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/activeXControlBinary";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
