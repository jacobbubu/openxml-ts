// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.StyleEntry

import {
  ListValue,
  OpenXmlCompositeElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the StyleEntry Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class StyleEntry extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** mods (:mods) */
  modifiers: ListValue<StringValue> | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "mods": this.modifiers = ListValue.parse(value, StringValue.parse); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.modifiers !== undefined) out.push(["mods", this.modifiers.toString()]);
    return out;
  }

}
