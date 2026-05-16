// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.MdxTuple

import {
  BooleanValue,
  HexBinaryValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
  UInt32Value,
} from "../../element/index.js";

/** Tuple MDX Metadata.
 *
 * Element: `x:t` */
export class MdxTuple extends OpenXmlCompositeElement {
  override readonly localName = "t" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Member Index Count (:c) */
  memberIndexCount: UInt32Value | undefined;

  /** Server Formatting Culture Currency (:ct) */
  cultureCurrency: StringValue | undefined;

  /** Server Formatting String Index (:si) */
  formattingStringIndex: UInt32Value | undefined;

  /** Server Formatting Built-In Number Format Index (:fi) */
  formatIndex: UInt32Value | undefined;

  /** Server Formatting Background Color (:bc) */
  backgroundColor: HexBinaryValue | undefined;

  /** Server Formatting Foreground Color (:fc) */
  foregroundColor: HexBinaryValue | undefined;

  /** Server Formatting Italic Font (:i) */
  italic: BooleanValue | undefined;

  /** Server Formatting Underline Font (:u) */
  underline: BooleanValue | undefined;

  /** Server Formatting Strikethrough Font (:st) */
  strikethrough: BooleanValue | undefined;

  /** Server Formatting Bold Font (:b) */
  bold: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":c": this.memberIndexCount = UInt32Value.parse(value); return;
      case ":ct": this.cultureCurrency = StringValue.parse(value); return;
      case ":si": this.formattingStringIndex = UInt32Value.parse(value); return;
      case ":fi": this.formatIndex = UInt32Value.parse(value); return;
      case ":bc": this.backgroundColor = HexBinaryValue.parse(value); return;
      case ":fc": this.foregroundColor = HexBinaryValue.parse(value); return;
      case ":i": this.italic = BooleanValue.parse(value); return;
      case ":u": this.underline = BooleanValue.parse(value); return;
      case ":st": this.strikethrough = BooleanValue.parse(value); return;
      case ":b": this.bold = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.memberIndexCount !== undefined) out.push([":c", this.memberIndexCount.toString()]);
    if (this.cultureCurrency !== undefined) out.push([":ct", this.cultureCurrency.toString()]);
    if (this.formattingStringIndex !== undefined) out.push([":si", this.formattingStringIndex.toString()]);
    if (this.formatIndex !== undefined) out.push([":fi", this.formatIndex.toString()]);
    if (this.backgroundColor !== undefined) out.push([":bc", this.backgroundColor.toString()]);
    if (this.foregroundColor !== undefined) out.push([":fc", this.foregroundColor.toString()]);
    if (this.italic !== undefined) out.push([":i", this.italic.toString()]);
    if (this.underline !== undefined) out.push([":u", this.underline.toString()]);
    if (this.strikethrough !== undefined) out.push([":st", this.strikethrough.toString()]);
    if (this.bold !== undefined) out.push([":b", this.bold.toString()]);
    return out;
  }

}
