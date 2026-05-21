/**
 * `Model3DReferenceRelationshipPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.Model3DReferenceRelationshipPart.
 *
 * Binary / opaque-blob part; bytes are passed through without XML parsing.
 */
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { BinaryPart } from "../binary-part.js";

export class Model3DReferenceRelationshipPart extends BinaryPart {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2017/06/relationships/model3d";
  static readonly contentType = "model/gltf-binary";
  static readonly extension = ".glb";

  constructor(part: IPackagePart) {
    super(part);
  }
}
