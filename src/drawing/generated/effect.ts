// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Effect

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Effect.
 *
 * Element: `a:effect` */
export class Effect extends OpenXmlLeafElement {
  override readonly localName = "effect" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Reference (:ref) */
  reference: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":ref": this.reference = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.reference !== undefined) out.push([":ref", this.reference.toString()]);
    return out;
  }

}
