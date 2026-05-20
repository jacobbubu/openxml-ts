// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2010_11_main.json
// @see DocumentFormat.OpenXml.Excel2010.PivotValueCellExtra

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the PivotValueCellExtra Class.
 *
 * Element: `x15:x` */
export class PivotValueCellExtra extends OpenXmlLeafElement {
  override readonly localName = "x" as const;
  override readonly prefix = "x15" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2010/11/main" as const;


  /** in (:in) */
  formatIndex: UInt32Value | undefined;

  /** bc (:bc) */
  backgroundColor: HexBinaryValue | undefined;

  /** fc (:fc) */
  foregroundColor: HexBinaryValue | undefined;

  /** i (:i) */
  italic: BooleanValue | undefined;

  /** un (:un) */
  underline: BooleanValue | undefined;

  /** st (:st) */
  strikethrough: BooleanValue | undefined;

  /** b (:b) */
  bold: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "in": this.formatIndex = UInt32Value.parse(value); return;
      case "bc": this.backgroundColor = HexBinaryValue.parse(value); return;
      case "fc": this.foregroundColor = HexBinaryValue.parse(value); return;
      case "i": this.italic = BooleanValue.parse(value); return;
      case "un": this.underline = BooleanValue.parse(value); return;
      case "st": this.strikethrough = BooleanValue.parse(value); return;
      case "b": this.bold = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.formatIndex !== undefined) out.push(["in", this.formatIndex.toString()]);
    if (this.backgroundColor !== undefined) out.push(["bc", this.backgroundColor.toString()]);
    if (this.foregroundColor !== undefined) out.push(["fc", this.foregroundColor.toString()]);
    if (this.italic !== undefined) out.push(["i", this.italic.toString()]);
    if (this.underline !== undefined) out.push(["un", this.underline.toString()]);
    if (this.strikethrough !== undefined) out.push(["st", this.strikethrough.toString()]);
    if (this.bold !== undefined) out.push(["b", this.bold.toString()]);
    return out;
  }

}
