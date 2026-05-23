/**
 * `SlicerCachePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.SlicerCachePart.
 *
 * Root element: `x14:slicerCacheDefinition` (DocumentFormat.OpenXml.Excel2009.SlicerCacheDefinition).
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { SlicerCacheDefinition } from "../../excel-2009/generated/slicer-cache-definition.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class SlicerCachePart extends TypedXmlPart<SlicerCacheDefinition> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2007/relationships/slicerCache";
  static readonly contentType = "application/vnd.ms-excel.slicerCache+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, SlicerCacheDefinition);
  }

  /** `<x14:slicerCacheDefinition>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.SlicerCachePart.SlicerCacheDefinition */
  get slicerCacheDefinition(): SlicerCacheDefinition {
    return this.root;
  }

  set slicerCacheDefinition(value: SlicerCacheDefinition) {
    this.root = value;
  }
}
