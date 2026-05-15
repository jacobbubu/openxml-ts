// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.EastAsianLayout

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the EastAsianLayout Class.
 *
 * Element: `w:eastAsianLayout` */
export class EastAsianLayout extends OpenXmlLeafElement {
  override readonly localName = "eastAsianLayout" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** East Asian Typography Run ID (w:id) */
  id: Int32Value | undefined;

  /** Two Lines in One (w:combine) */
  combine: BooleanValue | undefined;

  /** Display Brackets Around Two Lines in One (w:combineBrackets) */
  combineBrackets: StringValue | undefined;

  /** Horizontal in Vertical (Rotate Text) (w:vert) */
  vertical: BooleanValue | undefined;

  /** Compress Rotated Text to Line Height (w:vertCompress) */
  verticalCompress: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:id": this.id = Int32Value.parse(value); return;
      case "w:combine": this.combine = BooleanValue.parse(value); return;
      case "w:combineBrackets": this.combineBrackets = StringValue.parse(value); return;
      case "w:vert": this.vertical = BooleanValue.parse(value); return;
      case "w:vertCompress": this.verticalCompress = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["w:id", this.id.toString()]);
    if (this.combine !== undefined) out.push(["w:combine", this.combine.toString()]);
    if (this.combineBrackets !== undefined) out.push(["w:combineBrackets", this.combineBrackets.toString()]);
    if (this.vertical !== undefined) out.push(["w:vert", this.vertical.toString()]);
    if (this.verticalCompress !== undefined) out.push(["w:vertCompress", this.verticalCompress.toString()]);
    return out;
  }
}
