/**
 * `TimeLineCachePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.TimeLineCachePart.
 *
 * Root element: `x15:timelineCacheDefinition` (DocumentFormat.OpenXml.Excel2010.TimelineCacheDefinition).
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { TimelineCacheDefinition } from "../../excel-2010/generated/timeline-cache-definition.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class TimeLineCachePart extends TypedXmlPart<TimelineCacheDefinition> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2011/relationships/timelineCache";
  static readonly contentType = "application/vnd.ms-excel.timelineCache+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, TimelineCacheDefinition);
  }

  /** `<x15:timelineCacheDefinition>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.TimeLineCachePart.TimelineCacheDefinition */
  get timelineCacheDefinition(): TimelineCacheDefinition {
    return this.root;
  }

  set timelineCacheDefinition(value: TimelineCacheDefinition) {
    this.root = value;
  }
}
