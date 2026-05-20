// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.SampleDataType

import {
  BooleanValue,
  OpenXmlCompositeElement,
} from "../../element/index.js";

/** Defines the SampleDataType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class SampleDataType extends OpenXmlCompositeElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


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
