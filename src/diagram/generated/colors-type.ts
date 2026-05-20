// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.ColorsType

import {
  OpenXmlCompositeElement,
  StringValue,
} from "../../element/index.js";

/** Defines the ColorsType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class ColorsType extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


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
