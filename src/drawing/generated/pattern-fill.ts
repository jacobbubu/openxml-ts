// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.PatternFill

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Pattern Fill.
 *
 * Element: `a:pattFill` */
export class PatternFill extends OpenXmlCompositeElement {
  override readonly localName = "pattFill" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Preset Pattern (:prst) */
  preset: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "prst": this.preset = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.preset !== undefined) out.push(["prst", this.preset.toString()]);
    return out;
  }

}
