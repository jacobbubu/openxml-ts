// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_openxmlformats_org_drawingml_2006_diagram.json
// @see DocumentFormat.OpenXml.Diagram.LayoutDefinition

import {
  OpenXmlCompositeElement,
  OpenXmlElementList,
  StringValue,
} from "../../element/index.js";

/** Layout Definition.
 *
 * Element: `dgm:layoutDef` */
export class LayoutDefinition extends OpenXmlCompositeElement {
  override readonly localName = "layoutDef" as const;
  override readonly prefix = "dgm" as const;
  override readonly namespaceUri = "http://schemas.openxmlformats.org/drawingml/2006/diagram" as const;
  override readonly children: OpenXmlElementList = new OpenXmlElementList(this);

  /** uniqueId (:uniqueId) */
  uniqueId: StringValue | undefined;

  /** minVer (:minVer) */
  minVersion: StringValue | undefined;

  /** defStyle (:defStyle) */
  defaultStyle: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "uniqueId": this.uniqueId = StringValue.parse(value); return;
      case "minVer": this.minVersion = StringValue.parse(value); return;
      case "defStyle": this.defaultStyle = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.uniqueId !== undefined) out.push(["uniqueId", this.uniqueId.toString()]);
    if (this.minVersion !== undefined) out.push(["minVer", this.minVersion.toString()]);
    if (this.defaultStyle !== undefined) out.push(["defStyle", this.defaultStyle.toString()]);
    return out;
  }

}
