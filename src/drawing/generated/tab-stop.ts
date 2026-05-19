// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.TabStop

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Tab Stop.
 *
 * Element: `a:tab` */
export class TabStop extends OpenXmlLeafElement {
  override readonly localName = "tab" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Tab Position (:pos) */
  position: Int32Value | undefined;

  /** Tab Alignment (:algn) */
  alignment: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "pos": this.position = Int32Value.parse(value); return;
      case "algn": this.alignment = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.position !== undefined) out.push(["pos", this.position.toString()]);
    if (this.alignment !== undefined) out.push(["algn", this.alignment.toString()]);
    return out;
  }

}
