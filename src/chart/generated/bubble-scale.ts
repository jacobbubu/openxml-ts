// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.BubbleScale

import {
  OpenXmlLeafElement,
  UInt32Value,
  assertNumber,
} from "../../element/index.js";

/** Defines the BubbleScale Class.
 *
 * Element: `c:bubbleScale` */
export class BubbleScale extends OpenXmlLeafElement {
  override readonly localName = "bubbleScale" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;


  /** Bubble Scale Value (:val) */
  val: UInt32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "val": this.val = UInt32Value.parse(value); assertNumber(this.val, { min: 0, max: 300 }, { attribute: ":val", elementClass: "BubbleScale" }); return;
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
