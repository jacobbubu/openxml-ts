// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.MarkerLayoutProperties

import {
  ByteValue,
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the MarkerLayoutProperties Class.
 *
 * Element: `cs:dataPointMarkerLayout` */
export class MarkerLayoutProperties extends OpenXmlLeafElement {
  override readonly localName = "dataPointMarkerLayout" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** symbol (:symbol) */
  symbol: StringValue | undefined;

  /** size (:size) */
  size: ByteValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "symbol": this.symbol = StringValue.parse(value); return;
      case "size": this.size = ByteValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.symbol !== undefined) out.push(["symbol", this.symbol.toString()]);
    if (this.size !== undefined) out.push(["size", this.size.toString()]);
    return out;
  }

}
