// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_wordprocessingml_2006_main.json
// @see DocumentFormat.OpenXml.Wordprocessing.Caption

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Single Caption Type Definition.
 *
 * Element: `w:caption` */
export class Caption extends OpenXmlLeafElement {
  override readonly localName = "caption" as const;
  override readonly prefix = "w" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/wordprocessingml/2006/main" as const;


  /** Caption Type Name (w:name) */
  name: StringValue | undefined;

  /** Automatic Caption Placement (w:pos) */
  position: StringValue | undefined;

  /** Include Chapter Number in Field for Caption (w:chapNum) */
  chapterNumber: BooleanValue | undefined;

  /** Style for Chapter Headings (w:heading) */
  heading: Int32Value | undefined;

  /** Do Not Include Name In Caption (w:noLabel) */
  noLabel: BooleanValue | undefined;

  /** Caption Numbering Format (w:numFmt) */
  numberFormat: StringValue | undefined;

  /** Chapter Number/Item Index Separator (w:sep) */
  separator: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "w:name": this.name = StringValue.parse(value); return;
      case "w:pos": this.position = StringValue.parse(value); return;
      case "w:chapNum": this.chapterNumber = BooleanValue.parse(value); return;
      case "w:heading": this.heading = Int32Value.parse(value); return;
      case "w:noLabel": this.noLabel = BooleanValue.parse(value); return;
      case "w:numFmt": this.numberFormat = StringValue.parse(value); return;
      case "w:sep": this.separator = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["w:name", this.name.toString()]);
    if (this.position !== undefined) out.push(["w:pos", this.position.toString()]);
    if (this.chapterNumber !== undefined) out.push(["w:chapNum", this.chapterNumber.toString()]);
    if (this.heading !== undefined) out.push(["w:heading", this.heading.toString()]);
    if (this.noLabel !== undefined) out.push(["w:noLabel", this.noLabel.toString()]);
    if (this.numberFormat !== undefined) out.push(["w:numFmt", this.numberFormat.toString()]);
    if (this.separator !== undefined) out.push(["w:sep", this.separator.toString()]);
    return out;
  }
}
