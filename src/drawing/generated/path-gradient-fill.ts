// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.PathGradientFill

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Path Gradient.
 *
 * Element: `a:path` */
export class PathGradientFill extends OpenXmlCompositeElement {
  override readonly localName = "path" as const;
  override readonly prefix = "a" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Gradient Fill Path (:path) */
  path: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "path": this.path = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.path !== undefined) out.push(["path", this.path.toString()]);
    return out;
  }

}
