// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas-microsoft-com_office_office.json
// @see DocumentFormat.OpenXml.VmlOffice.Skew

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Skew Transform.
 *
 * Element: `o:skew` */
export class Skew extends OpenXmlLeafElement {
  override readonly localName = "skew" as const;
  override readonly prefix = "o" as const;
  override readonly namespaceUri = "urn:schemas-microsoft-com:office:office" as const;


  /** VML Extension Handling Behavior (v:ext) */
  extension: StringValue | undefined;

  /** Skew ID (:id) */
  id: StringValue | undefined;

  /** Skew Toggle (:on) */
  on: StringValue | undefined;

  /** Skew Offset (:offset) */
  offset: StringValue | undefined;

  /** Skew Origin (:origin) */
  origin: StringValue | undefined;

  /** Skew Perspective Matrix (:matrix) */
  matrix: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "v:ext": this.extension = StringValue.parse(value); return;
      case "id": this.id = StringValue.parse(value); return;
      case "on": this.on = StringValue.parse(value); return;
      case "offset": this.offset = StringValue.parse(value); return;
      case "origin": this.origin = StringValue.parse(value); return;
      case "matrix": this.matrix = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.extension !== undefined) out.push(["v:ext", this.extension.toString()]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.on !== undefined) out.push(["on", this.on.toString()]);
    if (this.offset !== undefined) out.push(["offset", this.offset.toString()]);
    if (this.origin !== undefined) out.push(["origin", this.origin.toString()]);
    if (this.matrix !== undefined) out.push(["matrix", this.matrix.toString()]);
    return out;
  }

}
