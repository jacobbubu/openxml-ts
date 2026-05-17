// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_main.json
// @see DocumentFormat.OpenXml.Drawing.RelativeRectangleType

import {
  Int32Value,
  OpenXmlLeafElement,
} from "../../element/index.js";

/** Defines the RelativeRectangleType Class.
 *
 * Abstract base type (no element binding) (abstract) */
export abstract class RelativeRectangleType extends OpenXmlLeafElement {
  override readonly localName = "" as const;
  override readonly prefix = "" as const;
  override readonly namespaceUri = "" as const;


  /** Left Offset (:l) */
  left: Int32Value | undefined;

  /** Top Offset (:t) */
  top: Int32Value | undefined;

  /** Right Offset (:r) */
  right: Int32Value | undefined;

  /** Bottom Offset (:b) */
  bottom: Int32Value | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case ":l": this.left = Int32Value.parse(value); return;
      case ":t": this.top = Int32Value.parse(value); return;
      case ":r": this.right = Int32Value.parse(value); return;
      case ":b": this.bottom = Int32Value.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.left !== undefined) out.push([":l", this.left.toString()]);
    if (this.top !== undefined) out.push([":t", this.top.toString()]);
    if (this.right !== undefined) out.push([":r", this.right.toString()]);
    if (this.bottom !== undefined) out.push([":b", this.bottom.toString()]);
    return out;
  }

}
