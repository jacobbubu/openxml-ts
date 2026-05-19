// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.SplitTransition

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** Defines the SplitTransition Class.
 *
 * Element: `p:split` */
export class SplitTransition extends OpenXmlLeafElement {
  override readonly localName = "split" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Orientation (:orient) */
  orientation: StringValue | undefined;

  /** Direction (:dir) */
  direction: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "orient": this.orientation = StringValue.parse(value); return;
      case "dir": this.direction = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.orientation !== undefined) out.push(["orient", this.orientation.toString()]);
    if (this.direction !== undefined) out.push(["dir", this.direction.toString()]);
    return out;
  }

}
