// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.DataLabel

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../../element/index.js";

/** Defines the DataLabel Class.
 *
 * Element: `cs:dataLabel` */
export class DataLabel extends OpenXmlCompositeElement {
  override readonly localName = "dataLabel" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** mods (:mods) */
  modifiers: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "mods": this.modifiers = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modifiers !== undefined) out.push(["mods", this.modifiers.toString()]);
    return out;
  }

}
