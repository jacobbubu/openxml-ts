// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.AutoLabeled

import {
  BooleanValue,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the AutoLabeled Class.
 *
 * Element: `c:auto` */
export class AutoLabeled extends OpenXmlLeafElement {
  override readonly localName = "auto" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;


  /** Boolean Value (:val) */
  val: BooleanValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = BooleanValue.parse(value); return;
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
