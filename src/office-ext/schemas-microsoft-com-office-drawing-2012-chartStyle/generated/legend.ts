// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.Legend

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Legend Class.
 *
 * Element: `cs:legend` */
export class Legend extends OpenXmlLeafElement {
  override readonly localName = "legend" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** visible (:visible) */
  visible: StringValue | undefined;

  /** includeInLayout (:includeInLayout) */
  includeInLayout: StringValue | undefined;

  /** position (:position) */
  position: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "visible": this.visible = StringValue.parse(value); return;
      case "includeInLayout": this.includeInLayout = StringValue.parse(value); return;
      case "position": this.position = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): [string, string][] {
    const out: [string, string][] = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.visible !== undefined) out.push(["visible", this.visible.toString()]);
    if (this.includeInLayout !== undefined) out.push(["includeInLayout", this.includeInLayout.toString()]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    return out;
  }

}
