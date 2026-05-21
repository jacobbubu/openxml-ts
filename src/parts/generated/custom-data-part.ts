/**
 * `CustomDataPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.CustomDataPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class CustomDataPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/customData";
  static readonly contentType = "application/binary";

  constructor(part: IPackagePart) {
    super(part);
  }
}
