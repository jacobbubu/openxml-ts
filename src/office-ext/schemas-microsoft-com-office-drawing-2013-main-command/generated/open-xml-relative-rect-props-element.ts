// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2013_main_command.json
// @see DocumentFormat.OpenXml.Drawing2013Command.OpenXmlRelativeRectPropsElement

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../../element/index.js";

/** Defines the OpenXmlRelativeRectPropsElement Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class OpenXmlRelativeRectPropsElement extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** l (:l) */
  l: Int32Value | undefined;

  /** t (:t) */
  t: Int32Value | undefined;

  /** r (:r) */
  r: Int32Value | undefined;

  /** b (:b) */
  b: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "l": this.l = Int32Value.parse(value); return;
      case "t": this.t = Int32Value.parse(value); return;
      case "r": this.r = Int32Value.parse(value); return;
      case "b": this.b = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.l !== undefined) out.push(["l", this.l.toString()]);
    if (this.t !== undefined) out.push(["t", this.t.toString()]);
    if (this.r !== undefined) out.push(["r", this.r.toString()]);
    if (this.b !== undefined) out.push(["b", this.b.toString()]);
    return out;
  }

}
