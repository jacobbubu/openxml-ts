// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.LineNumberType

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the LineNumberType Class.
 *
 * Element: `w:lnNumType` */
export class LineNumberType extends OpenXmlLeafElement {
  override readonly localName = "lnNumType" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Line Number Increments to Display (w:countBy) */
  countBy: StringValue | undefined;

  /** Line Numbering Starting Value (w:start) */
  start: StringValue | undefined;

  /** Distance Between Text and Line Numbering (w:distance) */
  distance: StringValue | undefined;

  /** Line Numbering Restart Setting (w:restart) */
  restart: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:countBy": this.countBy = StringValue.parse(value); return;
      case "w:start": this.start = StringValue.parse(value); return;
      case "w:distance": this.distance = StringValue.parse(value); return;
      case "w:restart": this.restart = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.countBy !== undefined) out.push(["w:countBy", this.countBy.toString()]);
    if (this.start !== undefined) out.push(["w:start", this.start.toString()]);
    if (this.distance !== undefined) out.push(["w:distance", this.distance.toString()]);
    if (this.restart !== undefined) out.push(["w:restart", this.restart.toString()]);
    return out;
  }

}
