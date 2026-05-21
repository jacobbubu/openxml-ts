/**
 * `ExcelAttachedToolbarsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.ExcelAttachedToolbarsPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class ExcelAttachedToolbarsPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2006/relationships/attachedToolbars";
  static readonly contentType = "application/vnd.ms-excel.attachedToolbars";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
