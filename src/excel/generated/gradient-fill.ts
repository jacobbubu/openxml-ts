// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_spreadsheetml_2006_main.json
// @see DocumentFormat.OpenXml.Spreadsheet.GradientFill

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Gradient.
 *
 * Element: `x:gradientFill` */
export class GradientFill extends OpenXmlCompositeElement {
  override readonly localName = "gradientFill" as const;
  override readonly prefix = "x" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/spreadsheetml/2006/main" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Gradient Fill Type (:type) */
  type: StringValue | undefined;

  /** Linear Gradient Degree (:degree) */
  degree: StringValue | undefined;

  /** Left Convergence (:left) */
  left: StringValue | undefined;

  /** Right Convergence (:right) */
  right: StringValue | undefined;

  /** Top Gradient Convergence (:top) */
  top: StringValue | undefined;

  /** Bottom Convergence (:bottom) */
  bottom: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":type": this.type = StringValue.parse(value); return;
      case ":degree": this.degree = StringValue.parse(value); return;
      case ":left": this.left = StringValue.parse(value); return;
      case ":right": this.right = StringValue.parse(value); return;
      case ":top": this.top = StringValue.parse(value); return;
      case ":bottom": this.bottom = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.type !== undefined) out.push([":type", this.type.toString()]);
    if (this.degree !== undefined) out.push([":degree", this.degree.toString()]);
    if (this.left !== undefined) out.push([":left", this.left.toString()]);
    if (this.right !== undefined) out.push([":right", this.right.toString()]);
    if (this.top !== undefined) out.push([":top", this.top.toString()]);
    if (this.bottom !== undefined) out.push([":bottom", this.bottom.toString()]);
    return out;
  }

}
