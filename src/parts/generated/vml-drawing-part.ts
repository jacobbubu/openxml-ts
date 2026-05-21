/**
 * `VmlDrawingPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.VmlDrawingPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class VmlDrawingPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/vmlDrawing";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.vmlDrawing";
  static readonly extension = ".vml";

  constructor(part: IPackagePart) {
    super(part);
  }
}
