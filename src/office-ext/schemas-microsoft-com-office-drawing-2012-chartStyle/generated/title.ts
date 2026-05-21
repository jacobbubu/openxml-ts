// THIS FILE IS GENERATED. DO NOT EDIT.
// Source: /Users/rongshen/github/Open-XML-SDK/data/schemas/schemas_microsoft_com_office_drawing_2012_chartStyle.json
// @see DocumentFormat.OpenXml.Drawing2012ChartStyle.Title

import {
  OpenXmlLeafElement,
  StringValue,
} from "../../../element/index.js";

/** Defines the Title Class.
 *
 * Element: `cs:title` */
export class Title extends OpenXmlLeafElement {
  override readonly localName = "title" as const;
  override readonly prefix = "cs" as const;
  override readonly namespaceUri = "http://schemas.microsoft.com/office/drawing/2012/chartStyle" as const;


  /** position (:position) */
  position: StringValue | undefined;

  override applyAttribute(qname: string, value: string): void {
    switch (qname) {
      case "position": this.position = StringValue.parse(value); return;
    }
    super.applyAttribute(qname, value);
  }

  protected override collectAttributes(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    for (const [k, v] of this.extendedAttributes) out.push([k, v]);
    if (this.position !== undefined) out.push(["position", this.position.toString()]);
    return out;
  }

}
