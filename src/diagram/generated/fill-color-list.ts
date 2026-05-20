// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.FillColorList

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Fill Color List.
 *
 * Element: `dgm:fillClrLst` */
export class FillColorList extends OpenXmlCompositeElement {
  override readonly localName = "fillClrLst" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Color Application Method Type (:meth) */
  method: StringValue | undefined;

  /** Hue Direction (:hueDir) */
  hueDirection: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "meth": this.method = StringValue.parse(value); return;
      case "hueDir": this.hueDirection = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.method !== undefined) out.push(["meth", this.method.toString()]);
    if (this.hueDirection !== undefined) out.push(["hueDir", this.hueDirection.toString()]);
    return out;
  }

}
