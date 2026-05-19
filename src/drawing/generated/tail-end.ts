// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TailEnd

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** default tail line end style is none.
 *
 * Element: `a:tailEnd` */
export class TailEnd extends OpenXmlLeafElement {
  override readonly localName = "tailEnd" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Line Head/End Type (:type) */
  type: StringValue | undefined;

  /** Width of Head/End (:w) */
  width: StringValue | undefined;

  /** Length of Head/End (:len) */
  length: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "type": this.type = StringValue.parse(value); return;
      case "w": this.width = StringValue.parse(value); return;
      case "len": this.length = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push(["type", this.type.toString()]);
    if (this.width !== undefined) out.push(["w", this.width.toString()]);
    if (this.length !== undefined) out.push(["len", this.length.toString()]);
    return out;
  }

}
