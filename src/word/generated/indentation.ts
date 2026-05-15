// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Indentation

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the Indentation Class.
 *
 * Element: `w:ind` */
export class Indentation extends OpenXmlLeafElement {
  override readonly localName = "ind" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Left Indentation (w:left) */
  left: StringValue | undefined;

  /** start (w:start) */
  start: StringValue | undefined;

  /** Left Indentation in Character Units (w:leftChars) */
  leftChars: Int32Value | undefined;

  /** startChars (w:startChars) */
  startCharacters: Int32Value | undefined;

  /** Right Indentation (w:right) */
  right: StringValue | undefined;

  /** end (w:end) */
  end: StringValue | undefined;

  /** Right Indentation in Character Units (w:rightChars) */
  rightChars: Int32Value | undefined;

  /** endChars (w:endChars) */
  endCharacters: Int32Value | undefined;

  /** Indentation Removed from First Line (w:hanging) */
  hanging: StringValue | undefined;

  /** Indentation Removed From First Line in Character Units (w:hangingChars) */
  hangingChars: Int32Value | undefined;

  /** Additional First Line Indentation (w:firstLine) */
  firstLine: StringValue | undefined;

  /** Additional First Line Indentation in Character Units (w:firstLineChars) */
  firstLineChars: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:left": this.left = StringValue.parse(value); return;
      case "w:start": this.start = StringValue.parse(value); return;
      case "w:leftChars": this.leftChars = Int32Value.parse(value); return;
      case "w:startChars": this.startCharacters = Int32Value.parse(value); return;
      case "w:right": this.right = StringValue.parse(value); return;
      case "w:end": this.end = StringValue.parse(value); return;
      case "w:rightChars": this.rightChars = Int32Value.parse(value); return;
      case "w:endChars": this.endCharacters = Int32Value.parse(value); return;
      case "w:hanging": this.hanging = StringValue.parse(value); return;
      case "w:hangingChars": this.hangingChars = Int32Value.parse(value); return;
      case "w:firstLine": this.firstLine = StringValue.parse(value); return;
      case "w:firstLineChars": this.firstLineChars = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push(["w:left", this.left.toString()]);
    if (this.start !== undefined) out.push(["w:start", this.start.toString()]);
    if (this.leftChars !== undefined) out.push(["w:leftChars", this.leftChars.toString()]);
    if (this.startCharacters !== undefined) out.push(["w:startChars", this.startCharacters.toString()]);
    if (this.right !== undefined) out.push(["w:right", this.right.toString()]);
    if (this.end !== undefined) out.push(["w:end", this.end.toString()]);
    if (this.rightChars !== undefined) out.push(["w:rightChars", this.rightChars.toString()]);
    if (this.endCharacters !== undefined) out.push(["w:endChars", this.endCharacters.toString()]);
    if (this.hanging !== undefined) out.push(["w:hanging", this.hanging.toString()]);
    if (this.hangingChars !== undefined) out.push(["w:hangingChars", this.hangingChars.toString()]);
    if (this.firstLine !== undefined) out.push(["w:firstLine", this.firstLine.toString()]);
    if (this.firstLineChars !== undefined) out.push(["w:firstLineChars", this.firstLineChars.toString()]);
    return out;
  }

}
