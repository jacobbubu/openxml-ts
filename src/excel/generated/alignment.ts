// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.Alignment

import {
  BooleanValue,
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Alignment.
 *
 * Element: `x:alignment` */
export class Alignment extends OpenXmlLeafElement {
  override readonly localName = "alignment" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;


  /** Horizontal Alignment (:horizontal) */
  horizontal: StringValue | undefined;

  /** Vertical Alignment (:vertical) */
  vertical: StringValue | undefined;

  /** Text Rotation (:textRotation) */
  textRotation: UInt32Value | undefined;

  /** Wrap Text (:wrapText) */
  wrapText: BooleanValue | undefined;

  /** Indent (:indent) */
  indent: UInt32Value | undefined;

  /** Relative Indent (:relativeIndent) */
  relativeIndent: Int32Value | undefined;

  /** Justify Last Line (:justifyLastLine) */
  justifyLastLine: BooleanValue | undefined;

  /** Shrink To Fit (:shrinkToFit) */
  shrinkToFit: BooleanValue | undefined;

  /** Reading Order (:readingOrder) */
  readingOrder: UInt32Value | undefined;

  /** mergeCell (:mergeCell) */
  mergeCell: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "horizontal": this.horizontal = StringValue.parse(value); return;
      case "vertical": this.vertical = StringValue.parse(value); return;
      case "textRotation": this.textRotation = UInt32Value.parse(value); return;
      case "wrapText": this.wrapText = BooleanValue.parse(value); return;
      case "indent": this.indent = UInt32Value.parse(value); return;
      case "relativeIndent": this.relativeIndent = Int32Value.parse(value); return;
      case "justifyLastLine": this.justifyLastLine = BooleanValue.parse(value); return;
      case "shrinkToFit": this.shrinkToFit = BooleanValue.parse(value); return;
      case "readingOrder": this.readingOrder = UInt32Value.parse(value); return;
      case "mergeCell": this.mergeCell = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.horizontal !== undefined) out.push(["horizontal", this.horizontal.toString()]);
    if (this.vertical !== undefined) out.push(["vertical", this.vertical.toString()]);
    if (this.textRotation !== undefined) out.push(["textRotation", this.textRotation.toString()]);
    if (this.wrapText !== undefined) out.push(["wrapText", this.wrapText.toString()]);
    if (this.indent !== undefined) out.push(["indent", this.indent.toString()]);
    if (this.relativeIndent !== undefined) out.push(["relativeIndent", this.relativeIndent.toString()]);
    if (this.justifyLastLine !== undefined) out.push(["justifyLastLine", this.justifyLastLine.toString()]);
    if (this.shrinkToFit !== undefined) out.push(["shrinkToFit", this.shrinkToFit.toString()]);
    if (this.readingOrder !== undefined) out.push(["readingOrder", this.readingOrder.toString()]);
    if (this.mergeCell !== undefined) out.push(["mergeCell", this.mergeCell.toString()]);
    return out;
  }

}
