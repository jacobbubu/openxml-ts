/**
 * `TimeLinePart` — generated from Open-XML-SDK part definition.
 * Faithful port of DocumentFormat.OpenXml.Packaging.TimeLinePart.
 *
 * Root element: `x15:timelines` (DocumentFormat.OpenXml.Excel2010.Timelines).
 */
import type { ElementRegistry } from "../../element/index.js";
import type { IPackagePart } from "../../packaging/interfaces/part.js";
import { Timelines } from "../../excel-2010/generated/timelines.js";
import { TypedXmlPart } from "../typed-xml-part.js";

export class TimeLinePart extends TypedXmlPart<Timelines> {
  static readonly relationshipType = "http://schemas.microsoft.com/office/2011/relationships/timeline";
  static readonly contentType = "application/vnd.ms-excel.timeline+xml";

  constructor(part: IPackagePart, registry: ElementRegistry) {
    super(part, registry, Timelines);
  }

  /** `<x15:timelines>` 根元素。
   * @see DocumentFormat.OpenXml.Packaging.TimeLinePart.Timelines */
  get timelines(): Timelines {
    return this.root;
  }

  set timelines(value: Timelines) {
    this.root = value;
  }
}
