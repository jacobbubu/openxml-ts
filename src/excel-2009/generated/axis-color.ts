// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_spreadsheetml_2009_9_main.json
// @see DocumentFormat.OpenXml.Excel2009.AxisColor

import {
  BooleanValue,
  DoubleValue,
  HexBinaryValue,
  OpenXmlLeafElement,
  UInt32Value,
} from "../../element/index.js";

/** Defines the AxisColor Class.
 *
 * Element: `x14:colorAxis` */
export class AxisColor extends OpenXmlLeafElement {
  override readonly localName = "colorAxis" as const;
  override readonly prefix = "x14" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" as const;


  /** Automatic (:auto) */
  auto: BooleanValue | undefined;

  /** Index (:indexed) */
  indexed: UInt32Value | undefined;

  /** Alpha Red Green Blue Color Value (:rgb) */
  rgb: HexBinaryValue | undefined;

  /** Theme Color (:theme) */
  theme: UInt32Value | undefined;

  /** Tint (:tint) */
  tint: DoubleValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "auto": this.auto = BooleanValue.parse(value); return;
      case "indexed": this.indexed = UInt32Value.parse(value); return;
      case "rgb": this.rgb = HexBinaryValue.parse(value); return;
      case "theme": this.theme = UInt32Value.parse(value); return;
      case "tint": this.tint = DoubleValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.auto !== undefined) out.push(["auto", this.auto.toString()]);
    if (this.indexed !== undefined) out.push(["indexed", this.indexed.toString()]);
    if (this.rgb !== undefined) out.push(["rgb", this.rgb.toString()]);
    if (this.theme !== undefined) out.push(["theme", this.theme.toString()]);
    if (this.tint !== undefined) out.push(["tint", this.tint.toString()]);
    return out;
  }

}
