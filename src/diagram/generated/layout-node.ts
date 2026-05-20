// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.LayoutNode

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Layout Node.
 *
 * Element: `dgm:layoutNode` */
export class LayoutNode extends OpenXmlCompositeElement {
  override readonly localName = "layoutNode" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** Name (:name) */
  name: StringValue | undefined;

  /** Style Label (:styleLbl) */
  styleLabel: StringValue | undefined;

  /** Child Order (:chOrder) */
  childOrder: StringValue | undefined;

  /** Move With (:moveWith) */
  moveWith: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "name": this.name = StringValue.parse(value); return;
      case "styleLbl": this.styleLabel = StringValue.parse(value); return;
      case "chOrder": this.childOrder = StringValue.parse(value); return;
      case "moveWith": this.moveWith = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.name !== undefined) out.push(["name", this.name.toString()]);
    if (this.styleLabel !== undefined) out.push(["styleLbl", this.styleLabel.toString()]);
    if (this.childOrder !== undefined) out.push(["chOrder", this.childOrder.toString()]);
    if (this.moveWith !== undefined) out.push(["moveWith", this.moveWith.toString()]);
    return out;
  }

}
