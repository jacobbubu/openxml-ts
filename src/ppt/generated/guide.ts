// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_presentationml_2006_main.json
// @see DocumentFormat.OpenXml.Presentation.Guide

import {
  Int32Value,
  OpenXmlLeafElement,
  StringValue,
} from "../../element/index.js";

/** A Guide.
 *
 * Element: `p:guide` */
export class Guide extends OpenXmlLeafElement {
  override readonly localName = "guide" as const;
  override readonly prefix = "p" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/presentationml/2006/main" as const;


  /** Guide Orientation (:orient) */
  orientation: StringValue | undefined;

  /** Guide Position (:pos) */
  position: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "orient": this.orientation = StringValue.parse(value); return;
      case "pos": this.position = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.orientation !== undefined) out.push(["orient", this.orientation.toString()]);
    if (this.position !== undefined) out.push(["pos", this.position.toString()]);
    return out;
  }

}
