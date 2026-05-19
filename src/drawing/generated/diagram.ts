// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.Diagram

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Diagram to Animate.
 *
 * Element: `a:dgm` */
export class Diagram extends OpenXmlLeafElement {
  override readonly localName = "dgm" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;


  /** Identifier (:id) */
  id: StringValue | undefined;

  /** Animation Build Step (:bldStep) */
  buildStep: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "id": this.id = StringValue.parse(value); return;
      case "bldStep": this.buildStep = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.id !== undefined) out.push(["id", this.id.toString()]);
    if (this.buildStep !== undefined) out.push(["bldStep", this.buildStep.toString()]);
    return out;
  }

}
