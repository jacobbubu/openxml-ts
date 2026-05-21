/**
 * `SpreadsheetPrinterSettingsPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.SpreadsheetPrinterSettingsPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class SpreadsheetPrinterSettingsPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/printerSettings";
  static readonly contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.printerSettings";
  static readonly extension = ".bin";

  constructor(part: IPackagePart) {
    super(part);
  }
}
