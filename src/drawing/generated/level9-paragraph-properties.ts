// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Level9ParagraphProperties

import {
  BooleanValue,
  Int32Value,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  assertNumber,
} from "../../element/index.js";

/** List Level 9 Text Style.
 *
 * Element: `a:lvl9pPr` */
export class Level9ParagraphProperties extends OpenXmlCompositeElement {
  override readonly localName = "lvl9pPr" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Left Margin (:marL) */
  leftMargin: Int32Value | undefined;

  /** Right Margin (:marR) */
  rightMargin: Int32Value | undefined;

  /** Level (:lvl) */
  level: Int32Value | undefined;

  /** Indent (:indent) */
  indent: Int32Value | undefined;

  /** Alignment (:algn) */
  alignment: StringValue | undefined;

  /** Default Tab Size (:defTabSz) */
  defaultTabSize: Int32Value | undefined;

  /** Right To Left (:rtl) */
  rightToLeft: BooleanValue | undefined;

  /** East Asian Line Break (:eaLnBrk) */
  eastAsianLineBreak: BooleanValue | undefined;

  /** Font Alignment (:fontAlgn) */
  fontAlignment: StringValue | undefined;

  /** Latin Line Break (:latinLnBrk) */
  latinLineBreak: BooleanValue | undefined;

  /** Hanging Punctuation (:hangingPunct) */
  height: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "marL": this.leftMargin = Int32Value.parse(value); assertNumber(this.leftMargin, { min: 0, max: 51206400 }, { attribute: ":marL", elementClass: "Level9ParagraphProperties" }); return;
      case "marR": this.rightMargin = Int32Value.parse(value); assertNumber(this.rightMargin, { min: 0, max: 51206400 }, { attribute: ":marR", elementClass: "Level9ParagraphProperties" }); return;
      case "lvl": this.level = Int32Value.parse(value); assertNumber(this.level, { min: 0, max: 8 }, { attribute: ":lvl", elementClass: "Level9ParagraphProperties" }); return;
      case "indent": this.indent = Int32Value.parse(value); assertNumber(this.indent, { min: -51206400, max: 51206400 }, { attribute: ":indent", elementClass: "Level9ParagraphProperties" }); return;
      case "algn": this.alignment = StringValue.parse(value); return;
      case "defTabSz": this.defaultTabSize = Int32Value.parse(value); return;
      case "rtl": this.rightToLeft = BooleanValue.parse(value); return;
      case "eaLnBrk": this.eastAsianLineBreak = BooleanValue.parse(value); return;
      case "fontAlgn": this.fontAlignment = StringValue.parse(value); return;
      case "latinLnBrk": this.latinLineBreak = BooleanValue.parse(value); return;
      case "hangingPunct": this.height = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.leftMargin !== undefined) out.push(["marL", this.leftMargin.toString()]);
    if (this.rightMargin !== undefined) out.push(["marR", this.rightMargin.toString()]);
    if (this.level !== undefined) out.push(["lvl", this.level.toString()]);
    if (this.indent !== undefined) out.push(["indent", this.indent.toString()]);
    if (this.alignment !== undefined) out.push(["algn", this.alignment.toString()]);
    if (this.defaultTabSize !== undefined) out.push(["defTabSz", this.defaultTabSize.toString()]);
    if (this.rightToLeft !== undefined) out.push(["rtl", this.rightToLeft.toString()]);
    if (this.eastAsianLineBreak !== undefined) out.push(["eaLnBrk", this.eastAsianLineBreak.toString()]);
    if (this.fontAlignment !== undefined) out.push(["fontAlgn", this.fontAlignment.toString()]);
    if (this.latinLineBreak !== undefined) out.push(["latinLnBrk", this.latinLineBreak.toString()]);
    if (this.height !== undefined) out.push(["hangingPunct", this.height.toString()]);
    return out;
  }

}
