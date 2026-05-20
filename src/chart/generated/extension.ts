// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_chart.json
// @see DocumentFormat.OpenXml.Chart.Extension

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Extension.
 *
 * Element: `c:ext` */
export class Extension extends OpenXmlCompositeElement {
  override readonly localName = "ext" as const;
  override readonly prefix = "c" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/chart" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Uniform Resource Identifier (:uri) */
  uri: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uri": this.uri = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uri !== undefined) out.push(["uri", this.uri.toString()]);
    return out;
  }

}
