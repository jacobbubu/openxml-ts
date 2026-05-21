/**
 * `LegacyDiagramTextPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.LegacyDiagramTextPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class LegacyDiagramTextPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/legacyDiagramText";
  static readonly contentType = "application/vnd.ms-office.legacyDiagramText";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
