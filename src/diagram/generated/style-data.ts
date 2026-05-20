// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.StyleData

import {
  BooleanValue,
  OpenXmlCompositeElement,
  OpenXmlElementList,
} from "../../element/index.js";

/** Defines the StyleData Class.
 *
 * Element: `dgm:styleData` */
export class StyleData extends OpenXmlCompositeElement {
  override readonly localName = "styleData" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Use Default (:useDef) */
  useDefault: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "useDef": this.useDefault = BooleanValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.useDefault !== undefined) out.push(["useDef", this.useDefault.toString()]);
    return out;
  }

}
