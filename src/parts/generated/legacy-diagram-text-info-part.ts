/**
 * `LegacyDiagramTextInfoPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.LegacyDiagramTextInfoPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class LegacyDiagramTextInfoPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/legacyDocTextInfo";
  static readonly contentType = "application/vnd.ms-office.legacyDocTextInfo";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
