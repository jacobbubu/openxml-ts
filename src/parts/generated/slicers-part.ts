/**
 * `SlicersPart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.SlicersPart.
 *
 * Root element: `x14:slicers` (DocumentFormat.OpenXml.Excel2009.Slicers).
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { Slicers } from "../../excel-2009/generated/slicers.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class SlicersPart extends TypedXmlPart<Slicers> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/slicer";
  static readonly contentType = "application/vnd.ms-excel.slicer+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Slicers);
  }

  /** `<x14:slicers>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.SlicersPart.Slicers */
  get slicers(): Slicers {
    return this.root;
  }

  set slicers(value: Slicers) {
    this.root = value;
  }
}
