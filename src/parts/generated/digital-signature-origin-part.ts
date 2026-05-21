/**
 * `DigitalSignatureOriginPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.DigitalSignatureOriginPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class DigitalSignatureOriginPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.openxmlformats.org/package/2006/relationships/digital-signature/origin";
  static readonly contentType = "application/vnd.openxmlformats-package.digital-signature-origin";
  static readonly extension = ".sigs";

  constructor(part: IPackagePart) {
    super(part);
  }
}
