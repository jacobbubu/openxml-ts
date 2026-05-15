// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.PageNumberType

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** Defines the PageNumberType Class.
 *
 * Element: `w:pgNumType` */
export class PageNumberType extends OpenXmlLeafElement {
  override readonly localName = "pgNumType" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Page Number Format (w:fmt) */
  format: StringValue | undefined;

  /** Starting Page Number (w:start) */
  start: Int32Value | undefined;

  /** Chapter Heading Style (w:chapStyle) */
  chapterStyle: StringValue | undefined;

  /** Chapter Separator Character (w:chapSep) */
  chapterSeparator: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:fmt": this.format = StringValue.parse(value); return;
      case "w:start": this.start = Int32Value.parse(value); assertNumber(this.start, { min: 0 }, { attribute: "w:start", elementClass: "PageNumberType" }); return;
      case "w:chapStyle": this.chapterStyle = StringValue.parse(value); return;
      case "w:chapSep": this.chapterSeparator = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.format !== undefined) out.push(["w:fmt", this.format.toString()]);
    if (this.start !== undefined) out.push(["w:start", this.start.toString()]);
    if (this.chapterStyle !== undefined) out.push(["w:chapStyle", this.chapterStyle.toString()]);
    if (this.chapterSeparator !== undefined) out.push(["w:chapSep", this.chapterSeparator.toString()]);
    return out;
  }

}
