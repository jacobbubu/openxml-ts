// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.MaxNumberOfChildren

import {
  Int32Value,
  OpenXmlLeafElement,
  assertNumber,
} from "../../element/index.js";

/** Maximum Children.
 *
 * Element: `dgm:chMax` */
export class MaxNumberOfChildren extends OpenXmlLeafElement {
  override readonly localName = "chMax" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;


  /** Maximum Children Value (:val) */
  val: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = Int32Value.parse(value); assertNumber(this.val, { min: -1 }, { attribute: ":val", elementClass: "MaxNumberOfChildren" }); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.val !== undefined) out.push(["val", this.val.toString()]);
    return out;
  }

}
